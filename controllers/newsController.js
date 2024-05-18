const News = require("../model/News"); 

const getAllNews = async (req, res) => {
  const newsItems = await News.find();
  if (!newsItems || newsItems.length === 0) { // Check for empty array as well
    return res.status(204).json({ message: "No news found" });
  }
  res.json(newsItems);
};

const createNewNews = async (req, res) => {
  const { title, description, image } = req.body; // Destructuring for clarity
  if (!title || !description || !image) {
    return res.status(400).json({ message: "Title, description, and image are required" });
  }

  try {
    const result = await News.create({ title, description, image });
    res.status(201).json(result);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while creating the news item" }); 
  }
};

const updateNews = async (req, res) => {
  const { id, title, description, image } = req.body; // Destructuring

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const newsItem = await News.findById(id).exec(); // Use findById for clarity
  if (!newsItem) {
    return res.status(404).json({ message: `News ID ${id} not found` });
  }
  
  // Update only if provided in the request
  if (title) newsItem.title = title; 
  if (description) newsItem.description = description;
  if (image) newsItem.image = image;

  const result = await newsItem.save();
  res.json(result);
};

const deleteNews = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "News ID required" });

  const newsItem = await News.findById(id).exec();
  if (!newsItem) {
    return res.status(404).json({ message: `News ID ${id} not found` });
  }

  await newsItem.deleteOne();
  res.json({ message: "News item deleted successfully" }); 
};

const getNews = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "News ID required" });

  const newsItem = await News.findById(id).exec();
  if (!newsItem) {
    return res.status(404).json({ message: `News ID ${id} not found` });
  }
  res.json(newsItem);
};

module.exports = {
  getAllNews,
  createNewNews,
  updateNews,
  deleteNews,
  getNews,
};