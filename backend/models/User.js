// models/User.js
const pool = require('../config/db.js');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, username, gender, password }) {
    console.log(name,email,username,gender,password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO aman.uploadusers (name, email, username, gender, password) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, username, gender, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM aman.uploadusers WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM aman.uploadusers WHERE username = $1', [username]);
    return result.rows[0];
  }
}

module.exports = User;
