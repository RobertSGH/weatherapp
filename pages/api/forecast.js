// pages/api/forecast.js
import axios from 'axios';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
  // Add your allowed origins here:
  origin: '*',
});

// Helper method to run cors middleware
const runCorsMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

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
