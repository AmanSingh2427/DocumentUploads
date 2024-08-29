const pool = require('../config/db'); // Your database connection setup

// Fetch user data by ID
const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT name FROM aman.uploadusers WHERE id = $1', [id]);
    // console.log(result);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

module.exports = { getUserById };
