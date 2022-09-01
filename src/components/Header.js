import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { useNavigate, NavLink } from "react-router-dom";
import argentBankLogo from '../assets/img/argentBankLogo.png'

import { stopSession } from '../redux/login';
import { cleanUser } from '../redux/user';

const Header = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isConnected = useSelector((state) => state.login.isConnected)
	const firstName = useSelector((state) => state.user.firstName)

  function logout () {
    dispatch(stopSession())
    dispatch(cleanUser())
		navigate('/')
  }

	return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      {
        isConnected ? (
          <div className="flex items-center space-x-5 font-bold">
            <NavLink to="/user" className='flex gap-1 hover:underline'>
              <span>
                <FaUserCircle className='w-5 h-5' />
              </span>
              {firstName}
            </NavLink>
            <button 
              className='flex gap-1'
              onClick={logout}
            >
              <span>
                <FiLogOut className='w-5 h-5' />
              </span>
              Sign Out
            </button>
          </div>
        ) : (
        <div>
          <NavLink className="main-nav-item flex gap-1" to="/login">
            <FaUserCircle className='w-5 h-5' />
            Sign In
          </NavLink>
        </div>
        )
      }
    </nav>
	);
};

export default Header;