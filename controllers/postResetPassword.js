import jwt from "jsonwebtoken";
import User from "../models/UserModal.js";
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

const schema = new passwordValidator();

schema
.is().min(6)
.has().uppercase()
.has().symbols()
.has().digits();


export async function updatePassword(req,res){
    const { token, password } = req.body;

    try {
      
        const decoded = jwt.verify(token, 'your-secret-key');
        const {email} = decoded;
        const user = await User.findOne({email}).exec();

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        else{
            const isValidPassword = await validatePassword(password);

            if(!isValidPassword){
                return res.status(400).json({message:"Password must contain one uppercase letter, one special character and one digit"});
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.timestamp = new Date();
            await user.save();

            return res.status(200).json({message: "Password updated successfully"});
        }
        
    } catch (error) {
        console.log('Error:', error);
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
}

async function validatePassword(password){
    return schema.validate(password);
}

