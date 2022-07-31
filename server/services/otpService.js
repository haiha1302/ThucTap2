const bcrypt = require('bcrypt');
const { DB } = require('../database')

const OTPServices = {
    validOtp: async ({ otp, hashOtp }) => {
        try {
            const isValid = await bcrypt.compare(otp, hashOtp);
            return isValid;
        } catch (error) {
            console.log(error)
        }
    },

    insertOtp: async ({ email, otp, username, password, dateOfBirth }) => {
        try {
            const hashOtp = await bcrypt.hash(otp, 10);

            DB.otps.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

            const insertOtp = await DB.otps.insertOne({
                email: email,
                username: username,
                password: password,
                otp: hashOtp,
                dateOfBirth: dateOfBirth,
                expireAt: new Date(Date.now() + 60 * 2),
            })

            return insertOtp ? {email: email} : 0;
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = { OTPServices }