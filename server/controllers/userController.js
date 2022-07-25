const { DB } = require('../database');
const ObjectId = require('mongodb').ObjectId;
const { UserServices } = require('../services/userService');
const { JWTServices } = require('../services/jwtServices');
const uploadServices = require('../services/uploadServices');

const UsersController = {
    //register
    register: async (req, res) => {
        const { email, username, password, dateOfBirth } = req.body;
        const { code, element, message } = await UserServices.registerUser({
            email,
            username,
            password,
            dateOfBirth,
        });

        return res.status(code).json({
            code,
            element,
            message,
        });
    },

    //verify email
    verifyAcc: async (req, res) => {
        const { email, otp } = req.body;
        const { code, element, message } = await UserServices.verifyOtp({ email, otp });

        return res.status(code).json({
            code,
            element,
            message,
        });
    },

    //login
    login: async (req, res) => {
        const { email, password } = req.body;
        const { code, message, user } = await UserServices.loginUser({ email, password, res });

        if (!user) {
            res.status(code).json({
                message,
            });
        } else {
            const token = JWTServices.createToken(user);

            res.cookie('access-token', token, {
                httpOnly: true,
                secure: false,
                // sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
                // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            res.status(code).json({
                code,
                message,
                user,
            });
        }
    },

    //logout
    logout: (req, res) => {
        res.clearCookie('access-token');
        res.status(200).json({ message: 'Logout' });
    },

    checkUser: async (req, res) => {
        const accessToken = req.cookies['access-token'];

        if (!accessToken) res.status(401).send('JWT is missing');
        else {
            const decodeToken = await JWTServices.validateToken(accessToken);

            req.authenticated = true;
            res.status(decodeToken.status).json(decodeToken);
        }
    },

    uploadAvatar: async (req, res) => {
        try {
            const file = req.files.file;

            const user = await DB.users.findOne({ _id: ObjectId(req.body.userId) });

            if (!user) res.status(400).json({ msg: 'User is not found' });
            else {
                const upload = await uploadServices(file);

                const fileUpdate = {
                    userId: req.body.userId,
                    avatar: upload.url,
                };

                if (upload.url) {
                    const updateStatus = await UserServices.updateAvatar(fileUpdate);
                    res.status(200).json(updateStatus);
                }
            }
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    updateInfor: async (req, res) => {
        try {
            const updateInfor = await DB.users.updateOne({ _id: ObjectId(req.body.userId) }, { $set: req.body });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    //user detail
    // userProfile: async (req, res) => {
    //     try {
    //         console.log('body', req.body)
    //         const idUser = req.body.idUser
    //         console.log('id', idUser)
    //         const user = await DB.users.findOne({ _id: idUser })

    //         if (!user) res.status(400).json({ msg: 'User is not found' })
    //         console.log('se', user)
    //         return res.status(200).json(user);
    //     } catch (error) {
    //         res.status(500).json({ msg: error.message })
    //     }
    // }
};

module.exports = { UsersController };
