/** @format */

// /** @format */

// // const analyzeCase = (req, res) => {
// //     const caseData = req.body;
// //     // Process the caseData here
// //     res.json({ remedy: "Sulphur", analysis: "Strong psoric miasm with skin affinity." });
// //   };

// //   module.exports = { analyzeCase };
// // const { brainData } = require('../utils/brainLogic');
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();
//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData.map((entry) => entry.rubric);
//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.4) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       entry.remedies.forEach(({ name, grade }) => {
//         if (!remedyScore[name]) remedyScore[name] = 0;
//         remedyScore[name] += grade;
//       });
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//   });
// };
// const { brainData } = require("../utils/brainLogic");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();
//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData.map((entry) => entry.rubric);
//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         // 🎯 lowered threshold from 0.4 → 0.35
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);
//   console.log("✅ rubrics =", req.body.rubrics);
//   console.log("✅ caseInput =", req.body.caseInput);
//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   console.log("📩 Incoming caseInput:", caseInput);
//   console.log("🔍 Rubrics used:", finalRubrics);

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       if (entry.remedies && Array.isArray(entry.remedies)) {
//         entry.remedies.forEach(({ name, grade }) => {
//           if (!remedyScore[name]) remedyScore[name] = 0;
//           remedyScore[name] += grade;
//         });
//       }
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   console.log("🏁 Final remedies:", sorted.slice(0, 10));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: sorted[0]?.name || "N/A",
//     dosage: "1M once daily",
//     analysis: "Based on dominant mind and physical rubrics",
//     pioneer_explanation: `Selected based on rubric match: ${finalRubrics
//       .slice(0, 3)
//       .join(", ")}`,
//   });
// };
// const { brainData } = require("../utils/brainLogic");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not loaded or not an array");
//     return [];
//   }

//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();

//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData
//     .map((entry) => entry.rubric)
//     .filter((r) => typeof r === "string" && r.trim() !== "");

//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);
//   console.log("✅ rubrics =", req.body.rubrics);
//   console.log("✅ caseInput =", req.body.caseInput);

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   console.log("📩 Incoming caseInput:", caseInput);
//   console.log("🔍 Rubrics used:", finalRubrics);

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not properly loaded");
//     return res
//       .status(500)
//       .json({ error: "Internal error: brain data not available." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       if (entry.remedies && Array.isArray(entry.remedies)) {
//         entry.remedies.forEach(({ name, grade }) => {
//           if (!remedyScore[name]) remedyScore[name] = 0;
//           remedyScore[name] += grade;
//         });
//       }
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   console.log("🏁 Final remedies:", sorted.slice(0, 10));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: sorted[0]?.name || "N/A",
//     dosage: "1M once daily",
//     analysis: "Based on dominant mind and physical rubrics",
//     pioneer_explanation: `Selected based on rubric match: ${finalRubrics
//       .slice(0, 3)
//       .join(", ")}`,
//   });
// };
// exports.searchRubrics = (req, res) => {
//   const query = req.query.q?.toLowerCase() || "";
//   const matches = brainData
//     .map((entry) => entry.rubric)
//     .filter((rubric) => rubric.toLowerCase().includes(query));
//   res.json({ results: matches });
// };

/** @format */

// const {
//   fullCaseAnalysis,
//   getRemediesFromRubrics,
// } = require("../utils/brainLogic");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   const text = Object.values(caseInput || {}).join(" ").toLowerCase();

//   const phrases = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   // Load all rubrics from brainLogic’s loaded brain data
//   const allRubrics = Object.keys(require("../utils/loadBrainFile").loadAllRubrics());

//   const matches = new Set();

//   phrases.forEach((phrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(phrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   const selectedRubrics = getRemediesFromRubrics(finalRubrics);
//   const sorted = fullCaseAnalysis({ selectedRubrics });
//   const topRemedy = sorted[0]?.name || "N/A";
//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: topRemedy,
//     dosage: "1M once daily",
//     analysis: "Based on rubric similarity only",
//     pioneer_explanation: generateExplanation(topRemedy, finalRubrics),
//   });
// };

// exports.searchRubrics = (req, res) => {
//   const query = req.query.q?.toLowerCase() || "";
//   const allRubrics = Object.keys(
//     require("../utils/loadBrainFile").loadAllRubrics()
//   );
//   const results = allRubrics.filter((rubric) =>
//     rubric.toLowerCase().includes(query)
//   );
//   res.json({ results });
// };
const {
  fullCaseAnalysis,
  getRemediesFromRubrics,
} = require("../utils/brainLogic");
const { loadAllRubrics } = require("../utils/loadBrainFile");
const stringSimilarity = require("string-similarity");
const remedyExplanation = require("../utils/brain/remedyExplanation.json");

function extractRubricsFromCase(caseInput) {
  const text = Object.values(caseInput || {})
    .join(" ")
    .toLowerCase();
  const phrases = text
    .split(/[,.;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const allRubrics = Object.keys(loadAllRubrics());
  const matches = new Set();

  phrases.forEach((phrase) => {
    const bestMatch = stringSimilarity.findBestMatch(phrase, allRubrics);
    bestMatch.ratings.forEach((match) => {
      if (match.rating > 0.3) {
        matches.add(match.target);
      }
    });
  });

  return Array.from(matches);
}

exports.analyzeCase = (req, res) => {
  try {
    const { rubrics, caseInput } = req.body;
    let finalRubrics = rubrics || [];

    if ((!finalRubrics || !finalRubrics.length) && caseInput) {
      finalRubrics = extractRubricsFromCase(caseInput);
    }

    if (!finalRubrics.length) {
      return res
        .status(400)
        .json({ error: "No rubrics or valid caseInput found." });
    }

    console.log("Extracted rubrics:", finalRubrics);

    const selectedRubrics = getRemediesFromRubrics(finalRubrics);
    const sorted = fullCaseAnalysis({ selectedRubrics });

    const top3 = sorted.slice(0, 3);

    const getInfo = (remedyName) => {
      return (
        remedyExplanation.find(
          (entry) => entry.remedy.toLowerCase() === remedyName.toLowerCase()
        ) || null
      );
    };
const info0 = getInfo(top3[0]?.name);
    res.json({
      main_remedy: {
        name: top3[0]?.name || "N/A",
        miasm: getInfo(top3[0]?.name)?.miasm || "N/A",
        reason: getInfo(top3[0]?.name)?.reason || "No reason found.",
        key_symptoms: getInfo(top3[0]?.name)?.symptoms || [],
      },
      next_best_remedies: top3.slice(1).map((r) => ({
        name: r.name,
        reason: getInfo(r.name)?.reason || "No reason found.",
      })),
    });
  } catch (error) {
    console.error("analyzeCase error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchRubrics = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const allRubrics = Object.keys(loadAllRubrics());

  const results = allRubrics
    .filter((rubric) => rubric.toLowerCase().includes(query))
    .map((rubric) => ({
      target: rubric,
      rating: 1, // dummy static rating
    }));

  res.json({
    main_remedy: {
      name: top3[0]?.name || "N/A",
      miasm: info0?.miasm || "N/A",
      reason: info0?.pioneerRemarks?.[0] || "No reason found.",
      key_symptoms: info0?.keynotes || [],
      dosage: "1M once daily", // or customize per remedy
    },
    next_best_remedies: top3.slice(1).map((r) => {
      const info = getInfo(r.name);
      return {
        name: r.name,
        reason: info?.pioneerRemarks?.[0] || "No reason found.",
      };
    }),
  });
};
