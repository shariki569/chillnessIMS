import User from "../models/user";
import { secretKey } from "../utilities/secretKey";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
