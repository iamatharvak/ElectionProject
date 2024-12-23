const express = require("express");
const cors = require("cors");
const client = require("./db"); // Import the database connection

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route to get all election results
app.get("/api/results", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM election_results");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data", err.stack);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Route to get election results by state
app.get("/api/results/:state", async (req, res) => {
  const { state } = req.params;
  try {
    const result = await client.query(
      "SELECT * FROM election_results WHERE state = $1",
      [state]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data", err.stack);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
