const express = require('express');
const Posts = require('../db/postsdb');
const { postSchema } = require('../types/postsSchema');
const User = require('../db/userdb');
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
        const posts = await Posts.find();
        return res.status(200).json({
            posts
        });
    } catch (error) {
        console.log("Error in getting posts", error);
    }
});

router.get('/userposts', authMiddleware, async (req, res) => {
    try {
        // console.log(req.userId);
        const post = await Posts.find({ userId: req.userId });

        if (!post || post.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        return res.status(200).json({
            post
        });
    } catch (error) {
        console.log("Error in getting post", error);
    }
})

module.exports = router;