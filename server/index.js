import express from "express";
import multer from "multer";
import csv from "csvtojson";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 8080;

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only requests from your React frontend
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  }),
);

// Set up multer to handle file uploads (temporary storage)
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Convert CSV file to JSON
    const jsonArray = await csv().fromFile(filePath);

    // Delete the temporary uploaded file
    fs.unlinkSync(filePath);

    res.json({ data: jsonArray });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
