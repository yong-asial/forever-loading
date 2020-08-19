
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let imageToLoadCount = 5; // initial load
const apiKey = '9GrtnQ8Oh_SxRg6A5Q_CPLzMAXmjt0TWUaiHnXI3zGo';

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    // after initial load
    loader.hidden = true;
    imageToLoadCount = 30;
  }
}

// Helper function to set attribution on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(photos) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photos.forEach(photo => {
    // Create <a> to link to Unsplash
    const anchor = document.createElement('a');
    setAttributes(anchor, {
      'href': photo.links.html,
      'target': '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside image container element
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageToLoadCount}`;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (e) {
    console.error(e);
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    ready = false;
    getPhotos();
  }
});

getPhotos();