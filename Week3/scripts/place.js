
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-modified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;



const UNITS = 'imperial';


const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const unitsTempEl = document.getElementById('units-temp');
const unitsWindEl = document.getElementById('units-wind');


let temp = 45; 
let wind = 8;  

if (unitsTempEl) unitsTempEl.textContent = UNITS === 'metric' ? '°C' : '°F';
if (unitsWindEl) unitsWindEl.textContent = UNITS === 'metric' ? 'km/h' : 'mph';
if (tempEl) tempEl.textContent = temp;
if (windEl) windEl.textContent = wind;


function calculateWindChill(t, v, units) {
  return units === 'metric'
    ? (13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16))
    : (35.74 + 0.6215*t - 35.75*Math.pow(v, 0.16) + 0.4275*t*Math.pow(v, 0.16));
}

const ok =
  (UNITS === 'metric'  && temp <= 10 && wind > 4.8) ||
  (UNITS === 'imperial' && temp <= 50 && wind > 3);

const wcEl = document.getElementById('windchill');
if (wcEl) {
  wcEl.textContent = ok ? `${Math.round(calculateWindChill(temp, wind, UNITS))} ${UNITS === 'metric' ? '°C' : '°F'}` : 'N/A';
}
