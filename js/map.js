import { createBaloon } from './baloonPopup.js';

const map = L.map('map')
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const verifiedIcon = L.icon({
  iconUrl: './img/pin-verified.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (contactor, user) => {
  if (contactor.coords) {
    const { lat, lng } = contactor.coords;
    const marker = L.marker({
      lat,
      lng,
    }, { icon: contactor.isVerified ? verifiedIcon : pinIcon, }
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createBaloon(contactor, user));
  }
};

const renderMarkers = (contractors, user) => {
  markerGroup.clearLayers();
  contractors.forEach((contractor) => createMarker(contractor, user));
};

export { renderMarkers };
