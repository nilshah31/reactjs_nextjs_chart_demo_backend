const express = require("express");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


// Swagger route
const swaggerDocument = require("./docs/api-doc.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Helper to read JSON files
const readJSON = (filename) => {
  const filePath = path.join(__dirname, "mock-data", filename);
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
};

// API 1: World Trade Growth
app.get("/api/world-trade-growth", (req, res) => {
  const data = readJSON("worldTradeGrowth.json");
  res.json(data);
});

// API 2: CPI Inflation
app.get("/api/cpi-inflation", (req, res) => {
  const data = readJSON("cpiInflation2025.json");
  res.json(data);
});

// API 3: Real GDP Growth
app.get("/api/real-gdp-growth", (req, res) => {
  const data = readJSON("realGDPGrowth2025.json");
  res.json(data);
});

// API 4: Real GDP Deviation
app.get("/api/real-gdp-deviation", (req, res) => {
  const data = readJSON("realGDPDeviation2026.json");
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
