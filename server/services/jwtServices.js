const jwt = require('jsonwebtoken');
const { DB } = require('../database');
const dotenv = require('dotenv').config();

const JWTServices = {
    createToken: (user) => {
        if (!(user.email || user.username || user.avatar)) return 'Cannot sign';
        const accessToken = jwt.sign(
            {
                email: user.email,
                username: user.username,
                avatar: user.avatar,
            },
            process.env.SECRET_JWT_KEY,
            {
                expiresIn: '7d',
            },
        );
        return accessToken;
    },

    validateToken: async (accessToken) => {
        const validateToken = jwt.verify(accessToken, process.env.SECRET_JWT_KEY, async (err, decoded) => {
            if (err)
                return {
                    status: 401,
                    message: 'Invalid JWT',
                };
            else {
                const { email, username, avatar } = decoded;
                const user = await DB.users.findOne({ email: email, username: username });

                if (user)
                    return {
                        status: 200,
                        email: user.email,
                        username: user.username,
                        _id: user._id,
                        avatar: user.avatar,
                    };
                else
                    return {
                        status: 401,
                        message: 'User is not found',
                    };
            }
        });
        return validateToken;
    },
};

module.exports = { JWTServices };
