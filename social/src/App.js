import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.scss';
import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRidirectUser from "./middlewares/AuthRidirectUser";
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
import Posts from "./Pages/Profile/post/Posts";
import Tagged from "./Pages/Profile/tagged/Tagged";
import Saved from "./Pages/Profile/saved/Saved";
import Setting from "./Pages/Setting/Setting";
import Edit_Profile from "./Pages/Setting/Edit_Profile/Edit_Profile";
import Professional_Account from "./Pages/Setting/Professional_Account/Professional_Account";
import Change_Password from "./Pages/Setting/change_Password/Change_Password";
import App_and_website from "./Pages/Setting/App_and_website/App_and_website";
import Email_from_instagram from "./Pages/Setting/Email_form_Instagram/Email_from_instagram";
import Login_activity from "./Pages/Setting/Login_activity/Login_activity";
import Push_notifications from "./Pages/Setting/Push_notifications/Push_notifications";
import Manage_contacts from "./Pages/Setting/Manage_contacts/Manage_contacts";
import PrivacyAndSecurity from "./Pages/Setting/PrivacyAndSecurity/PrivacyAndSecurity";
import Help from "./Pages/Setting/Help/Help";
import EmailNotifications from "./Pages/Setting/EmailNotifications/EmailNotifications";


function App() {
  // useContext
  const { isUserLoggedin, dispatch } = useContext(AuthContext);

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
          navigate('/')

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
        <Route path="/" element={ isUserLoggedin ? <Home /> : <LoginHome /> } />
        <Route path="/verify/:token" element={<EmailVerify />} />
        <Route path="/reset_password/:token" element={<RecovaryPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/:username" element={<AuthenticateUser> <Profile /> </AuthenticateUser>} >
          <Route path="/:username/posts" element={ <Posts /> }/>
          <Route path="/:username/saved" element={ <Saved /> }/>
          <Route path="/:username/tagged" element={ <Tagged /> }/>
        </Route>
        <Route path="/setting" element={<Setting />}>
          <Route path="/setting/edit_profile" element={ <Edit_Profile/> }/>
          <Route path="/setting/professional_account" element={ <Professional_Account/> }/>
          <Route path="/setting/app_and_website" element={ <App_and_website/> }/>
          <Route path="/setting/change_password" element={ <Change_Password/> }/>
          <Route path="/setting/email_from_instagram" element={ <Email_from_instagram/> }/>
          <Route path="/setting/login_activity" element={ <Login_activity/> }/>
          <Route path="/setting/push_notifications" element={ <Push_notifications/> }/>
          <Route path="/setting/manage_contacts" element={ <Manage_contacts/> }/>
          <Route path="/setting/privacy_and_security" element={ <PrivacyAndSecurity/> }/>
          <Route path="/setting/help" element={ <Help/> }/>
          <Route path="/setting/email_notifications" element={ <EmailNotifications/> }/>
        </Route>
        <Route path="/login" element={<AuthRidirectUser> <Login /> </AuthRidirectUser>} />
        <Route path="/register" element={<AuthRidirectUser> <Register /> </AuthRidirectUser>} />
      </Routes>
    </>
  );
}

export default App;
