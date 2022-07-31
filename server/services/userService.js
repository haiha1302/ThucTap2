const Otp = require('otp-generator');
const ObjectId = require('mongodb').ObjectId
const { OTPServices } = require('./otpService');
const sendOTP = require('../utils/sendMail');
const bcrypt = require('bcrypt');
const { DB } = require('../database');
// const { JWTServices } = require('./jwtServices');

const UserServices = {
    registerUser: async ({ email, password, username, dateOfBirth }) => {
        const checkExistedUser = await DB.users.findOne({ email: email });

        if (!(username && email && password)) {
            return {
                code: 400,
                message: 'Please fill all the field',
            };
        }

        if (!/^[a-zA-z0-9]*$/.test(username)) {
            return {
                code: 500,
                message: 'Invalid username entered',
            };
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return {
                code: 500,
                message: 'Invalid email entered',
            };
        }

        if (password.length < 8) {
            return {
                code: 400,
                message: 'Password must be at least 8 characters',
            };
        }

        if (checkExistedUser?.email) {
            return {
                code: 400,
                message: 'This email is already in user!',
            };
        }

        //OTP
        const otp = Otp.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        sendOTP({ email, otp: otp });

        return {
            code: 200,
            element: await OTPServices.insertOtp({
                email,
                otp: otp,
                username,
                password: await bcrypt.hash(password, 10),
                dateOfBirth
            }),
            message: 'Verify your email',
        };
    },

    loginUser: async ({ email, password }) => {
        if (!(email || password)) {
            return {
                code: 400,
                message: 'username or password is not correct',
            };
        }

        const user = await DB.users.findOne({ email: email });

        if (!user) {
            return {
                code: 400,
                message: 'User is not found'
            }
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return {
                code: 400,
                message: 'username or password is not correct',
            };
        }

        return {
            code: 200,
            message: 'Login success',
            user
        };
    },

    verifyOtp: async ({ email, otp }) => {
        try {
            const otpHolder = await DB.otps.find({ email: email }).toArray();

            if (!otpHolder.length) {
                return {
                    code: 404,
                    message: 'Expired OTP 1!',
                };
            }

            //get last
            const lastOtp = otpHolder.length === 1 ? otpHolder[0] : otpHolder[otpHolder.length - 1];
            const isValid = await OTPServices.validOtp({
                otp,
                hashOtp: lastOtp.otp,
            });

            if (!isValid) {
                return {
                    code: 401,
                    message: 'Invalid OTP',
                };
            }
            if (isValid && email === lastOtp.email) {
                const newUser = {
                    email: email,
                    username: lastOtp.username,
                    password: lastOtp.password,
                    dateOfBirth: lastOtp.dateOfBirth,
                    avatar: 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png',
                    create_date: new Date(),
                };

                const user = await DB.users.insertOne(newUser);

                if (user) {
                    await DB.otps.deleteOne({ email: email });
                }

                return {
                    code: 201,
                    element: user,
                    userInsertSuccess: {
                        email: email,
                        username: lastOtp.username,
                        avatar: 'https://obs.multicampus.vn/wp-content/uploads/2019/01/avatar.png', 
                    }
                };
            }
        } catch (error) {
            console.error(error);
        }
    },

    updateAvatar: async (fileUpdate) => {
        const uploadUrl = await DB.users.updateOne(
            { _id: ObjectId(fileUpdate.userId) },
            { $set: { avatar: fileUpdate.avatar } },
        );

        return uploadUrl;
    },
};

module.exports = { UserServices };
