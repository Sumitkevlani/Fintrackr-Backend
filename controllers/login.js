
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/UserModal.js';
import jwt from 'jsonwebtoken';
export async function signInUser(req,res){
    await body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .run(req);

    //Check for email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        else{
            // Generate a JWT
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
            //three fields: payload(typically the userId to verify user for the subsequent requests)
            //              secret key
            //              expire time

            // Set the token as a cookie
            res.cookie('token', token, { httpOnly: true,secure:false, maxAge: 3600000 }); // Max age in milliseconds (1 hour)
            return res.status(200).json({message: "Login successful", user: user, token: token});
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "Internal server error"});
    }
}
