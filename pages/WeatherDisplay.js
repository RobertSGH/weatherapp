import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

// Helper function to convert date to day name
const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function WeatherDisplay() {
  const [coords, setCoords] = useState(null);
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.log('Error getting geolocation:', error);
        setCoords({ lat: 40.7128, lon: -74.006 });
      }
    );
  }, []);

  useEffect(() => {
    if (coords) {
      const fetchForecast = async () => {
        try {
          const response = await axios.get(
            `/api/forecast?lat=${coords.lat}&lon=${coords.lon}`
          );
          setForecast(response.data);
          setData(response.data);

          console.log(response.data);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      };

      fetchForecast();
    }
  }, [coords]);

  const bgColor = data?.current?.is_day ? 'bg-blue-300' : 'bg-gray-800';
  const textColor = data?.current?.is_day ? 'text-black' : 'text-white';

  return (
    <div className='p-8'>
      {data ? (
        <div
          className={`p-8 rounded-lg shadow-md w-full max-w-lg mx-auto ${bgColor} ${textColor}`}
        >
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-3xl font-bold'>
              {data.location.name}, {data.location.country}
            </h1>
            <img
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              className='w-20 h-20'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center'>
              <span className='text-5xl font-bold'>
                {data.current.temp_c}°C
              </span>
              <span className='ml-4 text-xl'>Temp</span>
            </div>
            <div className='flex items-center'>
              <span className='text-5xl font-bold'>
                {data.current.feelslike_c}°C
              </span>
              <span className='ml-4 text-xl'>Real Feel</span>
            </div>
            <div className='flex items-center'>
              <span className='text-5xl font-bold'>
                {data.current.humidity}%
              </span>
              <span className='ml-4 text-xl'>Humidity</span>
            </div>
          </div>
          {forecast && (
            <div className='mt-8 flex flex-wrap justify-center md:flex-nowrap md:overflow-x-auto'>
              {forecast.forecast.forecastday.map((day, index) => (
                <div
                  key={index}
                  className='flex-none w-full md:w-32 bg-gray-100 p-4 rounded-md m-2 md:m-0 md:mr-4'
                >
                  <h2 className='text-center'>{getDayName(day.date)}</h2>
                  <p className='text-center mt-2'>Max: {day.day.maxtemp_c}°C</p>
                  <p className='text-center mt-2'>Min: {day.day.mintemp_c}°C</p>
                  <div className='flex justify-center'>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className='w-12 h-12'
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <Circles
            height='80'
            width='80'
            color='#4fa94d'
            ariaLabel='circles-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
