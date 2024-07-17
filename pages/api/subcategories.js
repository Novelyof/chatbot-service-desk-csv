import { readCSV } from '../../lib/csv';

export default async function handler(req, res) {
  const { category } = req.query;

  try {
    const subcategories = await readCSV('data/subcategories.csv');
    console.log('All subcategories:', subcategories);
    const filteredSubcategories = subcategories.filter(sub => sub.category_id === category);
    console.log(`Filtered subcategories for category ${category}:`, filteredSubcategories);
    res.status(200).json(filteredSubcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Error fetching subcategories' });
  }
}
