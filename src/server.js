import express from "express";
import dotenv from "dotenv";
import pairRoutes from "./routes/pairing.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/pair", pairRoutes);

app.listen(PORT, () => {
  console.log(`✅ Alfred Bot Backend running on port ${PORT}`);
});
