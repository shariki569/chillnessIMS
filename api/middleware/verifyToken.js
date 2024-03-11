import User from "../models/user.js";

export const verifyToken = async (req, res) => {
    try {
        const token = req.params.token;

        //Find the use with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if(!user){
            return res.status(400).json({message: "Invalid token"});
        }

        //Update the user's verified status
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "User verified successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error verifying token" });
    }
}