import { readCSV } from '../../lib/csv';

export default async function handler(req, res) {
  try {
    const issues = await readCSV('data/issues.csv');
    console.log('Fetched issues:', issues);
    
    // Sort issues by frequency and limit to top 5
    const sortedIssues = issues.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
    
    res.status(200).json(sortedIssues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Error fetching issues' });
  }
}
