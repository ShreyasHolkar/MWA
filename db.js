const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create DB file or open existing
const dbPath = path.join(__dirname, 'data', 'artists.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS registered_artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    bio TEXT,
    image TEXT
  )
`);

module.exports = db;
 
