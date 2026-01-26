
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const temperature = 5;
const windSpeed = 25;

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

if (temperature <= 10 && windSpeed > 4.8) {
  const windChill = calculateWindChill(temperature, windSpeed);
  document.getElementById('windchill').textContent = `${windChill.toFixed(1)}°C`;
} else {
  document.getElementById('windchill').textContent = 'N/A';
}
