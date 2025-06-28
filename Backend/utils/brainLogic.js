/** @format */

const { loadAllRubrics } = require("./loadBrainFile");
const remedyExplanation = require("./brain/remedyExplanation.json"); // singular, matching usage

// Load rubric data once
const rubricData = loadAllRubrics();

/**
 * Only rubric-based remedy analysis.
 * Accepts array of selected rubrics, returns top remedies.
 */
function fullCaseAnalysis({ selectedRubrics }) {
  const combinedScore = {};

  selectedRubrics.forEach(({ name, grade }) => {
    if (!combinedScore[name]) combinedScore[name] = 0;
    combinedScore[name] += grade;
  });

  return Object.entries(combinedScore)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));
}

/**
 * Helper: convert rubric strings to remedies with grading
 */
function getRemediesFromRubrics(rubricTexts = []) {
  const result = [];

  rubricTexts.forEach((rubric) => {
    const normalized = rubric.trim().toLowerCase();
    const grading = rubricData[normalized];

    if (!grading) {
      console.warn("❌ Rubric not found:", rubric);
      return;
    }

    Object.entries(grading.grading).forEach(([remedy, grade]) => {
      result.push({ name: remedy, grade });
    });
  });

  return result;
}

/**
 * Optional: Get explanation for a remedy
 */
function getExplanation(topRemedy, matchedRubrics) {
  const explanationEntry = remedyExplanation[topRemedy]; // use singular here
  if (!explanationEntry)
    return `No classical explanation found for ${topRemedy}.`;

  // Filter matched rubrics that appear in explanation symptoms if available
  const rubricMatches = matchedRubrics.filter((r) =>
    explanationEntry.symptoms?.some((s) =>
      r.toLowerCase().includes(s.toLowerCase())
    )
  );

  const joined = rubricMatches.length
    ? rubricMatches.join(", ")
    : matchedRubrics.slice(0, 3).join(", ");

  return `Selected because ${topRemedy} covers: ${joined}. ${
    explanationEntry.reason || ""
  }`;
}

module.exports = {
  fullCaseAnalysis,
  getRemediesFromRubrics,
  getExplanation, // export the correct function name
};
