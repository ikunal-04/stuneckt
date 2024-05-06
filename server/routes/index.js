const express = require('express');
const userRouter = require('./user');
const postRouter = require('./posts');

const router = express.Router();

router.use('/user', userRouter);
router.use('/posts', postRouter);

module.exports = router;