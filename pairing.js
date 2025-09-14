import express from "express";
import { startSession } from "../services/baileysService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    await startSession(phoneNumber);
    res.json({ message: "QR generated. Check Render logs to scan it." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
