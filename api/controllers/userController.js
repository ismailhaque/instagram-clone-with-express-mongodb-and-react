
import bcrypt from 'bcrypt';
import userModels from '../models/userModels.js';
import createError from "./errorController.js";
import { sendMail } from '../utility/sendMail.js';
import  { sendSms, blukSmsBd } from '../utility/sendSms.js';
import jwt from 'jsonwebtoken'
import { createToken, verifyToken } from '../utility/createToken.js';

/**
 * @access public
 * @route api/User
 * @method get
 */

export const getAllUser = async (req, res, next) => {

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

export const createUser = async (req, res, next) => {

    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt)

    let check_email;
    let check_phone;
    let check_username;

    try {

        if (req.body.email) {
            check_email = await userModels.findOne({ email: req.body.email });
        } else if (req.body.phone) {
            check_phone = await userModels.findOne({ phone: req.body.phone });
        }

        if (req.body.username) {
            check_username = await userModels.findOne({ username: req.body.username });
        }

        if (check_email) {

            next(createError(401, 'Your email already registerd'))

        } else if (check_phone) {

            next(createError(401, 'Your phone number already registerd'))

        } else if (check_username) {

            next(createError(401, 'Username not available'))

        } else {

            const user = await userModels.create({
                ...req.body,
                password: hash_pass
            })

            res.send('account create successfully')

            // create json web token
            const token = createToken({ id: user._id })

            if (req.body.email) {
                await sendMail(req.body.email, 'instagram', `http://localhost:3000/verify/${token}`)
            } else if (req.body.phone) {
                await blukSmsBd(req.body.phone, `http://localhost:3000/verify/${token}`)
            }
        }

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/User:id
 * @method get
 */

export const getSingleUser = async (req, res, next) => {

    const { id } = req.params;

    try {

        const user = await userModels.findById(id)

        if (!user) {

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

export const deleteUser = async (req, res, next) => {

    const { id } = req.params;

    try {

        const user = await userModels.findByIdAndDelete(id);

        res.status(200).json({
            message: 'User data delete successfully'
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

export const updateUser = async (req, res, next) => {

    const { id } = req.params;

    try {

        const user = await userModels.findByIdAndUpdate(id, req.body, { new: true })

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

export const userLogin = async (req, res, next) => {

    try {
        // check user
        let login_user;

        if (req.body.email) {
            login_user = await userModels.findOne({ email: req.body.email });
        } else if (req.body.phone) {
            login_user = await userModels.findOne({ phone: req.body.phone });
        } else if (req.body.username) {
            login_user = await userModels.findOne({ username: req.body.username });
        }

        if (!login_user) {
            next(createError(404, "user not registerd"))
        }

        // check password
        let login_pass;

        if (login_user) {

            login_pass = await bcrypt.compare(req.body.password, login_user.password);

            if (!login_pass) {
                next(createError(404, "wrong password"))
            } 

            if(login_pass) {

                // create json web token
                const token = jwt.sign({ id: login_user._id }, 'GGLBb8VxNVDWjjh5paC+d/sTEiFgo3tu2bzQM/2KRKMmKm88uL+Br++0ZFnnewnzFmheI+L4ZlBsNf/lD6VT+Q==');

                const {_id, password, ...login_info} = login_user._doc

                // send respons
                res.cookie("access_token", token).status(200).json({
                    token: token,
                    user : login_info
                })

            }
        }

        // create json web token
        const token = jwt.sign({ id: login_user._id, isAdmin: login_user.isAdmin }, 'GGLBb8VxNVDWjjh5paC+d/sTEiFgo3tu2bzQM/2KRKMmKm88uL+Br++0ZFnnewnzFmheI+L4ZlBsNf/lD6VT+Q==');

        const { _id, isAdmin, password, ...login_info } = login_user._doc;

        // send respons
        res.cookie("access_token", token).status(200).json({
            token: token,
            user: login_info
        })


    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user/me
 * @method get
 */

export const getLoggedinUser = async (req, res, next) => {

    try {

        // get token
        const bearer_token = req.headers.authorization;

        // check token
        let token = '';

        if (bearer_token) {

            let token = bearer_token.split(' ')[1];

            // check login user
            const login_user = verifyToken(token)

            if (!login_user) {

                next(createError(401, 'Invalid Token'))

            }
            if (login_user) {

                const user = await userModels.findById(login_user.id)

                res.status(200).json(user)

            }

        }
        if (!bearer_token) {

            next(createError(404, 'Token not found'))

        }

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user/verify email
 * @method post
 */

export const userEmailVerify = async (req, res, next) => {

    try {

        const token = req.body.token;

        const verify = verifyToken(token)

        if (verify) {
            await userModels.findByIdAndUpdate(verify.id, {
                isVerify: true
            })
            res.status(200).json({
                user: token,
                message: "account varify successful"
            })
        }

        if (!verify) {
            next(createError(404, 'Invalid token'))
        }



    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user/check email
 * @method post
 */

export const sendResetPassEmail = async (req, res, next) => {

    try {

        // check user
        const valid_user = await userModels.findOne({ email: req.body.email });

        if (!valid_user) {

            next(createError(404, "user not found"))

        }

        if (valid_user) {

            // create json web token
            const token = createToken({ id: valid_user._id })

            await sendMail(req.body.email, 'instagram', `http://localhost:3000/reset_password/${token}`)

            res.status(200).json({

                message: "Valid User"

            });



        }

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/user/reset-password
 * @method post
 */

export const resetPassword = async (req, res, next) => {

    try {

        // check user
        const valid_user = verifyToken(req.body.token)

        if (valid_user) {
            // make hash pass
            const salt = await bcrypt.genSalt(10);
            const hash_pass = await bcrypt.hash(req.body.password, salt)

            const user = await userModels.findByIdAndUpdate(valid_user.id, {
                password: hash_pass
            })

            res.send('password change successful')
        }
        if (!valid_user) {
            res.send('Invalid')
        }

    } catch (error) {

        next(error);

    }

};

