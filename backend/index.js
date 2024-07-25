const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shani25',
  database: 'hackathon'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// API Endpoint to register a user
app.post('/api/register', async (req, res) => {
  const { username, password, email, phoneNumber, location, emergencyContact } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password, email, phone_number, location, emergency_contact) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [username, hashedPassword, email, phoneNumber, location, emergencyContact], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: results.insertId });
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function addUser(username, password) {
    const email = "NULL";
    const phoneNumber = "NULL";
    const location = "NULL";
    const emergencyContact = "NULL";

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password, email, phone_number, location, emergency_contact) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, email, phoneNumber, location, emergencyContact], (err, results) => {
        if (err) {
        console.error('Error inserting user:', err);
        return;
        }
        console.log('User added with ID:', results.insertId);
    });

    db.end();
    }
  


    // Login endpoint
// app.post('/login', (req, res) => {
//     console.log('gilad!')
//     const { username, password } = req.body;
//     addUser(username,password);
//   });
  

app.get('/login', (req, res) => {
    const { username, password } = req.query;
    addUser(username,password);
    // const { username, password } = req.query; // Access query parameters
  
    // console.log('Received data:', username, password);
  
    // if (!username || !password) {
    //   return res.status(400).json({ error: 'Username and password are required' });
    // }
  
    // // Dummy authentication logic for demonstration
    // if (username === 'testuser' && password === 'testpassword') {
    //   res.json({ message: 'Login successful', user: username });
    // } else {
    //   res.status(401).json({ error: 'Invalid username or password' });
    // }
  });