/** @format */

// function analyzeCase(caseInput, toggles) {
//     const symptoms = caseInput.symptoms?.toLowerCase() || "";
//     const thermal = caseInput.thermal?.toLowerCase() || "";
//     const cravings = caseInput.cravings?.toLowerCase() || "";
//     const mentals = caseInput.mentals?.toLowerCase() || "";

//     let result = {
//       main_remedy: "Unknown",
//       analysis: "Insufficient data to determine remedy.",
//     };

//     if (
//       symptoms.includes("itch") &&
//       symptoms.includes("scaly") &&
//       symptoms.includes("winter") &&
//       thermal.includes("hot")
//     ) {
//       result = {
//         main_remedy: "Sulphur",
//         analysis: "Strong psoric miasm with skin affinity, worse by warmth and bathing.",
//       };
//     } else if (
//       symptoms.includes("migraine") &&
//       symptoms.includes("constipation") &&
//       symptoms.includes("sun exposure") &&
//       cravings.includes("salt")
//     ) {
//       result = {
//         main_remedy: "Natrum Muriaticum",
//         analysis:
//           "Migraine with photophobia, aggravated by sun, suppressed grief, and salt craving. Psoro-sycotic.",
//       };
//     }

//     if (toggles?.showExplanation) {
//       if (result.main_remedy === "Sulphur") {
//         result.pioneer_explanation =
//           "Sulphur is suited for chronic skin conditions with itching and burning, worse by warmth.";
//       } else if (result.main_remedy === "Natrum Muriaticum") {
//         result.pioneer_explanation =
//           "Natrum Mur is suited for migraines from grief, worse by sun, with craving for salt.";
//       } else {
//         result.pioneer_explanation = "No remedy-specific explanation available.";
//       }
//     }

//     return result;
//   }

//   module.exports = analyzeCase;
// const fs = require("fs");
// const path = require("path");

// function loadBrainFile(fileName) {
//   try {
//     const filePath = path.join(__dirname, "brain", fileName); // fixed path
//     const data = fs.readFileSync(filePath, "utf-8");

//     try {
//       const parsedData = JSON.parse(data);
//       return parsedData;
//     } catch (parseErr) {
//       console.error(`❌ JSON parsing error in file: ${fileName}`);
//       console.error(parseErr.message);

//       const lines = data.split("\n");
//       lines.forEach((line, index) => {
//         try {
//           JSON.parse(line);
//         } catch (err) {
//           console.log(`--> Possible error at line ${index + 1}: ${line}`);
//         }
//       });

//       throw new Error(`Invalid JSON in ${fileName}`);
//     }
//   } catch (err) {
//     console.error(`Error loading file ${fileName}:`, err.message);
//     return null;
//   }
// }

// module.exports = { loadBrainFile };
const { loadBrainFile } = require("./loadBrainFile");

const mindData = loadBrainFile("mind_symptoms.json");
const skinData = loadBrainFile("skin_symptoms.json");
const complaints = loadBrainFile("chief_complaints.json");
const physicalGeneral = loadBrainFile("physical_general.json"); // <-- add this line

// Add all additional files (use exact names as in your screenshot)
const intercurrentRemedys = loadBrainFile("intercurrent remedys.json");
const eye = loadBrainFile("eye.json");
const hair = loadBrainFile("hair.json");
const ears = loadBrainFile("ears.json");
const pregnancyRelated = loadBrainFile("pregnancy related.json");
const childhoodBehavioral = loadBrainFile("Childhood Behavioral Rubrics.json");
const headPain = loadBrainFile("head pain modalitis and pecularitis.json");
const dreams = loadBrainFile("dreams.json");
const maleReproductive = loadBrainFile("male reproductive system.json");
const obesity = loadBrainFile("obesity.json");
const nose = loadBrainFile("nose.json");
const mouth = loadBrainFile("mouth.json");
const menstruation = loadBrainFile(
  "MENSTRUATION – MODALITIES & PECULIARITIES.json"
);

// Fallback-safe and clean
const brainData = [
  ...(mindData?.rubrics || []),
  ...(skinData?.rubrics || []),
  ...(Array.isArray(complaints) ? complaints : []),
  ...(physicalGeneral?.rubrics || []), // <-- add this line
  ...(intercurrentRemedys?.rubrics || []),
  ...(eye?.rubrics || []),
  ...(hair?.rubrics || []),
  ...(ears?.rubrics || []),
  ...(pregnancyRelated?.rubrics || []),
  ...(childhoodBehavioral?.rubrics || []),
  ...(headPain?.rubrics || []),
  ...(dreams?.rubrics || []),
  ...(maleReproductive?.rubrics || []),
  ...(obesity?.rubrics || []),
  ...(nose?.rubrics || []),
  ...(mouth?.rubrics || []),
  ...(menstruation?.rubrics || []),
];

console.log("✅ brainData loaded:", brainData.length, "rubrics");

module.exports = { brainData };
