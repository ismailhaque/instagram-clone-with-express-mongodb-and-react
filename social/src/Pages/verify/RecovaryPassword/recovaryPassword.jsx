import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import LoaderContext from '../../../Context/LoaderContext'
import { createTost } from '../../../utility/Alert/Alert'
import './recovaryPassword.scss'

const RecovaryPassword = () => {

    const{loader_dispatch} = useContext(LoaderContext)

    const params = useParams()

    const navigate = useNavigate()

    const [pass, setPass] = useState({
        password: '',
        check_password: ''
    })

    const passHandler = (e) => {
        setPass((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const passSubmit = (e) => {

        e.preventDefault()

        if (pass.password == '' || pass.check_password == '') {
            createTost('error', 'All feilds are required')
        }

        if (pass.password !== pass.check_password) {

            createTost('error', 'Do not match your password')

        }

        if (pass.password === pass.check_password) {

            try {

                axios.post('http://localhost:5000/api/user/reset-password', { token: params.token, password: pass.password }).then(res => {

                    swal({
                        title: "Congratulations",
                        text: "You have successfully reset the password",
                        icon: "success",
                        button: "Ok",
                    });

                    loader_dispatch({ type: 'LOADER_START' });

                    navigate('/')

                }).catch(err => {
                    console.log(err);
                })

            } catch (error) {
                console.log(error);
            }

        }

    }

    return (
        <>

            <div>
                <div className="verify-container">
                    <div className="verify-card">
                        <form onSubmit={passSubmit}>
                            <input onChange={passHandler} name='password' type="password" value={pass.pass} className='form-control' placeholder='New Password' />
                            <br />
                            <input onChange={passHandler} name='check_password' type="password" value={pass.check_password} className='form-control' placeholder='Re-Password' />
                            <input type="submit" className='btn w-100' />
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RecovaryPassword