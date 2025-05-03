import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/proxy', async (req, res) => {
  const { value1, value2 } = req.query;

  // Validate inputs (optional but recommended)
  if (!value1 || !value2) {
    return res.status(400).send('Missing value1 or value2 in query parameters.');
  }

  const googleScriptURL = `https://script.google.com/macros/s/AKfycbxEW-Ftbwuct6LpjrLxr_KMzQdGBZ6ZXH9CjpwZEJNVf6_lc0PMG7f1UxVsfdh-B_Kc/exec?value1=${value1}&value2=${value2}`;

  try {
    const response = await fetch(googleScriptURL);
    const data = await response.text(); // Or .json() if your script returns JSON
    res.send(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Error contacting Google Script.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});