

const AuthReducer = (state, { type, payload }) => {

    switch (type) {
        case 'LOGIN_USER_SUCCESS':
            return {
                isUserLoggedin : true,
                user : payload
            }
            break;

        case 'LOGOUT_USER':
            return {
                isUserLoggedin : false,
                user : {}
            }
            break;
    
        default:
            break;
    }
}

// export AuthReducer
export default AuthReducer