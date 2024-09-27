require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tapeRoutes = require('./routes/tapeRoutes');
const fs = require('fs');
const path = require('path');

const app = express();

// Create uploads directory if it does not exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory recursively
}

app.use(cors());
app.use(express.json());

// Serve static files for image uploads
app.use('/uploads', express.static(uploadDir));

// Use tapeRoutes
app.use('/api/tapes', tapeRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Get MONGO_URI from environment variables

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
