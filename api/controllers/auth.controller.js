import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
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