const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectToMongo } = require('./database');
const user = require('./routes/userRoutes');
const post = require('./routes/postRoute');
const { notFound, errorHandler } = require('./middleware/catchError');

const app = express();

//config
dotenv.config();

// database
connectToMongo();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        // origin: '*',
        origin: 'http://localhost:3000',
        methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        credentials: true,
    }),
);
app.use(
    fileUpload({
        useTempFiles: true,
    }),
);

app.use('/welcome', (req, res) => {
    res.status(200).json('Message: Welcome!!!');
});

//routes
app.use('/user', user);
app.use('/posts', post);

// deployment configuration
const __variableOfChoice = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__variableOfChoice, 'client', 'build', 'index.html')));
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`));
