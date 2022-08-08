import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"


const AuthenticateUser = ( {children} ) => {

    const { token } = useContext(AuthContext)
    return token ? children : <Navigate to='/' />

}

// export
export default AuthenticateUser