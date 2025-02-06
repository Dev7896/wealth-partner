const express = require('express');
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

// Add a new category
router.post('/add', addCategory);

// Get all categories
router.get('/', getCategories);

// Update a category
router.put('/:id', updateCategory);

// Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
