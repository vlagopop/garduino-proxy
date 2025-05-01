import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Proxy server is running.');
});

app.get('/proxy', async (req, res) => {
  const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxEW-Ftbwuct6LpjrLxr_KMzQdGBZ6ZXH9CjpwZEJNVf6_lc0PMG7f1UxVsfdh-B_Kc/exec?value1=123&value2=456';

  try {
    const response = await fetch(googleScriptURL);
    const data = await response.text(); // or .json() if it's JSON
    res.send(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Error contacting Google Script.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});