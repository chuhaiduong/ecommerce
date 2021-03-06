import User from '../models/user';
import jwt from 'jsonwebtoken';
//const expressJwt = require('express-jwt');
// const nodemailer = require("nodemailer");

export const signup = (req, res) => {
    console.log(req.body);
    // const { name, email, hashed_password } = new User(req.body);
    const user = new User(req.body)
    console.log(user);
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Email da duoc su dung'
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json(data)
    })
}

export const accountActivation = (req, res) => {
    console.log(req.body);
    const { token } = req.body;
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACCTIVATION, function (err, decode) {
            if (err) {
                console.log('Lỗi token', err);
                return res.status(400).json({
                    error: "phien ban da het han.Dang ky lai"
                })
            }
            const { name, email, hashed_password } = jwt.decode(token);
            const user = new User({ name, email, hashed_password });
            user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        error: "Không thể đăng ký tài khoản"
                    })
                }
                user.salt = undefined
                user.hashed_password = undefined
                res.json({ user })
            })
        })
    }
}
export const signin = (req, res) => {

    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Nguoi dung co email khong ton tai.Vui long dang ky'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email va mat khau khong dung'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })
};







// export const signout = (req, res) => {
//     res.clearCookie('t');
//     res.json({
//         message: 'Signout Success'
//     })
// }
// export const requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty: "auth",
// });

// export const isAuth = (req, res, next) => {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if (!user) {
//         return res.status(403).json({
//             error: "Access Denied"
//         })
//     }
//     next();
// }

// exports.isAdmin = (req, res, next) => {
//     if (req.profile.role == 0) {
//         return res.status(403).json({
//             error: "Admin resource! Access Denined"
//         })
//     }
//     next();
// }