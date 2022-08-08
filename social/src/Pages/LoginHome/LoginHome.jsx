import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import '../Login/Login.scss';
import './LoginHome.scss';
import instragram from '../images/instragram.png';
import play from '../images/play-store.png';
import app from '../images/app-store.png';
import screenshot1 from '../images/screenshot1.png';
import screenshot2 from '../images/screenshot2.png';
import screenshot3 from '../images/screenshot3.png';
import screenshot4 from '../images/screenshot4.png';
import LoginRegisterFooter from '../LoginRegisterFooter/LoginRegisterFooter.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';


const LoginHome = () => {

// use context
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

const[ input, setInput]= useState({
  email : '',
  password : ''
})

const handleInput = (e) => {

  setInput({ ...input, [e.target.name] : e.target.value})

}

const handleForm = async (e) => {

  e.preventDefault()

  try {

    if ( !input.email || !input.password ) {

      createTost( 'error', 'All feilds are required');
      
    } else {

      await axios.post('http://localhost:5000/api/user/login', input).then( res => {

      Cookies.set( 'token', res.data.token )
      Cookies.set( 'user', JSON.stringify(res.data.user) )

      dispatch({type : 'LOGIN_USER', payload : res.data })

      navigate('/home')
        
      })

    }
    
  } catch (error) {
    createTost( 'error', 'Wrong email or password')
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
        <div className="left-col">
            <div id="carouselExampleDrak" className="carousel carousel-drak slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="1000">
                        <img src={ screenshot1 } className="d-block" alt=""/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={screenshot2} className="d-block" alt=""/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={screenshot3} className="d-block" alt=""/>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src={screenshot4} className="d-block" alt=""/>
                    </div>
                </div>
            </div>
        </div>

        <div className="right-col">
            <div className="login-wraper">
            <Link to='/login'> <img className='login-logo' src={instragram} alt="" /></Link>
            <form onSubmit={ handleForm } className="login-form">
                <input className='form-input' onChange={ handleInput } value={ input.email } name='email' type="text" placeholder='Phone number, username, or email'/>
            
                <input className='form-input' onChange={ handleInput } value={ input.password } name='password' type="password" placeholder='Password'/>
            
                <input className='login-submit' type="submit" value="Login"/>
            </form>
            <div className="divider">
                OR
            </div>
                <a href="#" className='login-with-fb'> <FaFacebookSquare/> Log in with Facebook</a>
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
    

    <LoginRegisterFooter/>

    </>
  )
}

export default LoginHome