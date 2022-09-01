import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { startSession } from '../redux/login';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [errorLogin, setErrorLogin] = useState(false)

	function handleChangeUsername (e) {
		setUserName(e.target.value)
	}
	function handleChangePassword (e) {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

    if(!password?.length || !userName?.length) return
        
		const postApi = async () => {
			const bodyPost = {
				email : userName,
				password : password
			}

			await fetch(`http://localhost:3001/api/v1/user/login/`, {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(bodyPost)
			})
			.then(res => res.json())			
			.then(data => {
					if(data.status === 200) {
						dispatch(startSession(data.body.token))
						navigate('/user')
					} else {
						setErrorLogin(true)
					}
				}).catch(err => {
					setErrorLogin(true)
				}).finally(() => {
					setUserName('')
					setPassword('')
				}
			)
		}
		postApi()	
	}

	return (
		<main className="main bg-dark h-full py-32">
			<section className="sign-in-content space-y-3">
				<FaUserCircle className='w-5 h-5 mx-auto' />
				<h1 className='font-bold text-2xl'>Sign In</h1>
				<form
					onSubmit={handleSubmit}
					className="sign-in-form"
				>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input 
							id="username"
							name="username" 
							type="text" 
							minLength="2" 
							className='border border-black' 
							onChange={handleChangeUsername} 
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input 
							id="password"
							name="password" 
							type="password" 
							minLength="3" 
							className='border border-black' 
							onChange={handleChangePassword} 
						/>
					</div>
					<div className="input-remember space-x-2 items-center">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button className="sign-in-button">Sign In</button>
          { errorLogin ? (<div className="text-red-500 pt-5 font-medium">Fail to login <br /> Please, retry !</div>) : null }
				</form>
				<NavLink to='/signup'>Create an account </NavLink>
			</section>
		</main>
	);
};

export default Login;