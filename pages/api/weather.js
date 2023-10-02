import axios from 'axios';

export default async function handler(req, res) {
  let { lat, lon } = req.query;

  // Default to New York if lat and lon are not provided
  if (!lat || !lon) {
    lat = 40.7128;
    lon = -74.006;
  }

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: `${lat},${lon}` },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in API call:', error);
    if (error.response) {
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
}
