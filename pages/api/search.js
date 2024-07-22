import { preprocessQuery, tokenize, removeStopwords } from '../../lib/nlp';
import { readCSV } from '../../lib/csv';

/**
 * Handler API untuk mencari masalah berdasarkan kategori, subkategori, dan query
 * @param {Object} req - Objek permintaan (request)
 * @param {Object} res - Objek respons (response)
 */
export default async function handler(req, res) {
  const { category, subcategory, query } = req.query;

  if (!category || !subcategory || !query) {
    console.error('Missing category, subcategory, or query');
    return res.status(400).json({ error: 'Category, subcategory, and query are required' });
  }

  try {
    const issues = await readCSV('data/issues.csv');
    console.log('Fetched issues:', issues);

    const preprocessedQuery = preprocessQuery(query);
    console.log('Preprocessed Query:', preprocessedQuery);

    const tokens = tokenize(preprocessedQuery);
    console.log('Tokens:', tokens);

    const filteredTokens = removeStopwords(tokens);
    console.log('Filtered Tokens:', filteredTokens);

    const queryString = filteredTokens.join(' ');
    console.log('Query String:', queryString);

    const matchedIssue = issues.find(issue =>
      issue.category_id === category &&
      issue.subcategory_id === subcategory &&
      filteredTokens.every(token => issue.issue_detail.toLowerCase().includes(token))
    );

    if (matchedIssue) {
      console.log('Matched Issue:', matchedIssue);
      res.status(200).json({ matchedIssue });
    } else {
      console.log('No matching issue found');
      res.status(200).json({ matchedIssue: null });
    }
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Error fetching issues' });
  }
}
