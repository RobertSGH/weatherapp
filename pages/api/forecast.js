// pages/api/forecast.js
import axios from 'axios';

export default async function handler(req, res) {
  let { lat, lon } = req.query;

  if (!lat || !lon) {
    lat = 40.7128;
    lon = -74.006;
  }

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: `${lat},${lon}`, days: '3' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch forecast data' });
  }
}
