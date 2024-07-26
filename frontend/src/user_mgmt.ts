import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Shani25',
  database: 'hackathon'
};

// Function to add a user to the database
async function addUser() {
  // Create a connection to the database
  const connection = await mysql.createConnection(dbConfig);

  // User details
  const username = 'johndoe';
  const password = 'password123'; // Plain text password
  const email = 'john.doe@example.com';
  const phoneNumber = '1234567890';
  const location = 'New York, USA';
  const emergencyContact = 'Jane Doe';

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // SQL query to insert a user
  const query = `
    INSERT INTO users (username, password, email, phone_number, location, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    // Execute the query
    const [result] = await connection.execute(query, [
      username, hashedPassword, email, phoneNumber, location, emergencyContact
    ]);
    console.log('User added with ID:', (result as mysql.OkPacketParams).insertId);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    // Close the database connection
    await connection.end();
  }
}

// Call the addUser function
addUser();
