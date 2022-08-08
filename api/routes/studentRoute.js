import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getSingleStudent, updateStudent } from '../controllers/studentController.js';



// init router
const router = express.Router();


// route
router.route('/').get(getAllStudents).post(createStudent);
router.route('/:id').get(getSingleStudent).delete(deleteStudent).put(updateStudent).patch(updateStudent);


// export router
export default router;