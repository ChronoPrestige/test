import User from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export const registerUser  =  async (req, res) => {
    const {name, password, email, birthdate} = req.body;
    if (!name || !password || !email || !birthdate){
       throw createError(400, "name, password, email, birthdate are required!");
    }
    const existedUser = await User.findOne({ email: email });
    if (existedUser){
        throw createError(400, "User already exists");
    }
    const hash = await bcrypt.hash(password, 8);
    await User.create({name, password: hash, email, birthdate});
    return res.status(201).send('user created successfully');
}



export const loginUser  =  async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        throw createError(400, "invalid credentials");
    }
    const user = await User.findOne({ email: email });
    if (!user){
        throw createError(400, "invalid credentials");
    }
    if (!user.isActive) {
        throw createError(403, "user is blocked");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch){
        throw createError(400, "invalid credentials");
    }
    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
    return res.status(200).json({token})
}

export const getUser  = async (req, res) => {
    const {id} = req.params;
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        throw createError(403, "forbidden");
    }
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw createError(404, "user not found");
    }
    return res.status(200).json(user);
}

export const getUsers  = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw createError(403, "forbidden");
    }
    const users = await User.find().select('-password');
    return res.status(200).json(users);
}

export const blockUser  = async (req, res) => {
    const {id} = req.params;
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        throw createError(403, "forbidden");
    }
    const user = await User.findById(id);
    if (!user) {
        throw createError(404, "user not found");
    }
    user.isActive = false;
    await user.save();
    return res.status(200).send({message: "user blocked successfully"});
}
