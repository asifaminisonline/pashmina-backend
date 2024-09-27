const mongoose = require('mongoose');

const tapeSchema = new mongoose.Schema({
  numTapes: { type: Number, required: true },
  totalSections: { type: Number, required: true },
  color: { type: String, required: true },
  createdDate: { type: Date, required: true },
  isTopClosed: { type: Boolean, required: true },
  tapeSize: { type: String, required: true },
  shawlWidth: { type: Number, required: true },
  isEqualSection: { type: Boolean, required: true },
  image: { type: String }, // Base64 string of the image
});

const Tape = mongoose.model('Tape', tapeSchema);

module.exports = Tape;
