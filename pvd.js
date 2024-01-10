const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from a 'public' folder

app.get('/api/data', async (req, res) => {
  const apiKey = '8c89b764b1654cfab1834eb9c105be05'; // Replace 'xxx' with your Ocp-Apim-Subscription-Key
  const apiUrl = 'https://api.sec.or.th/pvd/factsheet/amc';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
