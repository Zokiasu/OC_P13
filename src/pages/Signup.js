import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';


const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [lastName, setLastname] = useState('')
	const [firstName, setFirstname] = useState('')
	const [password, setPassword] = useState('')
	const [errorLogin, setErrorLogin] = useState(false)

	function handleChangeFirstname (e) {
		setFirstname(e.target.value)
	}
	function handleChangesetLastname (e) {
		setLastname(e.target.value)
	}
	function handleChangeEmail (e) {
		setEmail(e.target.value)
	}
	function handleChangePassword (e) {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

    if(!password?.length || !email?.length) return
        
		const postApi = async () => {
			const bodyPost = {
				email : email,
				password : password,
				firstName : firstName,
				lastName : lastName
			}

			await fetch(`http://localhost:3001/api/v1/user/signup/`, {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(bodyPost)
			})
			.then(res => res.json())			
			.then(data => {
				
					if(data.status === 200) {
						navigate('/login')
					} else {
						setErrorLogin(true)
					}
				}).catch(err => {
					setErrorLogin(true)
				}).finally(() => {
					setEmail('')
					setFirstname('')
					setLastname('')
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
				<h1 className='font-bold text-2xl'>Sign Up</h1>
				<form
					onSubmit={handleSubmit}
					className="sign-in-form"
				>
					<div className="input-wrapper">
						<label htmlFor="firstName">FirstName</label>
						<input 
							id="firstName"
							name="firstName" 
							type="text" 
							minLength="2" 
							className='border border-black' 
							onChange={handleChangeFirstname} 
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="lastName">LastName</label>
						<input 
							id="lastName"
							name="lastName" 
							type="text" 
							minLength="2" 
							className='border border-black' 
							onChange={handleChangesetLastname} 
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="email">Email</label>
						<input 
							id="email"
							name="email" 
							type="text" 
							minLength="2" 
							className='border border-black' 
							onChange={handleChangeEmail} 
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
					<button className="sign-in-button">Sign Up</button>
          { errorLogin ? (<div className="text-red-500 pt-5 font-medium">Fail to login <br /> Please, retry !</div>) : null }
				</form>
			</section>
		</main>
	);
};

export default Signup;