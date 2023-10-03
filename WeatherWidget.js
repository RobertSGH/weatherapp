import WeatherDisplay from './pages/WeatherDisplay';
import { createRoot } from 'react-dom';

const roots = {};

window.renderWeatherWidget = (containerId, apiUrl, props = {}) => {
  const container = document.getElementById(containerId);
  if (container) {
    if (roots[containerId]) {
      // If a root already exists for this containerId, update it
      roots[containerId].render(<WeatherDisplay apiUrl={apiUrl} {...props} />);
    } else {
      // Otherwise, create a new root and store it
      const root = createRoot(container);
      root.render(<WeatherDisplay apiUrl={apiUrl} {...props} />);
      roots[containerId] = root;
    }
  }
};
