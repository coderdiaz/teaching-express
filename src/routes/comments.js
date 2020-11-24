const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');
const mongoose = require('mongoose');
// Categories Methods
// GET /
router.get('/', async (req, res) => {
  const comments = await Comment.find().exec();
  return res.status(200).json({
    status: 200,
    data: comments,
  });
});
// POST /
router.post('/', async (req, res) => {
  const { body } = req.body;
  // TODO: Add fields validations
  const newComment = new Comment({
    body
  });
  await newComment.save();
  return res.status(201).json({
    status: 201,
    data: newComment,
  });
});
// PUT /:id/
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  // TODO: Add fields validations
  // Validate if `id` is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({
      status: 401,
      message: 'This id is not valid',
    });
  }
  const comment = await Comment.findById(id).exec();
  if (!comment) {
    return res.status(404).json({
      status: 404,
      message: 'Comment not found',
    });
  }
  // Updating data
  comment.body = body;
  await comment.save();
  return res.status(200).json({
    status: 200,
    data: comment,
  });
});
// DELETE /:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // Validate if `id` is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({
      status: 401,
      message: 'This id is not valid',
    });
  }
  await Comment.findByIdAndDelete(id).exec();
  return res.status(200).json();
});
module.exports = router;