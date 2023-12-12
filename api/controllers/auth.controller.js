import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import errorHandle from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const exituser = await User.findOne({ username });
        if (exituser) {
            res.json({ message: "username exit already" })

        }
        const hashpassword = bcryptjs.hashSync(password, 10);
        const newData = new User({ username: username, email: email, password: hashpassword })
        await newData.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error)
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email: email });

        if (!validUser) {
            return next(errorHandle(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandle(401, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.KEY);
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ rest });

    } catch (error) {
        next(error); // Handle other potential errors
    }
};
