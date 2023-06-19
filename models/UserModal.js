import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        minlength: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    image: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now   
    }
});

const User = mongoose.model('User', userSchema);

export default User;
