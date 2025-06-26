/** @format */

// utils/loadBrainFile.js

const fs = require("fs");
const path = require("path");

function normalize(text) {
  return text.trim().toLowerCase();
}

function loadAllRubrics() {
  const folder = path.join(__dirname, "brain");
  const files = fs.readdirSync(folder);
  const allRubrics = {};

  files.forEach((file) => {
    if (file.endsWith(".json") && file !== "miasmMap.json") {
      const filePath = path.join(folder, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      Object.entries(data).forEach(([rubricKey, rubricVal]) => {
        const normalizedRubric = normalize(rubricKey);

        // Case 1: Already in { remedy: score } format
        if (typeof rubricVal === "object" && !rubricVal.grading) {
          allRubrics[normalizedRubric] = rubricVal;
        }

        // Case 2: Has grading.high/medium/low
        else if (rubricVal.grading) {
          const grading = rubricVal.grading;
          const remedyMap = {};

          (grading.high || []).forEach((r) => (remedyMap[r] = 3));
          (grading.medium || []).forEach((r) => (remedyMap[r] = 2));
          (grading.low || []).forEach((r) => (remedyMap[r] = 1));

          allRubrics[normalizedRubric] = remedyMap;
        }
      });
    }
  });

  return allRubrics;
}

module.exports = loadAllRubrics;
