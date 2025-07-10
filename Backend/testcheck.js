const checkIntercurrentRemedy = require("./intercurrentMatcher");

const testSummary = `
  Patient shows signs of suppressed emotions after childhood domination,
  has a strong perfectionist tendency, and a family history of cancer.
`;

const result = checkIntercurrentRemedy(testSummary);
console.log(result);
