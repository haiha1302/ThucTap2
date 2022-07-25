const nodemailer = require('nodemailer')

const sendOTP = ({ email, otp }) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
    });

    let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Verify your email',
        html: `<p>Your otp is ${otp}</p>`,
    };
    
    transporter.sendMail(mailOptions, (err, infor) => {
        if (err) return err;
        return infor;
    });
};

module.exports = sendOTP;
