const express = require('express');
const pool = require('../config/db'); // Assuming db.js is properly set up

const router = express.Router();

router.get('/excel-data', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM aman.excel_data WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
