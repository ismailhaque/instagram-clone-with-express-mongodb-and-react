import axios from 'axios';
import React from 'react';
import './Verify.scss';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from 'js-cookie';


const EmailVerify = () => {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        try {

            axios.post('http://localhost:5000/api/user/verify', params).then(res => {

                Cookies.set('token', res.data.token)
                navigate('/home')

                swal({
                    title: "Congratulation!",
                    text: "Your Email verify Successfully!",
                    icon: "success",
                    button: "Ok",
                });

            }).catch(err => {

                navigate('/')
                swal({
                    title: "Sorry Invalid URL!",
                    text: "Your Email not Verify. Plase Try Again!",
                    icon: "error",
                    button: "Ok",
                });

            })

        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div>
            <div className="verify-container">
                <div className="verify-card">
                    <h5>Email Verify</h5>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify;