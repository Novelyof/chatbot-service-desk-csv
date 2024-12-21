import { readCSV } from '../../lib/csv';

/**
 * API handler untuk mengambil data subkategori berdasarkan kategori
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
  const { category } = req.query; // Ambil parameter kategori dari query string
  console.log('Category query parameter:', category);

  try {
    const subcategories = await readCSV('data/subcategories.csv'); // Baca file subkategori
    console.log('Fetched subcategories:', subcategories);

    // Filter subkategori berdasarkan kategori
    const filteredSubcategories = subcategories.filter(sub => sub.category_id === category);
    console.log('Filtered subcategories:', filteredSubcategories);

    res.status(200).json(filteredSubcategories); // Kembalikan data subkategori yang sesuai
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Error fetching subcategories' }); // Tangani error
  }
}
