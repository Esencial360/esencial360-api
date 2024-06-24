const Category = require('../model/Category');

const getAllCategories = async (req, res) => {
  const categories = await Category.find()
  if (!categories) return res.status(204).json({ message: 'No categories found' });
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const result = await Category.create({
      name: req.body.name,
      blogs: [], // Initialize with an empty array
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateCategory = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `Category ID ${req.body.id} not found` });
  }

  if (req.body?.name) category.name = req.body.name;

  const result = await category.save();
  res.json(result);
};

const deleteCategory = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Category ID is required' });

  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `Category ID ${req.body.id} not found` });
  }

  const result = await category.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getCategory = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Category ID is required' });

  const category = await Category.findOne({ _id: req.params.id }).populate('blogs').exec();
  if (!category) {
    return res.status(204).json({ message: `Category ID ${req.params.id} not found` });
  }

  res.json(category);
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};