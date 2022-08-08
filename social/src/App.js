import { Route, Routes } from "react-router-dom";
import './App.scss';
import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRidirectUser from "./middlewares/AuthRidirectUser";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import LoginHome from "./Pages/LoginHome/LoginHome";
import Register from "./Pages/Register/Register";


function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={ <AuthenticateUser> <Home /> </AuthenticateUser> }/>
        <Route path="/" element={ <AuthRidirectUser> <LoginHome /> </AuthRidirectUser> }/>
        <Route path="/login" element={ <AuthRidirectUser> <Login /> </AuthRidirectUser> }/>
        <Route path="/register" element={ <AuthRidirectUser> <Register /> </AuthRidirectUser> }/>
      </Routes>
    </>
  );
}

export default App;
