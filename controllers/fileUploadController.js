const multer = require('multer');
const path = require('path');
const File = require('../model/File');
const uploadsDir = path.join(__dirname, '..', 'uploads');
const upload = multer({ dest: "uploads/" });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// });

// const upload = multer({ storage });

const uploadFile = async (req, res) => {
  console.log(req.info)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileInfo = {
      fileName: req.file.filename,
      filePath: req.file.path,
    };

    console.log(req.file)

    const file = new File(fileInfo);
    await file.save();

    res.json({ message: 'File uploaded successfully', fileInfo });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  upload,
  uploadFile
};