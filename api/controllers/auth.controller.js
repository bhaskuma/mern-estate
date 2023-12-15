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

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ rest });

    } catch (error) {
        next(error); // Handle other potential errors
    }
};

export const google = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    try {
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true })
                .status(200).json(rest)

        }
        else {
            const genratePassword = Math.random().toString(36).slice(-8);
            const hash = bcryptjs.hashSync(genratePassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase(), email: req.body.email, password: hash, avatar: req.body.photo });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token).status(200).json(rest)
        }
    } catch (error) {
        next(error);

    }


}
