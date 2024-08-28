const pool = require('../config/db.js');

class File {
  static async saveFileMetadata(name, type, content) {
    try {
      const result = await pool.query(
        'INSERT INTO aman.files (name, type, content) VALUES ($1, $2, $3) RETURNING *',
        [name, type, content]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving file metadata:', error);
      throw error;
    }
  }

  static async insertExcelData(data) {
    try {
      // Start a transaction
      await pool.query('BEGIN');
      
      for (const row of data) {
        const query = `
          INSERT INTO aman.excel_data (name, email, role, phone, gender) 
          VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [row.name, row.email, row.role, row.phone, row.gender]; // Map according to your data
        await pool.query(query, values);
      }

      // Commit the transaction
      await pool.query('COMMIT');
    } catch (error) {
      // Rollback the transaction on error
      await pool.query('ROLLBACK');
      console.error('Error inserting Excel data:', error);
      throw error;
    }
  }
}

module.exports = File;
