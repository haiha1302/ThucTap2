// const jwt = require('jsonwebtoken');
const { JWTServices } = require('../services/jwtServices');
const { DB } = require('../database');
// const { JWT } = require('../JWT/JWT')
const User = require('../models/userModel');
const Post = require('../models/postModel');
const ObjectId = require('mongodb').ObjectID;

const Auth = {
    auth: async (req, res, next) => {
        const token = req.cookies['access-token'];

        if (!token) {
            return res.status(400).json({ message: 'You must be login' });
        }

        const data = await JWTServices.validateToken(token);
        req.user = await DB.users.findOne({ _id: data._id });

        next();
    },

    authEdit: async (req, res, next) => {
        const userId = await DB.users.findOne({ _id: ObjectId(req.user._id) });

        const post = await DB.posts.findOne({ author_id: userId._id.toString() });

        if (post === null) {
            return res.status(400).json({ message: 'You do not have permission for this post' });
        }
        next();
    },
};

module.exports = { Auth };
