import express from 'express';
import { createUser, deleteUser, getAllUser, getLoggedinUser, getSingleUser, updateUser, userLogin } from '../controllers/userController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import userMiddleware from '../middlewares/userMiddleware.js';

// init router
const router = express.Router();

// user login route
router.route('/login').post(userLogin);
router.route('/register').post(createUser);
router.route('/me').get(getLoggedinUser);

// Rest api route
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(userMiddleware, getSingleUser).delete( deleteUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser);

// export router
export default router;