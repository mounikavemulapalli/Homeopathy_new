/** @format */

// /** @format */

// const fs = require("fs");
// const path = require("path");

// // Path to rubric JSONs
// const rubricFolder = path.join(__dirname, "brain");

// // Step 1: Load all remedy names from rubric files
// const remedySet = new Set();

// const rubricFiles = fs
//   .readdirSync(rubricFolder)
//   .filter((f) => f.endsWith(".json") && f !== "miasmMap.json");

// rubricFiles.forEach((file) => {
//   const filePath = path.join(rubricFolder, file);
//   const rubricData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//   Object.values(rubricData).forEach((remedyGrades) => {
//     if (typeof remedyGrades === "object") {
//       Object.keys(remedyGrades).forEach((remedy) => remedySet.add(remedy));
//     }
//   });
// });

// // Step 2: Default miasm map (can be expanded)
// const defaultMap = {
//   "Natrum Muriaticum": "Sycotic",
//   Sepia: "Sycotic",
//   Ignatia: "Psoric",
//   Phosphorus: "Tubercular",
//   Chamomilla: "Psoric",
//   Pulsatilla: "Psoric",
//   Graphites: "Sycotic",
//   Sulphur: "Psoric",
//   Tuberculinum: "Tubercular",
//   Lachesis: "Syphilitic",
//   "Calcarea Carbonica": "Psoric",
// };

// // Step 3: Build final miasm map
// const miasmMap = {};
// [...remedySet].sort().forEach((remedy) => {
//   miasmMap[remedy] = defaultMap[remedy] || "Unknown";
// });

// // Step 4: Save to utils/brain/miasmMap.json
// const outputPath = path.join(rubricFolder, "miasmMap.json");
// fs.writeFileSync(outputPath, JSON.stringify(miasmMap, null, 2), "utf-8");

// console.log(
//   `✅ miasmMap.json generated with ${
//     Object.keys(miasmMap).length
//   } remedies in utils/brain/`
// );
/** @format */

const fs = require("fs");
const path = require("path");

const rubricFolder = path.join(__dirname, "brain");
const remedySet = new Set();

// Step 1: Collect all remedies from rubric files
const rubricFiles = fs
  .readdirSync(rubricFolder)
  .filter((f) => f.endsWith(".json") && f !== "miasmMap.json");

rubricFiles.forEach((file) => {
  const rubricData = JSON.parse(
    fs.readFileSync(path.join(rubricFolder, file), "utf-8")
  );
  Object.values(rubricData).forEach((remedyGrades) => {
    if (typeof remedyGrades === "object") {
      Object.keys(remedyGrades).forEach((remedy) => remedySet.add(remedy));
    }
  });
});

// Step 2: Expanded defaultMap with AI-suggested miasms
const defaultMap = {
  "Natrum Muriaticum": "Sycotic",
  Sepia: "Sycotic",
  Ignatia: "Psoric",
  Phosphorus: "Tubercular",
  Chamomilla: "Psoric",
  Pulsatilla: "Psoric",
  Graphites: "Sycotic",
  Sulphur: "Psoric",
  Tuberculinum: "Tubercular",
  Lachesis: "Syphilitic",
  "Calcarea Carbonica": "Psoric",
  "Nux Vomica": "Psoric",
  "Arsenicum Album": "Syphilitic",
  Lycopodium: "Sycotic",
  Silicea: "Psoric",
  "Mercurius Solubilis": "Syphilitic",
  Carcinosin: "Cancer",
  Medorrhinum: "Sycotic",
  "Kali Carbonicum": "Psoric",
  "Calcarea Phosphorica": "Tubercular",
  "Hepar Sulphuris": "Syphilitic",
  "Thuja Occidentalis": "Sycotic",
  "Baryta Carbonica": "Sycotic",
  "Natrum Sulphuricum": "Sycotic",
  "Antimonium Crudum": "Psoric",
  "Rhus Toxicodendron": "Sycotic",
  "Aurum Metallicum": "Syphilitic",
};

// Step 3: Generate miasm map and split by type
const miasmMap = {};
const grouped = {
  Psoric: {},
  Sycotic: {},
  Syphilitic: {},
  Tubercular: {},
  Cancer: {},
  Unknown: {},
};

[...remedySet].sort().forEach((remedy) => {
  const miasm = defaultMap[remedy] || "Unknown";
  miasmMap[remedy] = miasm;
  if (!grouped[miasm]) grouped[miasm] = {};
  grouped[miasm][remedy] = miasm;
});

// Step 4: Write main map
fs.writeFileSync(
  path.join(rubricFolder, "miasmMap.json"),
  JSON.stringify(miasmMap, null, 2),
  "utf-8"
);

// Step 5: Write split files
Object.entries(grouped).forEach(([miasm, remedies]) => {
  const filename = `${miasm.toLowerCase()}.json`;
  fs.writeFileSync(
    path.join(rubricFolder, filename),
    JSON.stringify(remedies, null, 2),
    "utf-8"
  );
});

console.log(`✅ Total Remedies: ${Object.keys(miasmMap).length}`);
console.log(
  `📁 Files generated in utils/brain/: miasmMap.json + psoric.json + sycotic.json + ...`
);
