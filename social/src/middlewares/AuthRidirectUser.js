import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"


const AuthRidirectUser = ( {children} ) => {

    const { token } = useContext(AuthContext)
    return !token ? children : <Navigate to={'/home'} />

}

// export
export default AuthRidirectUser