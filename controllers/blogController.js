const Blog = require("../model/Blog");
const Category = require("../model/Category");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) return res.status(204).json({ message: "No blog found" });
  res.json(blogs);
};

const createNewBlog = async (req, res) => {
  console.log(req.body)
  if (!req?.body?.imageUrl || !req?.body?.title || !req?.body?.description || !req?.body?.categoryId) {
    return res.status(400).json({ message: 'All fields (imageUrl, title, description, categoryId) are required' });
  }

  try {
    const category = await Category.findOne({ _id: req.body.categoryId }).exec();
    if (!category) {
      return res.status(404).json({ message: `Category ID ${req.body.categoryId} not found` });
    }

    const result = await Blog.create({
      id: req.body.id,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      category: category._id,
    });
    category.blogs.push(result._id);
    await category.save();

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateBlog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `Blog ID ${req.body.id} not found` });
  }
  if (req.body?.title) blog.title = req.body.title;
  if (req.body?.description) blog.description = req.body.description;
  if (req.body?.imageUrl) blog.imageUrl = req.body.imageUrl;s
  const result = await blog.save();
  res.json(result);
};

const deleteBlog = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Blog ID required" });
  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `Blog ID ${req.body.id} not found` });
  }

  const result = await blog.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getBlog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Blog ID required" });
  const blog = await Blog.findOne({ _id: req.params.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `Blog ID ${req.params.id} not found` });
  }
  res.json(blog);
};

module.exports = {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
