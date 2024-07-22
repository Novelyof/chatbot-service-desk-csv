import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

/**
 * Fungsi untuk membaca dan mem-parsing file CSV
 * @param {string} filePath - Path file CSV
 * @returns {Promise<Array>} Data hasil parsing CSV
 */
export async function readCSV(filePath) {
  const results = [];
  const fullPath = path.resolve(filePath);
  return new Promise((resolve, reject) => {
    fs.createReadStream(fullPath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
