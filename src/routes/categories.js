const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const mongoose = require('mongoose');

// Categories Methods
// GET /
router.get('/', async (req, res) => {
  const categories = await Category.find().exec();
  return res.status(200).json({
    status: 200,
    data: categories,
  });
});

// POST /
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  // TODO: Add fields validations
  const newCategory = new Category({
    name,
    description,
  });
  await newCategory.save();

  return res.status(201).json({
    status: 201,
    data: newCategory,
  });
});

// PUT /:id/
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  // TODO: Add fields validations

  // Validate if `id` is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({
      status: 401,
      message: 'This id is not valid',
    });
  }

  const category = await Category.findById(id).exec();
  if (!category) {
    return res.status(404).json({
      status: 404,
      message: 'Category not found',
    });
  }

  // Updating data
  category.name = name;
  category.description = description;
  await category.save();

  return res.status(200).json({
    status: 200,
    data: category,
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

  await Category.findByIdAndDelete(id).exec();
  return res.status(200).json();
});

module.exports = router;