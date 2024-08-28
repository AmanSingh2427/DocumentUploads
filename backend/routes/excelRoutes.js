const express = require('express');
const pool = require('../config/db'); // Assuming db.js is properly set up

const router = express.Router();

router.get('/excel-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aman.excel_data');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
