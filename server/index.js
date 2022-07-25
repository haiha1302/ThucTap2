import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from 'express-fileupload';
import { connectToMongo } from "./database";
import user from "./routes/userRoutes";
import post from "./routes/postRoute";

const app = express();

//config
config()

const PORT = process.env.PORT || 5000;

app.use(json());
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
