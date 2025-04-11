const express = require('express');
const cors = require('cors');
const path = require('path');

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
const registerRoute = require('./routes/register');
app.use('/api/register', registerRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
 
