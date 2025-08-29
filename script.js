const markerColorSelect = document.getElementById('marker-color');
const markerShapeSelect = document.getElementById('marker-shape');
const markerSizeSlider = document.getElementById('marker-size');
const mapSelect = document.getElementById('map-select');

let markers = [];

const addMarker = (event) => {
  const marker = document.createElement('div');
  marker.classList.add('marker', markerShapeSelect.value);

  // Set size dynamically
  const size = markerSizeSlider.value;
  if (markerShapeSelect.value !== 'triangle') {
    marker.style.width = `${size}px`;
    marker.style.height = `${size}px`;
    marker.style.background = markerColorSelect.value;
  } else {
    marker.style.borderLeft = `${size / 2}px solid transparent`;
    marker.style.borderRight = `${size / 2}px solid transparent`;
    marker.style.borderBottom = `${size}px solid ${markerColorSelect.value}`;
  }

  const label = document.createElement('div');
  label.classList.add('marker-label');
  label.innerText = "New Marker";
  marker.appendChild(label);

  const deleteIcon = document.createElement('img');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.src = 'https://img.icons8.com/material-rounded/24/000000/delete-sign.png';
  marker.appendChild(deleteIcon);

  const mapContainer = document.querySelector('.map-container');
  mapContainer.appendChild(marker);

  const x = event.offsetX;
  const y = event.offsetY;
  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;

  markers.push(marker);

  // --- Enable editing immediately ---
  editLabel(label);

  deleteIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    markers = markers.filter(m => m !== marker);
    marker.remove();
  });
};

const editLabel = (label) => {
  const marker = label.parentElement;
  const input = document.createElement('input');
  input.classList.add('marker-label-input');
  input.value = label.innerText;
  marker.replaceChild(input, label);
  input.focus();

  const save = () => {
    const newLabel = document.createElement('div');
    newLabel.classList.add('marker-label');
    newLabel.innerText = input.value;
    marker.replaceChild(newLabel, input);

    // Rebind edit on click
    newLabel.addEventListener('click', () => editLabel(newLabel));
  };

  input.addEventListener('blur', save);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
};

const removeMarkers = () => {
  const mapContainer = document.querySelector('.map-container');
  markers.forEach(marker => mapContainer.removeChild(marker));
  markers = [];
};

document.getElementById('map-image').addEventListener('click', addMarker);
document.getElementById('remove-markers').addEventListener('click', removeMarkers);

mapSelect.addEventListener('change', () => {
  document.getElementById('map-image').src = mapSelect.value;
});      
 