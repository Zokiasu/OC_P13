import { React, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { getUserInfos } from "../redux/user";

const EditUserModal = (props) => {
	const dispatch = useDispatch();
	const [lastName, setLastname] = useState(props.actualLastName)
	const [firstName, setFirstname] = useState(props.actualFirstName)

	const token = useSelector((state) => state.login.token)

	function handleChangeFirstname (e) {
		setFirstname(e.target.value)
	}
	function handleChangesetLastname (e) {
		setLastname(e.target.value)
	}

	const handleSubmit = () => {
    if(!lastName?.length || !firstName?.length) return
        
		const postApi = async () => {
			const bodyPost = {
				firstName: firstName,
				lastName: lastName
			}

			await fetch(`http://localhost:3001/api/v1/user/profile/`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer' + token
				},
				body: JSON.stringify(bodyPost)
			})
			.then(res => res.json())			
			.then(data => {
				if(data.status === 200) {
					const newData = {
						firstName : firstName,
						lastName : lastName
					}
					dispatch(getUserInfos(newData))
					props.changeNameModale()
				}
			})
		}
		postApi()	
	}

	const handleClose = () => {
		props.changeNameModale()
	}

	return (
		<div className='flex space-x-5 justify-center'>
			<div className='flex flex-col space-y-5'>
				<input 
					id="firstName"
					name="firstName"
					type="text" 
					minLength="2"
					placeholder={props.actualFirstName}
					onChange={handleChangeFirstname}
					className='py-1 pl-2 rounded border-2 border-gray-500 placeholder:text-opacity-60 text-black'
				/>
				<button onClick={handleSubmit} className='bg-white rounded py-1 px-2 border-2 border-purple-500 text-purple-500 ml-20 font-semibold'>Save</button>
			</div>
			<div className='flex flex-col space-y-5'>
				<input 
					id="lastName"
					name="lastName" 
					type="text" 
					minLength="2"
					placeholder={props.actualLastName}
					onChange={handleChangesetLastname} 
					className='py-1 pl-2 rounded border-2 border-gray-500 placeholder:text-opacity-60 text-black'
				/>
				<button onClick={handleClose} className='bg-white rounded py-1 px-2 border-2 border-purple-500 text-purple-500 mr-20 font-semibold'>Cancel</button>
			</div>
		</div>
	);
};

export default EditUserModal;