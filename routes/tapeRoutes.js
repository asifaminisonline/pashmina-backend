// const express = require('express');
// const multer = require('multer');
// const Tape = require('../models/Tape');
// const router = express.Router();

// // Define multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // POST /api/tapes - Create a new tape
// router.post('/', upload.single('image'), async (req, res) => {
//   const { numTapes, totalSections, color, createdDate, isTopClosed, tapeSize, shawlWidth, isEqualSection } = req.body;

//   try {
//     const newTape = new Tape({
//       numTapes,
//       totalSections,
//       color,
//       createdDate,
//       isTopClosed,
//       tapeSize,
//       shawlWidth,
//       isEqualSection,
//       image: req.file ? req.file.path : null,
//     });

//     await newTape.save();
//     res.status(201).json(newTape);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create tape', details: error.message });
//   }
// });
// // GET /api/tapes - Retrieve all tapes
// router.get('/', async (req, res) => {
//   try {
//     const tapes = await Tape.find();
//     res.status(200).json(tapes);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve tapes', details: error.message });
//   }
// });
// module.exports = router;
const express = require('express');
const multer = require('multer');
const Tape = require('../models/Tape');
const router = express.Router();

// Define multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST /api/tapes - Create a new tape
router.post('/', upload.single('image'), async (req, res) => {
  // Convert string to boolean for checkboxes
  const { numTapes, totalSections, color, createdDate, isTopClosed, tapeSize, shawlWidth, isEqualSection } = {
    ...req.body,
    isTopClosed: req.body.isTopClosed === 'true',
    isEqualSection: req.body.isEqualSection === 'true',
  };

  try {
    const newTape = new Tape({
      numTapes: parseInt(numTapes),  // Ensure it's a number
      totalSections: parseInt(totalSections), // Ensure it's a number
      color,
      createdDate,
      isTopClosed,
      tapeSize,
      shawlWidth: parseFloat(shawlWidth), // Ensure it's a number
      isEqualSection,
      image: req.file ? req.file.path : null,
    });

    await newTape.save();
    res.status(201).json(newTape);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create tape', details: error.message });
  }
});

// GET /api/tapes - Retrieve all tapes
router.get('/', async (req, res) => {
  try {
    const tapes = await Tape.find();
    res.status(200).json(tapes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tapes', details: error.message });
  }
});

module.exports = router;
