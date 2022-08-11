
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import './Login.scss';
import instragram from '../images/instragram.png';
import play from '../images/play-store.png';
import app from '../images/app-store.png';
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter.jsx';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import cookie from 'js-cookie';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';


const Login = () => {

  const { dispatch } = useContext(AuthContext)


  // create navigate
  const navigate = useNavigate()

  // create toast
  const createTost = (type, msg) => {

    switch (type) {

      case 'error':
        return toast.error(msg)
        break;

      case 'success':
        return toast.success(msg)
        break;

      default:
        break;
    }

  }

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {

    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {

      if (!input.email || !input.password) {

        createTost('error', 'All feilds are required');

      } else {

        await axios.post('http://localhost:5000/api/user/login', input).then(res => {

          cookie.set('token', res.data.token)

          dispatch({type : 'LOGIN_USER_SUCCESS', payload : res.data })

          navigate('/home')

        })

      }

    } catch (error) {
      createTost('error', 'Wrong email or password');
    }

  }


  return (
    <>

      <div className="login-container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div>
          <div className="login-wraper">
            <Link to='/login'> <img className='login-logo' src={instragram} alt="" /></Link>
            <form onSubmit={handleFormSubmit} className="login-form">
              <input name='email' className='form-input' type="text" onChange={handleInput} value={input.email} placeholder='Phone number, username, or email' />

              <input className='form-input' onChange={handleInput} name='password' value={input.password} type="password" placeholder='Password' />

              <input className='login-submit' type="submit" value="Login" />
            </form>
            <div className="divider">
              OR
            </div>
            <a href="#" className='login-with-fb'> <FaFacebookSquare /> Log in with Facebook</a>
            <a href="#" className='forget-password'>Forgot password?</a>
          </div>

          <div className="signup-wraper">
            <p>Don't have an account? <Link className='signup-btn' to='/register'>Sign up</Link></p>
          </div>

          <div className="get-app">

            <p>Get the app.</p>

            <div className="get-images">
              <a href="#"><img src={app} alt="" /></a>
              <a href="#"><img src={play} alt="" /></a>
            </div>

          </div>
        </div>
      </div>

      <LoginRegisterFooter />

    </>
  )
}

export default Login