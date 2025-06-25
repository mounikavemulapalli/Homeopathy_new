/** @format */

// utils/remedySelector.js

function analyzeRubrics(rubrics) {
  const remedyScore = {};

  rubrics.forEach((rubric) => {
    rubric.remedies.forEach((remedy) => {
      if (!remedyScore[remedy]) remedyScore[remedy] = 0;
      remedyScore[remedy] += rubric.score;
    });
  });

  // Sort remedies by total score
  const sortedRemedies = Object.entries(remedyScore)
    .sort((a, b) => b[1] - a[1])
    .map(([remedy, score]) => ({ remedy, score }));

  return sortedRemedies;
}

module.exports = { analyzeRubrics };
