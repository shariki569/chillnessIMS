import User from '../../models/user.js'
import crypto from 'crypto'
import { sendVerificatonEmail } from '../../utilities/sendVerification.js';

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check if email is already registered

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Email already exists"})
        }

        //create new user
        const newUser = new User({
            name,
            email, 
            password
        });

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(32).toString("hex");

        await newUser.save();

        //send verification email to user
        sendVerificatonEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({message: "User created successfully"});
        

    } catch (err) {
        console.log("Error Registering user", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
}



