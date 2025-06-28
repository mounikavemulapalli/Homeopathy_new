/** @format */

const fs = require("fs");
const path = require("path");

function normalize(text) {
  if (typeof text !== "string") return "";
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

      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.rubric && item.grading) {
            const normalizedRubric = normalize(item.rubric);
            const grading = item.grading;
            const remedyMap = {};

            (grading.high || []).forEach((r) => (remedyMap[r] = 3));
            (grading.medium || []).forEach((r) => (remedyMap[r] = 2));
            (grading.low || []).forEach((r) => (remedyMap[r] = 1));

            allRubrics[normalizedRubric] = {
              grading: remedyMap,
              modality: item.modality || "",
              miasm: item.miasm || "",
              notes: item.notes || "",
            };

            console.log("✅ Loaded rubric:", item.rubric);
          }
        });
      } else if (typeof data === "object") {
        Object.entries(data).forEach(([rubricKey, rubricVal]) => {
          if (rubricVal.grading) {
            const normalizedRubric = normalize(rubricKey);
            const grading = rubricVal.grading;
            const remedyMap = {};

            (grading.high || []).forEach((r) => (remedyMap[r] = 3));
            (grading.medium || []).forEach((r) => (remedyMap[r] = 2));
            (grading.low || []).forEach((r) => (remedyMap[r] = 1));

            allRubrics[normalizedRubric] = {
              grading: remedyMap,
              modality: rubricVal.modality || "",
              miasm: rubricVal.miasm || "",
              notes: rubricVal.notes || "",
            };

            console.log("✅ Loaded object rubric:", rubricKey);
          }
        });
      }
    }
  });

  return allRubrics;
}

module.exports = {
  loadAllRubrics,
  normalize,
};
