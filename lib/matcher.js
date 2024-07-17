const { preprocessText } = require('./nlp');
const { parseCSV } = require('./csv');

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
