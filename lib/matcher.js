import { preprocessQuery, tokenize, removeStopwords } from './nlp'; // Import utility NLP
import { readCSV } from './csv'; // Import fungsi pembaca CSV

/**
 * Fungsi untuk mencocokkan query user dengan dataset masalah
 * @param {string} userInput - Query dari user
 * @param {string} csvFilePath - Path file CSV berisi data masalah
 * @param {string} selectedSubcategory - Subkategori yang dipilih user
 * @returns {Object|null} - Masalah yang paling cocok atau null jika tidak ditemukan
 */
export const matchIssue = async (userInput, csvFilePath, selectedSubcategory) => {
  console.log('--- Matching Process Started ---');
  
  // Langkah 1: Membaca semua data masalah dari CSV
  const issues = await readCSV(csvFilePath);
  console.log('Total Issues Loaded:', issues.length);

  // Langkah 2: Filter masalah berdasarkan subkategori
  const filteredIssues = issues.filter(issue => issue.subcategory_id === selectedSubcategory);
  console.log(`Filtered Issues for Subcategory (${selectedSubcategory}):`, filteredIssues);

  if (filteredIssues.length === 0) {
    console.log('No issues found for the selected subcategory.');
    return null;
  }

  // Langkah 3: Preproses query dari user (mengubah ke lowercase, tokenisasi, dan hapus stopword)
  const userTokens = removeStopwords(tokenize(preprocessQuery(userInput)));
  console.log('User Input Tokens:', userTokens);

  // Langkah 4: Hitung tingkat kesamaan untuk setiap masalah yang telah difilter
  let bestMatch = null;
  let highestSimilarity = 0;

  filteredIssues.forEach(issue => {
    const issueTokens = removeStopwords(tokenize(preprocessQuery(issue.issue_detail))); // Tokenisasi data masalah
    console.log(`Comparing with Issue: ${issue.issue_detail}`);
    console.log('Issue Tokens:', issueTokens);

    const commonTokens = userTokens.filter(token => issueTokens.includes(token)); // Hitung token yang cocok
    const similarity = (commonTokens.length / userTokens.length) * 100; // Persentase kesamaan

    console.log(`Similarity with Issue "${issue.issue_detail}":`, similarity);

    if (similarity > highestSimilarity) {
      highestSimilarity = similarity; // Perbarui tingkat kesamaan tertinggi
      bestMatch = { ...issue, similarity }; // Simpan masalah yang paling cocok
    }
  });

  if (bestMatch) {
    console.log('Best Match Found:', bestMatch);
    return bestMatch; // Kembalikan masalah yang paling cocok
  }

  console.log('No matching issues found.');
  return null; // Jika tidak ada masalah yang cocok
};
