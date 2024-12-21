/**
 * Fungsi untuk membersihkan dan memproses query input
 * @param {string} query - Query mentah dari user
 * @returns {string} - Query yang telah diproses
 */
export const preprocessQuery = (query) => {
  console.log('Preprocessing query:', query);
  return query.trim().toLowerCase(); // Menghapus spasi awal/akhir dan mengubah ke huruf kecil
};

/**
 * Fungsi untuk memecah kalimat menjadi token
 * @param {string} input - Teks input
 * @returns {Array<string>} - Daftar token
 */
export const tokenize = (input) => {
  const tokens = input.toLowerCase().split(/\W+/).filter(Boolean); // Pecah teks dan hapus simbol
  console.log('Tokenized input:', tokens);
  return tokens;
};

/**
 * Fungsi untuk menghapus stopwords dari token
 * @param {Array<string>} tokens - Daftar token
 * @returns {Array<string>} - Token tanpa stopwords
 */
export const removeStopwords = (tokens) => {
  const stopwords =['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be',
    'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot', 'could',
    'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for',
    'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
    'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m',
    'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
    'my', 'myself', 'no', 'nor', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 
    'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 
    'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 
    'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 
    'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 
    'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 
    'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'];
  const filteredTokens = tokens.filter(token => !stopwords.includes(token)); // Hapus token yang merupakan stopwords
  console.log('Tokens after removing stopwords:', filteredTokens);
  return filteredTokens;
};