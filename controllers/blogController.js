const Blog = require("../model/Blog");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) return res.status(204).json({ message: "No blog found" });
  res.json(blogs);
};

const createNewBlog = async (req, res) => {
  if (!req?.body.title || !req?.body.description || !req?.body.image) {
    return res
      .status(400)
      .json({ message: "Title, description and image are required" });
  }

  try {
    const result = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });
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
  if (req.body?.image) blog.image = req.body.image;
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
