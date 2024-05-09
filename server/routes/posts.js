const express = require('express');
const Posts = require('../models/postsdb');
const { postSchema } = require('../types/postsSchema');
const User = require('../models/userdb');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware,async (req, res) => {
    try {
        const payLoad = req.body;
        const { success } = postSchema.safeParse(payLoad);

        if (!success) {
            return res.status(400).json({
                message: "wrong inputs, invalid data"
            });
        }

        await Posts.create({
            description: payLoad.description,
            userId: req.userId
        });

        return res.status(201).json({
            message: "Post created successfully"
        });
    } catch (error) {
        console.log("Error in creating posts", error);
    }
});

router.get('/allposts', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalPosts = await Posts.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Posts.find().populate('userId', 'name').skip(skip).limit(limit);

        let nextPage = null;
        let prevPage = null;
        if (page < totalPages) {
            nextPage = `/api/posts/allposts?page=${page + 1}&limit=${limit}`;
        }
        if (page > 1) {
            prevPage = `/api/posts/allposts?page=${page - 1}&limit=${limit}`;
        }

        return res.status(200).json({
            posts,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.log("Error in getting posts", error);
    }
});

router.get('/userposts', authMiddleware, async (req, res) => {
    try {
        // console.log(req.userId);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalPosts = await Posts.countDocuments({ userId: req.userId });
        const totalPages = Math.ceil(totalPosts / limit);

        const post = await Posts.find({ userId: req.userId }).populate('userId', 'name').skip(skip).limit(limit);

        let nextPage = null;
        let prevPage = null;
        if (page < totalPages) {
            nextPage = `/api/posts/userposts?page=${page + 1}&limit=${limit}`;
        }
        if (page > 1) {
            prevPage = `/api/posts/userposts?page=${page - 1}&limit=${limit}`;
        }

        if (!post || post.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        return res.status(200).json({
            post,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.log("Error in getting post", error);
    }
});

module.exports = router;