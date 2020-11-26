const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');
const mongoose = require('mongoose');

// Posts Methods
// GET /
router.get('/', async (req, res) => {
    const posts = await Post
        .find()
        .populate(['category', 'author', 'comments'])
        .exec();

    return res.status(200).json({
        status: 200,
        data: posts,
    });
});

// POST /
router.post('/', async (req, res) => {
    const {
        title,
        content,
        categoryId,
        authorId,
    } = req.body;

    // TODO: Add validation fields

    if (
        !mongoose.Types.ObjectId.isValid(categoryId) &&
        !mongoose.Types.ObjectId.isValid(authorId)
    ) {
        return res.status(400).json({
            status: 400,
            message: `The specified id's are not valid`,
        });
    }

    const newPost = new Post({
        title,
        content,
        category: categoryId,
        author: authorId,
        publishedAt: Date.now(),
    });

    await newPost.save();

    return res.status(201).json({
        status: 201,
        data: await newPost.populate(['category', 'author']).execPopulate(),
    });
});

module.exports = router;
