import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import { generateToken } from '../config/jwt.js';


export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // console.log(username, email, password );
    try {
        //Existing User
        const existingUser  = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "A user with this email already exists. Please use a different email or log in." });
        }
        //Hash tha password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({ first_name:firstName, last_name:lastName, email, password: hashedPassword });
        await newUser.save();
        newUser.password = undefined;

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     //secure:true
        //     maxAge: 1000 * 60 * 60 * 24 * 7
        // }).status(201).json(newUser);
        res.status(201).json({ message: "User Created"});
    } catch (error) {
        res.status(500).json({ message: "Failed to create user!" });
        console.log(error);
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        user.password = undefined;

        // res.setHeader("set-Cookie", "test=" + "myValue");
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            //secure:true
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to login user!" });
    }
}


export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successfully" });
}