const Instructor = require("../model/Instructor");

const getAllInstructors = async (req, res) => {
  const instructors = await Instructor.find();
  if (!instructors)
    return res.status(204).json({ message: "No Instructor found" });
  res.json(instructors);
};

const createNewInstructor = async (req, res) => {
  if (!req?.body.firstname || !req?.body.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  try {
    const result = await Instructor.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      title: req.body.title, 
      description: req.body.description
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateInstructor = async (req, res) => {
  console.log(req.body)
  if (!req?.body?._id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const instructor = await Instructor.findOne({ _id: req.body._id }).exec();
  if (!instructor) {
    return res
      .status(204)
      .json({ message: `Instructor ID ${req.body._id} not found` });
  }
  if (req.body?.firstname) instructor.firstname = req.body.firstname;
  if (req.body?.lastname) instructor.lastname = req.body.lastname;
  if (req.body?.title) instructor.title = req.body.title;
  if (req.body?.description) instructor.description = req.body.description;
  if(req.body?.videos) instructor.videos = req.body.videos;
  const result = await instructor.save();
  res.json(result);
};

const deleteInstructor = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Instructor ID required" });
  const instructor = await Instructor.findOne({ _id: req.body.id }).exec();
  if (!instructor) {
    return res
      .status(204)
      .json({ message: `Instructor ID ${req.body.id} not found` });
  }

  const result = await instructor.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getInstructor = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ message: "Instructor ID required" });
  const instructor = await Instructor.findOne({ _id: req.params.id }).exec();
  if (!instructor) {
    return res
      .status(204)
      .json({ message: `Instructor ID ${req.params.id} not found` });
  }
  res.json(instructor);
};

module.exports = {
  getAllInstructors,
  createNewInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructor,
};
