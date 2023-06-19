import jwt from 'jsonwebtoken';
import { sendEmail } from '../providers/emailProvider.js';

export async function forgotPassword(req,res){
    const {email} = req.body;
    const resetToken = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    try {
        sendEmail(email,resetLink);
        return res.status(200).json({ message: 'Email sent successfully' });

    } catch (error) {

        console.log('Error:', error);
        return res.status(500).json({ message: 'Failed to send email' });

    }
}