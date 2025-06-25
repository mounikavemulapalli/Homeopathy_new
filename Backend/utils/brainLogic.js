/** @format */

// const { brainData } = require("./brainLogic"); // brainData already export chestunnaru

// function analyzeCase(caseInput) {
//   const symptoms = caseInput.symptoms?.toLowerCase() || "";
//   const cravings = caseInput.cravings?.toLowerCase() || "";
//   const thermal = caseInput.thermal?.toLowerCase() || "";
//   const mentals = caseInput.mentals?.toLowerCase() || "";

//   // All user input values combine cheyyadam (for matching)
//   const userInput = [symptoms, cravings, thermal, mentals].join(" ");

//   // Remedies match logic
//   let matchedRemedies = [];

//   for (const rubric of brainData) {
//     // Rubric structure: { name: "...", remedies: ["..."] }
//     if (!rubric || !rubric.name || !rubric.remedies) continue;
//     // Rubric name lo user input word unda check cheyyadam
//     if (userInput.includes(rubric.name.toLowerCase())) {
//       matchedRemedies.push(...rubric.remedies);
//     }
//   }

//   // Remedies unique cheyyadam
//   matchedRemedies = [...new Set(matchedRemedies)];

//   if (matchedRemedies.length === 0) {
//     return {
//       main_remedy: undefined,
//       analysis: "No matching rubrics found in brainData.",
//     };
//   } else {
//     return {
//       main_remedy: matchedRemedies.join(", "),
//       analysis: "Matching remedies found based on user input.",
//     };
//   }
// }

// module.exports = { analyzeCase };
// utils/brainLogic.js

// utils/finalBrain.js

const { mapSymptomsToRubrics } = require("./rubricMapper");
const { analyzeRubrics } = require("./remedySelector");
const { analyzeFacialFeatures } = require("./facialAnalyzer");
const { analyzeSkinCondition } = require("./skinImageAnalyzer");
const { interpretLabData } = require("./labAnalyzer");
const remedyExplanations = require("./brain/remedyExplanation.json");

function fullCaseAnalysis({
  symptoms,
  facialFeatures,
  skinDisease,
  labValues,
}) {
  let combinedScore = {};

  // Symptom → Rubric → Remedy
  const rubrics = mapSymptomsToRubrics(symptoms);
  const symptomRemedies = analyzeRubrics(rubrics);
  symptomRemedies.forEach(({ remedy, score }) => {
    if (!combinedScore[remedy]) combinedScore[remedy] = 0;
    combinedScore[remedy] += score * 2; // High weight for subjective symptoms
  });

  // Facial
  const facialRemedies = analyzeFacialFeatures(facialFeatures);
  for (const [remedy, score] of Object.entries(facialRemedies)) {
    if (!combinedScore[remedy]) combinedScore[remedy] = 0;
    combinedScore[remedy] += score;
  }

  // Skin Image
  const skinRemedies = analyzeSkinCondition(skinDisease);
  skinRemedies.forEach((rem) => {
    if (!combinedScore[rem]) combinedScore[rem] = 0;
    combinedScore[rem] += 2;
  });

  // Lab Values
  const labFindings = interpretLabData(labValues);
  labFindings.forEach((f) => {
    f.remedies.forEach((rem) => {
      if (!combinedScore[rem]) combinedScore[rem] = 0;
      combinedScore[rem] += 1;
    });
  });

  // Final ranking
  const sortedRemedies = Object.entries(combinedScore)
    .sort((a, b) => b[1] - a[1])
    .map(([remedy, score]) => ({ remedy, score }));

  const topRemedies = sortedRemedies.slice(0, 4);

  return {
    bestRemedy: topRemedies[0].remedy,
    allTopRemedies: topRemedies.map((r) => ({
      remedy: r.remedy,
      score: r.score,
      explanation: remedyExplanations[r.remedy] || "No explanation available",
    })),
    rubricsMatched: rubrics.map((r) => r.rubric),
    facialMatched: Object.keys(facialRemedies),
    skinDiseaseMatched: skinDisease,
    labFindings,
  };
}

module.exports = { fullCaseAnalysis };
