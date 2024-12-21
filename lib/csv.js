import fs from 'fs'; // Modul file system untuk membaca file
import Papa from 'papaparse'; // Library untuk parsing CSV

/**
 * Fungsi untuk membaca file CSV dan mem-parsing isinya
 * @param {string} filePath - Path lokasi file CSV
 * @returns {Array<Object>} - Data yang telah diparsing
 */
export const readCSV = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8'); // Membaca file CSV secara sinkron
    console.log(`CSV Data from ${filePath} loaded successfully.`);
    
    const result = Papa.parse(data, { header: true }); // Parsing CSV ke bentuk JSON
    const filteredData = result.data.filter(row => Object.keys(row).length > 1); // Menghapus baris kosong
    
    console.log(`Parsed ${filteredData.length} rows from ${filePath}`);
    return filteredData; // Mengembalikan data yang telah difilter
  } catch (error) {
    console.error('Error reading CSV:', error);
    throw error; // Jika ada error, dilempar ke caller
  }
};
