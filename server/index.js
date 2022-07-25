const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload')
const { connectToMongo } = require("./database");
const user = require("./routes/userRoutes");
const post = require("./routes/postRoute");

const app = express();

//config
dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    // origin: '*',
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/welcome', (req, res) => {
    res.status(200).json('Message: Welcome!!!')
})

//routes
app.use("/user", user);
app.use("/posts", post);

// database
connectToMongo()

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
