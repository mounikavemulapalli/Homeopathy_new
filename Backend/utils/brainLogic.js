/** @format */

// /** @format */

// const { loadAllRubrics } = require("./loadBrainFile");
// const remedyExplanation = require("./brain/remedyExplanation.json"); // singular, matching usage

// // Load rubric data once
// const rubricData = loadAllRubrics();

// /**
//  * Only rubric-based remedy analysis.
//  * Accepts array of selected rubrics, returns top remedies.
//  */
// function fullCaseAnalysis({ selectedRubrics }) {
//   const combinedScore = {};
//   const remedyRubricCount = {};
//   selectedRubrics.forEach(({ name, grade }) => {
//     if (!combinedScore[name]) combinedScore[name] = 0;
//     combinedScore[name] += grade >= 3 ? grade * 2 : grade;
//     if (!remedyRubricCount[name]) remedyRubricCount[name] = 0;
//     remedyRubricCount[name]++;
//   });

//   return Object.entries(combinedScore)
//     .map(([name, score]) => {
//       const rubricCount = remedyRubricCount[name];
//       const penalty = score < 6 && rubricCount > 3 ? 2 : 0; // If low total score + too many weak rubrics → penalize

//       return { name, score: score - penalty };
//     })
//     .sort((a, b) => b.score - a.score);
// }

// function getRemediesFromRubrics(rubricTexts = []) {
//   const result = [];

//   rubricTexts.forEach((rubric) => {
//     const normalized = rubric.trim().toLowerCase();
//     const grading = rubricData[normalized];

//     if (!grading) {
//       console.warn("❌ Rubric not found:", rubric);
//       return;
//     }

//     Object.entries(grading.grading).forEach(([remedy, grade]) => {
//       result.push({ name: remedy, grade });
//     });
//   });

//   return result;
// }

// /**
//  * Optional: Get explanation for a remedy
//  */
// function getExplanation(topRemedy, matchedRubrics) {
//   const explanationEntry = remedyExplanation[topRemedy]; // use singular here
//   if (!explanationEntry)
//     return `No classical explanation found for ${topRemedy}.`;

//   // Filter matched rubrics that appear in explanation symptoms if available
//   const rubricMatches = matchedRubrics.filter((r) =>
//     explanationEntry.symptoms?.some((s) =>
//       r.toLowerCase().includes(s.toLowerCase())
//     )
//   );

//   const joined = rubricMatches.length
//     ? rubricMatches.join(", ")
//     : matchedRubrics.slice(0, 3).join(", ");

//   return `Selected because ${topRemedy} covers: ${joined}. ${
//     explanationEntry.reason || ""
//   }`;
// }

// module.exports = {
//   fullCaseAnalysis,
//   getRemediesFromRubrics,
//   getExplanation, // export the correct function name
// };
/** @format */

const { loadAllRubrics } = require("./loadBrainFile");
const remedyExplanation = require("./brain/remedyExplanation.json"); // singular, matching usage
const stringSimilarity = require("string-similarity");

// Load rubric data once
const { rubricData, remedyFrequency } = loadAllRubrics();

/**
 * Scores remedies based on rubric grade and optionally applies rarity weighting.
 */
function fullCaseAnalysis({ remedyGrades, remedyFrequency }) {
  const combinedScore = {};
  const remedyRubricCount = {};

  remedyGrades.forEach(({ name, grade }) => {
    const rarityBoost = remedyFrequency?.[name] ? 1 / remedyFrequency[name] : 1;

    const weighted = (grade >= 3 ? grade * 2 : grade) * rarityBoost;

    combinedScore[name] = (combinedScore[name] || 0) + weighted;
    remedyRubricCount[name] = (remedyRubricCount[name] || 0) + 1;
  });

  return Object.entries(combinedScore)
    .map(([name, score]) => {
      const rubricCount = remedyRubricCount[name];
      const penalty = score < 6 && rubricCount > 3 ? 2 : 0;

      return { name, score: score - penalty };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Converts an array of rubric texts into a list of remedies with grades.
 */
function getRemediesFromRubrics(rubricTexts = []) {
  const result = [];
  const knownRubrics = Object.keys(rubricData || {}); 
  rubricTexts.forEach((rubric) => {
    const normalized = rubric.trim().toLowerCase();
    let grading = rubricData[normalized];

    // If rubric not found, try fuzzy match
    if (!grading || !grading.grading) {
      // const knownRubrics = Object.keys(rubricData || {});
      const match = stringSimilarity.findBestMatch(normalized, knownRubrics);
      const bestMatch = match.bestMatch;

      if (bestMatch.rating > 0.6 && rubricData[bestMatch.target]?.grading) {
        console.warn(`🔍 Substituted "${rubric}" with "${bestMatch.target}"`);
        grading = rubricData[bestMatch.target];
      } else {
        console.warn(`❌ Rubric not found and no good match: "${rubric}"`);
        return; // skip this rubric
      }
    }

    // if (!grading?.grading) {
    //   console.warn(`⚠️ grading object invalid for rubric "${rubric}"`);
    //   return;
    // }

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
  const explanationEntry = remedyExplanation[topRemedy];
  if (!explanationEntry)
    return `No classical explanation found for ${topRemedy}.`;

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

/**
 * Main wrapper to be called externally.
 * Input: rubricTexts[] (e.g. ["fear of death", "wants company"])
 */
function fullCaseAnalysisWrapper(selectedRubricTexts) {
  const remedyGrades = getRemediesFromRubrics(selectedRubricTexts);
  return fullCaseAnalysis({ remedyGrades, remedyFrequency });
}

module.exports = {
  fullCaseAnalysis: fullCaseAnalysisWrapper,
  getRemediesFromRubrics,
  getExplanation,
};
