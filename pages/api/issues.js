import { readCSV } from '../../lib/csv';

export default async function handler(req, res) {
  try {
    const issues = await readCSV('data/communicationissues.csv');
    console.log('Fetched issues:', issues);

    const sortedIssues = issues.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
    console.log('Top 5 issues:', sortedIssues);

    res.status(200).json(sortedIssues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Error fetching issues' });
  }
}
