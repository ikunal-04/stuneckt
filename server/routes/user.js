const express = require('express');
const { userSchemalogin, userSchemaUpdate } = require('../types/userSchema');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const User = require('../models/userdb');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', async (req, res) => {
    const payLoad = req.body;
    try {
        const { success } = userSchemalogin.safeParse(payLoad);

        if (!success) {
            return res.status(400).json({
                message: "wrong inputs, invalid data"
            });
        }

        const user = await User.findOne({
            email: payLoad.email
        })

        if (!user) {
            const salt = await bcyrpt.genSalt(10);
            const hashedPassword = await bcyrpt.hash(payLoad.password, salt);

            const user = await User.create({
                name: payLoad.name,
                email: payLoad.email,
                password: hashedPassword
            })
            const userId = user._id;
            const token = jwt.sign({ userId }, process.env.SECRET);
            return res.status(200).json({
                message: "User logged in successfully",
                token
            });
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.SECRET);

        return res.status(200).json({
            message: "User logged in successfully",
            token
        });

    } catch (error) {
        console.log(error);
    }
});

router.put('/update', authMiddleware, async (req, res) => {
    const payLoad = req.body;
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const { success } = userSchemaUpdate.safeParse(payLoad);
        if (!success) {
            return res.status(400).json({
                message: "wrong inputs, invalid data"
            });
        }
        await User.findByIdAndUpdate(req.userId, {
            name: payLoad.name,
            email: payLoad.email
        });
        return res.status(200).json({
            message: "User updated successfully"
        });
    } catch (error) {
        console.log("Error in updating user", error);
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    return res.status(200).json({
        user
    });
});

router.post('/follow/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const userToFollow = await User.findById(userId);

        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = await User.findById(req.userId);
        console.log(req.userId);

        if (!currentUser) {
            return res.status(404).json({ message: "Current user not found" });
        }

        if (currentUser.following.includes(userToFollow.name)) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        currentUser.following.push(userToFollow.name);
        await currentUser.save();

        userToFollow.followers.push(currentUser.name);
        await userToFollow.save();

        return res.status(200).json({ message: "Successfully followed user" });
    } catch (error) {
        console.error("Error in following user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/followers', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalFollowers = await User.countDocuments({ userId: req.userId });
        const totalPages = Math.ceil(totalFollowers / limit);

        const currentUser = await User.findById(req.userId);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const followers = await Promise.all(currentUser.followers.slice(skip, skip + limit).map(async (followerId) => {
            const follower = await User.findById(followerId);
            return follower ? follower.name : null;
        }));

        let nextPage = null;
        let prevPage = null;
        if (page < totalPages) {
            nextPage = `/api/user/followers?page=${page + 1}&limit=${limit}`;
        }
        if (page > 1) {
            prevPage = `/api/user/followers?page=${page - 1}&limit=${limit}`;
        }

        return res.status(200).json({
            followers,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.error("Error in getting followers:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;   