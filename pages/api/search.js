import path from 'path';
import { matchIssue } from '../../lib/matcher';

export default async function handler(req, res) {
  const { category, subcategory, query } = req.query;

  console.log('--- Search API Request Received ---');
  console.log('Category:', category);
  console.log('Subcategory:', subcategory);
  console.log('User Query:', query);

  try {
    const filePath = path.join(process.cwd(), 'data', 'issues.csv');
    const matchedIssue = await matchIssue(query, filePath, subcategory);

    if (matchedIssue) {
      res.status(200).json({ matchedIssue });
    } else {
      res.status(404).json({ error: 'No matching issues found.' });
    }
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Error processing search.' });
  }
}

