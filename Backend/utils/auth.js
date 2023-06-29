const generateSigningMessage = (token) => {
  return `Hello, Ai-Blockchain!. Security code: ${token}`;
};

module.exports = {
  generateSigningMessage,
};
