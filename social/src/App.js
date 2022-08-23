import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRidirectUser from "./middlewares/AuthRidirectUser";
import './App.scss';
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import LoginHome from "./Pages/LoginHome/LoginHome";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./Context/AuthContext";
import LoadingBar from 'react-top-loading-bar'
import LoaderContext from "./Context/LoaderContext";
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";
import EmailVerify from "./Pages/verify/EmailVerify/Verify";
import ForgotPassword from "./Pages/verify/ForgotPassword/ForgotPassword";
import RecovaryPassword from "./Pages/verify/RecovaryPassword/recovaryPassword";


function App() {
  // useContext
  const { dispatch } = useContext(AuthContext);
  // useContext
  const { loader_state, loader_dispatch } = useContext(LoaderContext);

  // get token
  const token = Cookies.get('token');

  // use navigate
  const navigate = useNavigate()

  // check login user
  useEffect(() => {

    try {

      axios.get('http://localhost:5000/api/user/me', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => {

        if (res.data.isVerify && token) {

          dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })
          navigate('/home')

        } else {

          swal({
            title: "Email not verify",
            text: "Please check your email inbox and verify your account!",
            icon: "warning",
            button: "Ok",
          });

        }

      }).catch(err => {
        console.log(err);
      })

    } catch (error) {
      console.log(error);
    }

  }, [token]);

  return (
    <>

      <LoadingBar
        color='#f11946'
        progress={loader_state}
        onLoaderFinished={() => loader_dispatch({ type: "LOADER_END" })}
      />

      <Routes>
        <Route path="/" element={<AuthRidirectUser> <LoginHome /> </AuthRidirectUser>} />
        <Route path="/home" element={<AuthenticateUser> <Home /> </AuthenticateUser>} />
        <Route path="/verify/:token" element={<EmailVerify />} />
        <Route path="/reset_password/:token" element={<RecovaryPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<AuthenticateUser> <Profile /> </AuthenticateUser>} />
        <Route path="/login" element={<AuthRidirectUser> <Login /> </AuthRidirectUser>} />
        <Route path="/register" element={<AuthRidirectUser> <Register /> </AuthRidirectUser>} />
      </Routes>
    </>
  );
}

export default App;
