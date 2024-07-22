import { readCSV } from '../../lib/csv';

/**
 * Handler API untuk mendapatkan daftar kategori
 * @param {Object} req - Objek permintaan (request)
 * @param {Object} res - Objek respons (response)
 */
export default async function handler(req, res) {
  try {
    const categories = await readCSV('data/categories.csv');
    console.log('Fetched categories:', categories);
    res.status(200).json(Array.isArray(categories) ? categories : []);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
}
