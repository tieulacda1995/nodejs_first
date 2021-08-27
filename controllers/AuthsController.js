const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const test = (token) => console.log('day la token: ', token);
class AuthsController {


    // GET '/auth'
    get = async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.userId })
            console.log(user);
            res.status(200).json({ success: true, author: user.username });
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    }

    // params

    post = async (req, res) => {
        const { username, password } = req.body;

        console.log(username, password)
        if (!username || !password) return res.status(400).json({ success: false, message: "vui long dien day du thong tin" });
        try {
            const user = await User.findOne({ username });
            if (user) return res.status(400).json({ success: false, message: "ten user da duoc su dung" });
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashPassword,
            });
            await newUser.save()
                .then((data) => {
                    const accessToken = jwt.sign({ userId: data._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
                    // return token;
                    res.json({ username: data.username, success: true, message: "OK!", accessToken });
                });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    login = async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, message: "vui long dien day du thong tin" });
        try {
            const user = await User.findOne({ username });
            if (!user) return res.status(400).json({ success: false, message: "username hoac password khong dung" });
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) return res.status(400).json({ success: false, message: "username hoac password khong dung" });

            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
            // return token;
            res.json({ username: user.username, success: true, message: "dang nhap thanh cong", accessToken });
            test(accessToken);
            console.log(req.body);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = new AuthsController;