import express from 'express';
import  {registerUser, loginUser, getUser, getUsers, blockUser} from './user.service.js';
import {checkToken}  from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUser);
router.patch("/:id/block", checkToken, blockUser);
export default router
