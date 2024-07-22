const { preprocessText } = require('./nlp');
const { parseCSV } = require('./csv');

/**
 * Fungsi untuk mencocokkan input pengguna dengan masalah dalam dataset
 * @param {string} userInput - Input dari pengguna
 * @param {string} csvFilePath - Path file CSV yang berisi data masalah
 * @returns {Object|null} Masalah yang cocok atau null jika tidak ada yang cocok
 */
const matchIssue = async (userInput, csvFilePath) => {
  const cleanedInput = preprocessText(userInput);
  const issues = await parseCSV(csvFilePath);

  for (const issue of issues) {
    const cleanedIssueDetail = preprocessText(issue.issue_detail);
    if (cleanedIssueDetail.includes(cleanedInput)) {
      return issue;
    }
  }
  return null;
};

module.exports = { matchIssue };
