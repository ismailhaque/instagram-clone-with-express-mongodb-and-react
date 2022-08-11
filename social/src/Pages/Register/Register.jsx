
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import '../Login/Login.scss';
import './Register.scss';
import instragram from '../images/instragram.png';
import play from '../images/play-store.png';
import app from '../images/app-store.png';
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter.jsx';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Register = () => {

  // create toast
  const createTost = (type, msg) => {

    switch (type) {

      case 'error':
        return toast.error(msg);
        break;

      case 'success':
        return toast.success(msg);
        break;
    
      default:
        break;
    }
    
  }


  const[ input, setInput ] = useState({

    name : '',
    email : '',
    username : '',
    password : ''

  });

  const handleInput = (e) => {

    setInput((prev) => ({ ...prev, [ e.target.name ] : e.target.value }));
    
  }

  const registerFormSubmit = async (e) => {
    e.preventDefault();

    try {

      if ( !input.email || !input.name || !input.username || !input.password) {

        createTost( 'error', 'All feilds are required');
        
      } else {

        await axios.post('http://localhost:5000/api/user', input).then( res => {

          setInput({

            name : '',
            email : '',
            username : '',
            password : ''
        
          });

          createTost( 'success', 'Account Created Successfully');
          
        })
        
      }
      
    } catch (error) {

      console.log( error );

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
            <h3>Sign up to see photos and videos from your friends.</h3>
            <a href="#" className='login-with-fb' id="login-facebook"> <FaFacebookSquare/> Log in with Facebook</a>
            <div className="divider">
              OR
            </div>
            <form onSubmit={ registerFormSubmit } className="login-form">
                <input name='email' className='form-input' type="text" onChange={ handleInput } value={ input.email } placeholder='Phone Number or Email'/>

                <input name='name' className='form-input' type="text" onChange={ handleInput } value={ input.name } placeholder='Full Name'/>

                <input name='username' className='form-input' type="text" onChange={ handleInput } value={ input.username } placeholder='Username'/>
          
                <input name='password' className='form-input' type="password" onChange={ handleInput } value={ input.password } placeholder='Password'/>

                <p>People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Learn more</a></p>
                <p>By signing up, you agree to our <a href="https://www.instagram.com/legal/cookies/">Terms , Privacy Policy and Cookies Policy.</a></p>
            
                <input className='login-submit' type="submit" value="Sign up"/>

            </form>
        </div>

        <div className="signup-wraper">
          <p>Have an account? <Link className='signup-btn' to='/login'>Log in</Link></p>
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

export default Register;