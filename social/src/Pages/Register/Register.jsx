
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import '../Login/Login.scss';
import './Register.scss';
import instragram from '../images/instragram.png';
import play from '../images/play-store.png';
import app from '../images/app-store.png';
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import LoaderContext from '../../Context/LoaderContext';
import { createTost } from '../../utility/Alert/Alert.js';


const Register = () => {

  // email and phone number pattern
  const phoneno = /^(01|8801|\+8801)[0-9]{9}$/;
  const mailformat = /^[a-z0-9._]{4,30}@[a-z0-9-]{3,20}\.[a-z]{2,9}$/;

  // use navigate
  const navigate = useNavigate();

  // USE CONTEXT
  const { loader_dispatch } = useContext(LoaderContext)

  // register alert
  const [mess, setMass] = useState({
    status: false,
    type: 'danger',
    message: 'test'
  })


  const [input, setInput] = useState({

    name: '',
    phone_email: '',
    username: '',
    password: ''

  });

  const handleInput = (e) => {

    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }

  // sign up form submit
  const registerFormSubmit = async (e) => {

    e.preventDefault()

    if (!input.name || !input.username || !input.phone_email || !input.password) {

      setMass({
        status: true,
        type: 'danger',
        message: 'All feilds are required!'
      })

    } else if (input.phone_email.match(mailformat)) {

      try {

        await axios.post(`http://localhost:5000/api/user/`, {

          name: input.name,
          email: input.phone_email,
          phone: '',
          username: input.username,
          password: input.password

        }).then(res => {

          createTost('success', 'account create successfully')

          setInput({
            name: '',
            phone_email: '',
            username: '',
            password: ''
          })
          navigate('/')

          loader_dispatch({ type: 'LOADER_START' });

        }).catch(err => {

          setMass({
            status: true,
            type: 'danger',
            message: err.response.data.message
          })

        })
      } catch (error) {
        console.log(error);
      }

    } else if (input.phone_email.match(phoneno)) {

      try {

        await axios.post(`http://localhost:5000/api/user/`, {

          name: input.name,
          phone: input.phone_email,
          email: '',
          username: input.username,
          password: input.password

        }).then(res => {

          createTost('success', 'account create successfully')
          setInput({
            name: '',
            phone_email: '',
            username: '',
            password: ''
          })

          navigate('/')

          loader_dispatch({ type: 'LOADER_START' });

        }).catch(err => {
          setMass({
            status: true,
            type: 'danger',
            message: err.response.data.message
          })
        })
      } catch (error) {
        console.log(error);
      }

    } else if (!input.phone_email.match(mailformat) && !input.phone_email.match(phoneno)) {

      setMass({
        status: true,
        type: 'danger',
        message: 'Please valid phone no or email!'
      })

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
            <Link onClick={loader} to='/login' > <img className='login-logo' src={instragram} alt="" /></Link>
            <h3>Sign up to see photos and videos from your friends.</h3>
            <a href="#" className='login-with-fb' id="login-facebook"> <FaFacebookSquare /> Log in with Facebook</a>
            <div className="divider">
              OR
            </div>
            <form onSubmit={registerFormSubmit} className="login-form" method='post' >

              {/* resgister alert */}
              {mess.status && <p className={`alert register-alert alert-${mess.type} text-start`}>{mess.message}</p>}

              <input name='phone_email' className='form-input' type="text" onChange={handleInput} value={input.phone_email} placeholder='Phone Number or Email' />

              <input name='name' className='form-input' type="text" onChange={handleInput} value={input.name} placeholder='Full Name' />

              <input name='username' className='form-input' type="text" onChange={handleInput} value={input.username} placeholder='Username' />

              <input name='password' className='form-input' type="password" onChange={handleInput} value={input.password} placeholder='Password' />

              <p>People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Learn more</a></p>
              <p>By signing up, you agree to our <a href="https://www.instagram.com/legal/cookies/">Terms , Privacy Policy and Cookies Policy.</a></p>

              <input className='login-submit' type="submit" value="Sign up" />

            </form>
          </div>

          <div className="signup-wraper">
            <p>Have an account? <Link onClick={loader} className='signup-btn' to='/login'>Log in</Link></p>
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

export default Register;