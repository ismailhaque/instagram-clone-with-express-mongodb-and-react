import { useReducer } from "react";
import AuthContext from "../Context/AuthContext.js";
import cookie from 'js-cookie'
import AuthReducer from "../Reducers/AuthReducers.js";


const INITIAL_STATE = {
    token : cookie.get('token') || null,
    user : cookie.get('user') ? JSON.stringify(cookie.get('user')) : null
}


const AuthContextProvider = ({ children }) => {

    const[state, dispatch] = useReducer( AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            token : state.token,
            user : state.user,
            dispatch
        }}>
            { children }
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;