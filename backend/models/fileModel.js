const pool = require('../config/db');

class File {
  static async saveFileMetadata(name, type, content, userId) {
    try {
      const result = await pool.query(
        'INSERT INTO aman.files (name, type, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, type, content, userId] // Pass userId here
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving file metadata:', error);
      throw error;
    }
  }

  static async insertExcelData(data, userId) {
    try {
      await pool.query('BEGIN');
      
      for (const row of data) {
        const query = `
          INSERT INTO aman.excel_data (name, email, role, phone, gender, user_id) 
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [row.name, row.email, row.role, row.phone, row.gender, userId]; // Add userId here
        console.log("Values", values);
        await pool.query(query, values);
      }

      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error inserting Excel data:', error);
      throw error;
    }
  }
}

module.exports = File;
