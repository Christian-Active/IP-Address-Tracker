let key = "at_EyGilMx57NVL84CCnnspbw2PrGZm6"

let ipAddress = '8.8.8.8'

let getIp = async (ip) => {
  let locationAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ip}`;
  
  
  let ipObject = await fetch(locationAPI);
  let data = await ipObject.json();
  return data;
}

let map = null;

let getPosition = (data) => {

  if (map) {
    map.remove();
  }
  map = L.map('map').setView([data.lat + 0.002, data.lng], 16);
  let marker = L.marker([data.lat, data.lng]).addTo(map);
  marker.bindPopup(`<b>${data.country}</b><br>${data.region}, ${data.city}`).openPopup();

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);
  map.zoomControl.remove();
}
