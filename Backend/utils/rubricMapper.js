/** @format */

// utils/rubricMapper.js

const rubricDB = require("./brain/dreams.json"); // contains rubric keywords and remedies

function mapSymptomsToRubrics(symptoms) {
  const matchedRubrics = [];

  symptoms.forEach((symptom) => {
    for (const rubric of rubricDB) {
      if (symptom.toLowerCase().includes(rubric.keyword.toLowerCase())) {
        matchedRubrics.push({
          rubric: rubric.rubric,
          remedies: rubric.remedies,
          score: rubric.score || 1, // you can weigh some rubrics higher
        });
      }
    }
  });

  return matchedRubrics;
}

module.exports = { mapSymptomsToRubrics };
