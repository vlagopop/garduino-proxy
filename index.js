const express = require("express");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxEW-Ftbwuct6LpjrLxr_KMzQdGBZ6ZXH9CjpwZEJNVf6_lc0PMG7f1UxVsfdh-B_Kc/exec?value1=123&value2=456");
    const text = await response.text();
    res.send({ status: "ok", google_response: text });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});