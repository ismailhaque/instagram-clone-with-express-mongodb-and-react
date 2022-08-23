import React, { useState } from 'react'
import './ForgotPassword.scss'
import { VscLock } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createTost } from '../../../utility/Alert/Alert'
import swal from 'sweetalert'
import { useContext } from 'react'
import LoaderContext from '../../../Context/LoaderContext'

const ForgotPassword = () => {

    const { loader_dispatch } = useContext(LoaderContext)

    const navigate = useNavigate()

    const [input, setInput] = useState('')

    const inputHandler = (e) => {

        setInput(e.target.value)

    }

    const inputSubmit = async () => {

        try {

            await axios.post('http://localhost:5000/api/user/resetpasswordrequest', { email: input }).then(res => {

                swal({
                    title: "The URL has been sent to your email!",
                    text: "You can reset your password by going to the reset password page in your email and clicking on the URL provided by us. Thanks!",
                    icon: "success",
                    button: "Ok",
                });

                navigate('/')

                loader_dispatch({ type: 'LOADER_START' });

                setInput('')

            }).catch(err => {
                createTost('error', 'invalid email')
            })


        } catch (error) {
            console.log(error);
        }

    }

    const loader = () => {
        loader_dispatch({ type: 'LOADER_START' });
    }

    return (
        <>
            <div>
                <div className="verify-container">
                    <div className="verify-card">
                        <span> <VscLock /> </span>
                        <h3>Trouble Logging In?</h3>
                        <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                        <input type="text" onChange={inputHandler} value={input} placeholder='Email, Phone, or Username' className='form-control' />
                        <button onClick={inputSubmit} className="btn w-100">Send Login Link</button>

                        <div className="divider">
                            OR
                        </div>
                        <br />
                        <Link onClick={loader} className='create_new_account' to={'/register'}>Create New Account</Link>
                        <br />
                        <Link onClick={loader} className='back_to_login btn' to={'/login'}>Back To Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword