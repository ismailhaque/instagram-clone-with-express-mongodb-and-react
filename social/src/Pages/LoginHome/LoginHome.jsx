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
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter.jsx';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import LoaderContext from '../../Context/LoaderContext';
import { createTost } from '../../utility/Alert/Alert';
import swal from 'sweetalert';


const LoginHome = () => {

  // use context
  const { dispatch } = useContext(AuthContext)
  // use context
  const { loader_dispatch } = useContext(LoaderContext)

  // create navigate
  const navigate = useNavigate()

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {

    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const handleForm = async (e) => {

    e.preventDefault()

    try {

      if (!input.email || !input.password) {

        createTost('error', 'All feilds are required');

      } else {

        await axios.post('http://localhost:5000/api/user/login', input).then(res => {

          Cookies.set('token', res.data.token);

          if (!res.data.user.isVerify) {

            swal({
              title: "Sorry!",
              text: "Please Verify Your Email",
              icon: "error",
              button: "Ok",
            });

          }
          if (res.data.user.isVerify) {

            dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })

            navigate('/home')
            loader_dispatch({ type: 'LOADER_START' });

          }


        })

      }

    } catch (error) {
      createTost('error', 'Wrong email or password')
    }

  }

  const loader = () => {
    loader_dispatch({ type: 'LOADER_START' });
  }


  return (
    <>

      <div className="login-container">
        <div className="left-col">
          <div id="carouselExampleDrak" className="carousel carousel-drak slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="1000">
                <img src={screenshot1} className="d-block" alt="" />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={screenshot2} className="d-block" alt="" />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={screenshot3} className="d-block" alt="" />
              </div>
              <div className="carousel-item" data-bs-interval="4000">
                <img src={screenshot4} className="d-block" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="login-wraper">
            <Link onClick={loader} to='/login'> <img className='login-logo' src={instragram} alt="" /></Link>
            <form onSubmit={handleForm} className="login-form">
              <input className='form-input' onChange={handleInput} value={input.email} name='email' type="text" placeholder='Phone number, username, or email' />

              <input className='form-input' onChange={handleInput} value={input.password} name='password' type="password" placeholder='Password' />

              <input className='login-submit' type="submit" value="Login" />
            </form>
            <div className="divider">
              OR
            </div>
            <a href="#" className='login-with-fb'> <FaFacebookSquare /> Log in with Facebook</a>
            <Link onClick={loader} to={'/forgot-password'} className='forget-password'>Forgot password?</Link>
          </div>

          <div className="signup-wraper">
            <p>Don't have an account? <Link onClick={loader} className='signup-btn' to='/register'>Sign up</Link></p>
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

export default LoginHome