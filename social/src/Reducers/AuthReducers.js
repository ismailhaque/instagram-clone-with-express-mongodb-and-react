

const AuthReducer = (state, { type, payload }) => {

    switch (type) {
        case 'LOGIN_USER':
            return {
                token : payload.token,
                user : payload.token
            }
            break;
    
        default:
            break;
    }
}

// export AuthReducer
export default AuthReducer