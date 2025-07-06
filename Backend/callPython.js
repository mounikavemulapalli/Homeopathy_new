// callPython.js
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function sendImageToPython(imagePath) {
  const form = new FormData();
  form.append("image", fs.createReadStream(imagePath));
  console.log("📤 Sending image to Python:", imagePath);

  try {
    const res = await axios.post("http://localhost:5001/predict", form, {
      headers: form.getHeaders(),
    });

    console.log("✅ Received from Python:", res.data);
    return res.data.diagnosis;
  } catch (err) {
    console.error("❌ Python API error:", err.response?.data || err.message);
    return "Error in Python diagnosis";
  }
}

module.exports = sendImageToPython;
