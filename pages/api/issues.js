import { readCSV } from '../../lib/csv';

/**
 * Handler API untuk mendapatkan daftar masalah
 * @param {Object} req - Objek permintaan (request)
 * @param {Object} res - Objek respons (response)
 */
export default async function handler(req, res) {
  try {
    const issues = await readCSV('data/issues.csv');
    console.log('Fetched issues:', issues);
    
    // Mengurutkan masalah berdasarkan frekuensi dan membatasi ke 5 teratas
    const sortedIssues = issues.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
    
    res.status(200).json(sortedIssues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Error fetching issues' });
  }
}
