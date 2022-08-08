
import bcrypt from 'bcrypt';
import userModels from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import createError from "./errorController.js";

/**
 * @access public
 * @route api/User
 * @method get
 */

export const getAllUser = async ( req, res, next ) => {

    try {

        const users = await userModels.find()
        res.status(200).json(users);

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/User
 * @method create
 */

export const createUser = async ( req, res, next ) => {

    // make hash pass
    const salt = await bcrypt.genSalt( 10 );
    const hash_pass = await bcrypt.hash( req.body.password, salt )

    try {

        await userModels.create({

            ...req.body,
            password : hash_pass
        
        })
        
        res.status(200).json({

            message : "User data create successfully"

        });

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/User:id
 * @method get
 */

 export const getSingleUser = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const user = await userModels.findById( id )

        if ( !user ) {

            return createError(404, 'Single user data not found');

        } else {

            res.status(200).json(user);

        }

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user:id
 * @method delete
 */

 export const deleteUser = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const user = await userModels.findByIdAndDelete( id );

        res.status(200).json({
            message : 'User data delete successfully'
        });

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user:id
 * @method put/patch
 */

 export const updateUser = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const user = await userModels.findByIdAndUpdate( id, req.body, { new : true } )

        res.status(200).json(user);

    } catch (error) {

        next(error);

    }

};


/**
 * @access public
 * @route api/user/login
 * @method get
 */

 export const userLogin = async ( req, res, next ) => {

    try {

        // check user
        const login_user = await userModels.findOne( { email : req.body.email } );

        if ( !login_user ) {

            next(createError(404, "user not found"))
            
        }

        // check password
        const login_pass = await bcrypt.compare( req.body.password, login_user.password );

        if ( !login_pass ) {

            next(createError(404, "wrong password"))
            
        }

        // create json web token
        const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, 'GGLBb8VxNVDWjjh5paC+d/sTEiFgo3tu2bzQM/2KRKMmKm88uL+Br++0ZFnnewnzFmheI+L4ZlBsNf/lD6VT+Q==');

        const { _id, isAdmin, password, ...login_info} = login_user._doc;

        // send respons
        res.cookie("access_token", token).status(200).json({
            token : token,
            user : login_info
        })

    } catch (error) {

        next(error);

    }

};
