import studentModels from "../models/studentModels.js";
import bcrypt from 'bcrypt';
import createError from "./errorController.js";

/**
 * @access public
 * @route api/student
 * @method get
 */

export const getAllStudents = async ( req, res, next ) => {

    try {

        const students = await studentModels.find()
        res.status(200).json(students);

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/student
 * @method create
 */

export const createStudent = async ( req, res, next ) => {

    // make hash pass
    const salt = await bcrypt.genSalt( 10 );
    const hash_pass = await bcrypt.hash( req.body.password, salt )

    try {

        await studentModels.create({

            ...req.body,
            password : hash_pass
        
        })
        
        res.status(200).json({

            message : "Student data create successfully"

        });

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/student:id
 * @method get
 */

export const getSingleStudent = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const student = await studentModels.findById( id )

        if ( !student ) {

            return createError(404, 'Single student data not found');

        } else {

            res.status(200).json(student);

        }

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/student:id
 * @method delete
 */

export const deleteStudent = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const student = await studentModels.findByIdAndDelete( id );

        res.status(200).json({
            message : 'Student data delete successfully'
        });

    } catch (error) {

        next(error);

    }

};

/**
 * @access public
 * @route api/student:id
 * @method put/patch
 */

export const updateStudent = async ( req, res, next ) => {

    const { id } = req.params;

    try {

        const student = await studentModels.findByIdAndUpdate( id, req.body, { new : true } )

        res.status(200).json(student);

    } catch (error) {

        next(error);

    }

};
