import express from "express";
import { join } from "path";
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve static files from the current directory

// Route for the root path
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
