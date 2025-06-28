const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY; // Set this in .env file or replace with actual key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

function buildPromptFromCaseData(caseData) {
  const complaints = (caseData.chiefComplaints || [])
    .map((c, i) => `${i + 1}. ${c.complaint} - ${c.description} (${c.duration}, Modalities: ${c.modalities})`)
    .join("\n");

  return `
You are a classical homeopathy expert.

Please analyze this patient case and return:
1. Key summary of findings
2. Miasmatic diagnosis
3. Best homeopathic remedy (with explanation and dosage)

Patient Details:
- Name: ${caseData.name}
- Age: ${caseData.age}
- Gender: ${caseData.gender}
- Marital Status: ${caseData.maritalStatus}
- Occupation: ${caseData.occupation}
- Thermal Reaction: ${caseData.personalHistory?.thermal || "N/A"}
- Cravings / Aversions: ${caseData.personalHistory?.cravingsAversions || "N/A"}

Chief Complaints:
${complaints || "No complaints specified"}

History of Present Illness:
${caseData.historyPresentIllness || "N/A"}

Past History:
- Childhood Diseases: ${caseData.pastHistory?.childhoodDiseases || "N/A"}
- Surgeries / Injuries: ${caseData.pastHistory?.surgeriesInjuries || "N/A"}
- Major Illnesses: ${caseData.pastHistory?.majorIllnesses || "N/A"}

Family History:
${caseData.familyHistory || "N/A"}

Personal History:
- Appetite: ${caseData.personalHistory?.appetite || "N/A"}
- Thirst: ${caseData.personalHistory?.thirst || "N/A"}
- Bowel: ${caseData.personalHistory?.bowel || "N/A"}
- Urine: ${caseData.personalHistory?.urine || "N/A"}
- Sleep: ${caseData.personalHistory?.sleep || "N/A"}
- Dreams: ${caseData.personalHistory?.dreams || "N/A"}
- Sweat: ${caseData.personalHistory?.sweat || "N/A"}
- Habits: ${caseData.personalHistory?.habits || "N/A"}
- Menstrual History: ${caseData.personalHistory?.menstrual || "N/A"}

Mental Symptoms:
${caseData.mentalSymptoms || "N/A"}

General Remarks:
${caseData.generalRemarks || "N/A"}

Doctor's Observations:
${caseData.observationsByDoctor || "N/A"}
  `;
}

router.post("/", async (req, res) => {
  try {
    const caseData = req.body;

    const prompt = buildPromptFromCaseData(caseData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    res.json({ summary: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate summary from Gemini AI" });
  }
});

module.exports = router;
