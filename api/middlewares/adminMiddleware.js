import createError from "../controllers/errorController.js";
import jwt from "jsonwebtoken";

// create auth middleware
const adminMiddleware = (req, res, next) => {

    try {

        // check token
        const token = req.cookies.access_token;

        if ( !token ) {
            
            return next( createError(404, "You are not author") );

        }

        // if log in
        const login_user = jwt.verify(token, 'GGLBb8VxNVDWjjh5paC+d/sTEiFgo3tu2bzQM/2KRKMmKm88uL+Br++0ZFnnewnzFmheI+L4ZlBsNf/lD6VT+Q==');

        if ( !login_user ) {
            
            return next( createError(401, "Invalid token") );

        };

        if ( !login_user.isAdmin ) {

            return next( createError(401, "Only admin can do this") );
            
        }

        if ( login_user ) {
            
            req.user = login_user;
            next();
            
        }
        
    } catch (error) {
        
        next(error);

    };

}

// esport auth middleware
export default adminMiddleware;