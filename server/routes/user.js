const express = require('express');
const { userSchemalogin, userSchemaUpdate } = require('../types/userSchema');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const User = require('../db/userdb');
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

        if(!user) {
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

module.exports = router;   