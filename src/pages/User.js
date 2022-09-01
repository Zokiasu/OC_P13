import { React, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from '../components/EditUserModal';
import { useNavigate } from "react-router-dom";
import { getUserInfos } from "../redux/user";
import AccountTransactions from '../components/AccountTransactions';

const User = () => {
    
  const dispatch = useDispatch()
	const navigate = useNavigate();

	const token = useSelector((state) => state.login.token)

	const firstName = useSelector((state) => state.user.firstName)
	const lastName = useSelector((state) => state.user.lastName)
	const [changeName, setChangeName] = useState(false)

	const changeNameModale= () => {
		setChangeName(!changeName)
	}

	const postApi = async () => {
		await fetch(`http://localhost:3001/api/v1/user/profile/`, {
			method: 'POST',
			headers: { 'Authorization': 'Bearer' + token },
		})
		.then(res => res.json())			
		.then(data => {
			if(data.status === 200) {
				dispatch(getUserInfos(data.body))
			} else {
				navigate('/')
			}
		})
	}

	postApi();

	return (
		<main className="main bg-dark py-5">
			{ changeName ? 
				<div className="header space-y-3">
					<div className='font-bold text-3xl'>
						<p>Welcome back</p>
					</div>
					<EditUserModal 
						changeNameModale={changeNameModale}
						actualFirstName={firstName}
						actualLastName={lastName}
					/>
				</div>
				:
				<div className="header space-y-3">
					<div className='font-bold text-3xl'>
						<p>Welcome back</p>
						<h1>{ firstName } { lastName }!</h1>
					</div>
					<button 
						className="edit-button text-sm"
						onClick={changeNameModale}
					>
						Edit Name
					</button>
				</div>
			}
			<h2 className="sr-only">Accounts</h2>

			<AccountTransactions title="x8349" amount="2,082.79" description="Available Balance" />
			<AccountTransactions title="x6712" amount="10,928.42" description="Available Balance" />
			<AccountTransactions title="x8349" amount="184.30" description="Current Balance" />
		</main>
	);
};

export default User;