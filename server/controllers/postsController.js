const Post = require('../models/postModel');
const Comment = require('../models/postComment');
const Like = require('../models/postLike');
const uploadServices = require('../services/uploadServices');
const { DB } = require('../database');
const ObjectId = require('mongodb').ObjectID;

const postsController = {
    createPost: async (req, res) => {
        try {
            const dataPost = await DB.posts.insertOne(req.body);

            res.status(201).json(dataPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const allPosts = await DB.posts.find({}).toArray();

            res.status(200).json(allPosts);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    getListPostsForUser: async (req, res) => {
        try {
            const listPosts = await DB.posts.find({ author_id: req.body.author_id }).toArray();

            res.status(200).json(listPosts);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    uploadFiles: async (req, res) => {
        try {
            const file = req.files.file;

            const upload = await uploadServices(file);

            res.status(200).json({
                success: true,
                fileName: req.files.file.name,
                public_id: upload.public_id,
                url: upload.url,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    postDetail: async (req, res) => {
        const post = await DB.posts.findOne({ _id: ObjectId(req.params.id) });

        if (!post) {
            return res.status(500).json({ message: 'Post not found' });
        }

        res.status(200).json({ success: true, post });
    },

    updatePost: async (req, res) => {
        const post = await DB.posts.findOne({ _id: ObjectId(req.params.id) });

        if (!post) return res.status(500).json({ message: 'Post not found' });

        const postUpdate = await DB.posts.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });

        res.status(200).json({ success: true, postUpdate });
    },

    deletePost: async (req, res) => {
        const post = await DB.posts.findOne({ _id: ObjectId(req.params.id) });

        if (!post) return res.status(500).json({ message: 'Post not found' });

        const deletePost = await DB.posts.deleteOne({ _id: ObjectId(req.params.id) });

        res.status(200).json({ message: 'Delete success', deletePost });
    },

    commentPost: async (req, res) => {
        try {
            let post_id = req.params.post_id;
            let post = await Post.findOne({ _id: post_id });
            if (!post) {
                return res.status(400).json({
                    message: 'Post not found',
                });
            }
            let newComment = await Comment({
                post_id: post_id,
                user_id: req.user._id,
                comment: req.body.comment,
            });
            let commentData = await newComment.save();

            await Post.updateOne(
                {
                    _id: post_id,
                },
                {
                    $push: {
                        post_comment: commentData._id,
                    },
                },
            );

            return res.status(200).json({
                data: commentData,
            });
        } catch (error) {
            console.log(error);
        }
    },

    toggle_like: async (req, res) => {
        try {
            let post_id = req.params.post_id;
            let post = await Post.findOne({ _id: post_id });
            if (!post) {
                return res.status(400).json({
                    message: 'Post not found',
                });
            } else {
                let isLike = await Like.findOne({
                    post_id: post_id,
                    user_id: req.user._id,
                });
                if (!isLike) {
                    let postLike = await Like({
                        post_id: post_id,
                        user_id: req.user._id,
                    });
                    let likeData = await postLike.save();
                    await Post.updateOne(
                        {
                            _id: post_id,
                        },
                        {
                            $push: {
                                post_like: likeData._id,
                            },
                        },
                    );
                    return res.status(200).json({ message: 'like success' });
                } else {
                    await Like.deleteOne({
                        _id: isLike._id,
                    });

                    await Post.updateOne(
                        {
                            _id: isLike.post_id,
                        },
                        {
                            $pull: {
                                post_like: isLike._id,
                            },
                        },
                    );
                    return res.status(200).json({ message: 'dislike succses' });
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = { postsController };
