import passwordValidator from 'password-validator';
import { body, validationResult } from 'express-validator';
import User from '../models/UserModal.js';
import bcrypt from 'bcrypt';

export async function createUser(req,res){
    // console.log(req.file);
    try{
        await body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail()
        .run(req);

        await body('contactNo')
        .isMobilePhone('en-IN')
        .withMessage('Invalid mobile number')
        .run(req);

        const schema = new passwordValidator();
        schema
          .is().min(6)
          .has().uppercase()
          .has().symbols()
          .has().digits();

        await body('password')
        .custom((value,{req}) => {
        if (!schema.validate(value)) {
            throw new Error('Password must contain at least one uppercase letter, one special character, and one digit');
        }
        if (value !== req.body.confirmPassword) {
            throw new Error('Password and confirm password must match');
        }
        return true;
        })
        .run(req);



        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }   
        else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                contactNo: req.body.contactNo,
                password: hashedPassword,
                // image: req.file.filename
            });
            const savedUser = await user.save();
            return res.status(200).json({message: "User registered successfully",user: savedUser});
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "Internal server error"});
    }
}