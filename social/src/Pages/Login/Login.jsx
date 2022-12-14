
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import './Login.scss';
import instragram from '../images/instragram.png';
import play from '../images/play-store.png';
import app from '../images/app-store.png';
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import LoaderContext from '../../Context/LoaderContext';
import Cookies from 'js-cookie';


const Login = () => {

  // email and phone number pattern
  const phoneno = /^(01|8801|\+8801)[0-9]{9}$/;
  const mailformat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  const username = /^[a-z0-9_.]+$/


  // use Auth context
  const { dispatch } = useContext(AuthContext)

  // use loader context
  const { loader_dispatch } = useContext(LoaderContext);

  // login alert
  const [mess, setMass] = useState({
    status: false,
    type: 'danger',
    message: 'test'
  })

  // create navigate
  const navigate = useNavigate()

  const [input, setInput] = useState({
    phone_email_username: '',
    password: ''
  })

  const handleInput = (e) => {

    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {

      if (!input.phone_email_username || !input.password) {

        setMass({
          status: true,
          type: 'danger',
          message: 'All feilds are required!'
        })

      } else {

        if (input.phone_email_username.match(mailformat)) {

          await axios.post('http://localhost:5000/api/user/login', {
            email: input.phone_email_username,
            password: input.password
          }).then(res => {

            Cookies.set('token', res.data.token)

            if (res.data.user.isVerify) {

              dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })

              navigate('/')

              loader_dispatch({ type: 'LOADER_START' });

            }

            if (!res.data.user.isVerify) {

              setMass({
                status: true,
                type: 'danger',
                message: 'Please verify your account'
              })

            }

          }).catch(err => {

            setMass({
              status: true,
              type: 'danger',
              message: err.response.data.message
            })

          })

        } else if (input.phone_email_username.match(phoneno)) {

          await axios.post('http://localhost:5000/api/user/login', {

            phone: input.phone_email_username,
            password: input.password

          }).then(res => {

            Cookies.set('token', res.data.token)

            if (res.data.user.isVerify) {

              dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })

              navigate('/')

              loader_dispatch({ type: 'LOADER_START' });

            }

            if (!res.data.user.isVerify) {

              setMass({
                status: true,
                type: 'danger',
                message: 'Please verify your account'
              })

            }

          }).catch(err => {
            setMass({
              status: true,
              type: 'danger',
              message: err.response.data.message
            })
          })

        } else if (input.phone_email_username.match(username)) {

          await axios.post('http://localhost:5000/api/user/login', {

            username: input.phone_email_username,
            password: input.password

          }).then(res => {
            Cookies.set('token', res.data.token)

            if (res.data.user.isVerify) {

              dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })

              navigate('/')

              loader_dispatch({ type: 'LOADER_START' });

            }

            if (!res.data.user.isVerify) {

              setMass({
                status: true,
                type: 'danger',
                message: 'Please verify your account'
              })

            }
          }).catch(err => {

            setMass({
              status: true,
              type: 'danger',
              message: err.response.data.message
            })

          })

        } else {

          setMass({
            status: true,
            type: 'danger',
            message: 'Please valid username or phone number or email'
          })

        }

      }

    } catch (error) {
      console.log(error);
    }

  }

  const loader = () => {
    loader_dispatch({ type: 'LOADER_START' });
  }


  return (
    <>

      <div className="login-container">
        <div>
          <div className="login-wraper">
            <Link onClick={loader} to='/login'> <img className='login-logo' src={instragram} alt="" /></Link>
            <form onSubmit={handleFormSubmit} className="login-form">

              {/* login alert */}
              {mess.status && <p className={`alert register-alert alert-${mess.type} text-start`}>{mess.message}</p>}

              <input name='phone_email_username' className='form-input' type="text" onChange={handleInput} value={input.phone_email_username} placeholder='Phone number, username, or email' />

              <input className='form-input' onChange={handleInput} name='password' value={input.password} type="password" placeholder='Password' />

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

export default Login