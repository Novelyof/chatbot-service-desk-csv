import path from 'path'; // Modul untuk bekerja dengan path file
import { readCSV } from '../../lib/csv'; // Import fungsi baca CSV

/**
 * API handler untuk mengambil data kategori
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'categoriesdummy.csv'); // Path file kategori

  try {
    const categories = await readCSV(filePath); // Baca data kategori
    console.log('Categories fetched:', categories);
    res.status(200).json(categories); // Kembalikan data kategori dalam JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' }); // Tangani error
  }
}
