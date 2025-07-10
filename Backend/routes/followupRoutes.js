/** @format */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FollowUp = require("../models/FollowUp");

// Get today's follow-ups
router.get("/today", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const followUps = await FollowUp.find({ date: today });
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all follow-ups
router.get("/", async (req, res) => {
  try {
    const followUps = await FollowUp.find();
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new follow-up
router.post("/", async (req, res) => {
  try {
    const followUp = new FollowUp(req.body);
    await followUp.save();
    res.status(201).json(followUp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update follow-up by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated document
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete follow-up by ID
router.delete("/:id", async (req, res) => {
  try {
    await FollowUp.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
