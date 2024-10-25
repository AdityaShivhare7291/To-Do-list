const User = require('../Models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class AdminController {

    hashPassword = async (password) => {
        const saltRounds = 12; // Adjust based on desired security level
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    comparePassword = async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    signup = async (req, res) => {
        try {
            console.log(req.body);

            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(403).json({ message: "Arguements are not passed " });
            }

            const usery = await User.findOne({ email });
            if (usery) {
                return res
                    .status(409)
                    .json({ message: "User with email already exists" });
            }

            const hashedPassword = this.hashPassword(password);

            const user = await new Person({
                email,
                hashedPassword,
                name,
            }).save();


            const secretKey = 'Iampassinguserpass';

            const payload = {
                email,
                password
            };

            const userToken = jwt.sign(payload, secretKey, { expiresIn: '7d' }); // Token expires in 4 hour



            return res.status(200).json({ userToken });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "INternal Server Error" });
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({ message: "email and password is not provided" });
        }

        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(403).json({ message: "Data is not provided succesfully" });
        }

        if (this.comparePassword(password, userData.password)) {
            return res.status(403).json({ message: "Invalid credential" });
        }

        const secretKey = 'Iampassinguserpass';

        // secretKey should be in env but for what is am i passing as secret key i used it here.
        const payload = {
            email,
            password
        }

        const userToken = jwt.sign(payload, secretKey, { expiresIn: '7d' });

        return res.status(200).json({ message: "successfully logged in", Token: userToken });

    }


}

module.exports = new AdminController();