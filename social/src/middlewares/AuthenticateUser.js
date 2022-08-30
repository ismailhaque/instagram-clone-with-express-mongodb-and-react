import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"


const AuthenticateUser = ( {children} ) => {

    const { isUserLoggedin } = useContext(AuthContext)
    return isUserLoggedin ?  children  : <Navigate to='/' />

}

// export
export default AuthenticateUser