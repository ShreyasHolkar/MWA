const db = require('../db');
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('artImage'), (req, res) => {
    const { name, email, phone, bio } = req.body;
    const file = req.file;
    const imagePath = file ? `/uploads/${file.filename}` : null;
  
    const sql = `
      INSERT INTO registered_artists (name, email, phone, bio, image)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    db.run(sql, [name, email, phone, bio, imagePath], function (err) {
      if (err) {
        console.error('❌ Error inserting into DB:', err);
        return res.status(500).json({ message: 'Failed to save artist' });
      }
  
      console.log('✅ Artist saved to DB:', { name, email, phone, bio, imagePath });
      res.status(200).json({
        message: 'Registration saved to DB!',
        artist: { id: this.lastID, name, email, phone, bio, image: imagePath }
      });
    });
  });  

// GET /api/register/all - return all saved artists
router.get('/all', (req, res) => {
    db.all(`SELECT * FROM registered_artists ORDER BY id DESC`, [], (err, rows) => {
      if (err) {
        console.error('❌ Failed to fetch artists:', err);
        return res.status(500).json({ message: 'Failed to load gallery' });
      }
  
      res.json(rows);
    });
  });
  
  

module.exports = router;
 
