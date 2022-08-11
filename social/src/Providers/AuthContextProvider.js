import { useReducer } from "react";
import AuthContext from "../Context/AuthContext.js";
import AuthReducer from "../Reducers/AuthReducers.js";


const INITIAL_STATE = {
    isUserLoggedin: false,
    user : {}
}


const AuthContextProvider = ({ children }) => {

    const[state, dispatch] = useReducer( AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            isUserLoggedin : state.isUserLoggedin,
            user : state.user,
            dispatch
        }}>
            { children }
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;