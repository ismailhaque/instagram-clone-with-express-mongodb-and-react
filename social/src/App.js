import { Navigate, Route, Routes } from "react-router-dom";
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


function App() {
  // useContext
  const { dispatch } = useContext(AuthContext);

  // get token
  const token = Cookies.get('token');

  // check login user
  useEffect(() => {

    try {

      axios.get('http://localhost:5000/api/user/me', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => {

        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data })
        Navigate('/home')

      }).catch(err => {
        console.log(err);
      })

    } catch (error) {
      console.log(error);
    }

  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRidirectUser> <LoginHome /> </AuthRidirectUser>} />
        <Route path="/home" element={<AuthenticateUser> <Home /> </AuthenticateUser>} />
        <Route path="/profile" element={<AuthenticateUser> <Profile /> </AuthenticateUser>} />
        <Route path="/login" element={<AuthRidirectUser> <Login /> </AuthRidirectUser>} />
        <Route path="/register" element={<AuthRidirectUser> <Register /> </AuthRidirectUser>} />
      </Routes>
    </>
  );
}

export default App;
