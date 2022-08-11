import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"


const AuthRidirectUser = ( {children} ) => {

    const { isUserLoggedin } = useContext(AuthContext)
    
    return isUserLoggedin ? <Navigate to={'/home'}/> : children 

}

// export
export default AuthRidirectUser