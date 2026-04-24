// 1. Import dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Member = require("../models/Member");
const multer = require("multer");

// 2. Multer config (image upload)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 3. Routes

// ➤ POST: Add member (image is optional, prevents duplicates)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("POST /api/members - Received body:", req.body);
    console.log("POST /api/members - Received file:", req.file);
    // Check for duplicate email or roll number
    const existingMember = await Member.findOne({
      $or: [
        { email: req.body.email },
        { rollNumber: req.body.rollNumber },
      ],
    });

    if (existingMember) {
      const field = existingMember.email === req.body.email ? "email" : "roll number";
      return res.status(400).json({ error: `A member with this ${field} already exists.` });
    }

    const memberData = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      rollNumber: req.body.rollNumber,
      year: req.body.year,
      degree: req.body.degree,
      batch: req.body.batch,
      aim: req.body.aim || "",
      phone: req.body.phone || "",
      linkedin: req.body.linkedin || "",
      skills: req.body.skills || "",
    };

    // Only add image if a file was uploaded
    if (req.file) {
      memberData.image = req.file.filename;
    }

    const member = new Member(memberData);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    // Catch MongoDB duplicate key error (code 11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `A member with this ${field} already exists.` });
    }
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET: All members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET: Single member by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }
    const member = await Member.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE: Remove member by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("DELETE request for member ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    const result = await Member.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ➤ PUT: Update member by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    // Check for duplicate email or rollNumber (excluding this member)
    const existingMember = await Member.findOne({
      _id: { $ne: new mongoose.Types.ObjectId(id) },
      $or: [
        { email: req.body.email },
        { rollNumber: req.body.rollNumber },
      ],
    });

    if (existingMember) {
      const field = existingMember.email === req.body.email ? "email" : "roll number";
      return res.status(400).json({ error: `Another member with this ${field} already exists.` });
    }

    const updateData = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      rollNumber: req.body.rollNumber,
      year: req.body.year,
      degree: req.body.degree,
      batch: req.body.batch,
      aim: req.body.aim || "",
      phone: req.body.phone || "",
      linkedin: req.body.linkedin || "",
      skills: req.body.skills || "",
    };

    // Only update image if a new file was uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const member = await Member.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      updateData,
      { new: true, runValidators: true }
    );

    if (!member) return res.status(404).json({ error: "Member not found" });

    res.json(member);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `Another member with this ${field} already exists.` });
    }
    res.status(500).json({ error: err.message });
  }
});

// 4. Export router
module.exports = router;