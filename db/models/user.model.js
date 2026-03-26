import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
    type: String,
        required: true,
    },
    birthdate: {
    type:Date,
        required: true,},
    email:{
    type: String,
        unique: true,
        required: true,
    },
    password: {
    type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default:'user',
    },
isActive:{
        type:Boolean,
    required: true,
    default: true,
}});

export default mongoose.model('User', schema);
