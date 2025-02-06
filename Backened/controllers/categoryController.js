const Category = require('../models/category');

// Add a new category
const addCategory = async (req, res) => {
  const { email , name, description } = req.body;

  try {
    const category = new Category({ email , name, description });
    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Error adding category', error: error.message });
  }
};

// Get all categories
const getCategories = async ( req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error: error.message });
  }
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
