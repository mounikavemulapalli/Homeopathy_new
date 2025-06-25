/** @format */

// utils/loadBrainFile.js

const fs = require("fs");
const path = require("path");

function loadAllRubrics() {
  const folder = path.join(__dirname, "brain"); // folder: Backend/utils/brain
  const files = fs.readdirSync(folder);
  const allRubrics = {};

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(folder, file);
      const data = JSON.parse(fs.readFileSync(filePath));
      Object.assign(allRubrics, data); // merge each file into one big rubric object
    }
  });

  return allRubrics;
}

module.exports = loadAllRubrics;
