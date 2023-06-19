import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { createUser } from './controllers/signup.js';
import { signInUser } from './controllers/login.js';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './middleware/authMiddleware.js';
import { forgotPassword } from './controllers/forgotPassword.js';
import { resetPasswordPage } from './controllers/getResetPassword.js';
import { updatePassword } from './controllers/postResetPassword.js';
import upload from './middleware/multer.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(upload.any());

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
.then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log(err);
});


app.get('/',(req,res)=>{
    res.send(`Hello world`);
});

app.use('/auth',authRoutes);
app.use('/transactions',transactionRoutes);

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});