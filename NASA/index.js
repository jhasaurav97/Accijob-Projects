const API_KEY = "NRUUd9b0KWmiuz5UbkaixYEnhIMa30LNcXAQShbg";

const URL = `https://api.nasa.gov/planetary/apod?`;

const currentImageContainer = document.getElementById('current-image-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchHistory = document.getElementById('search-history');


function showMessage(message, type = 'info') {
  currentImageContainer.innerHTML = `
  <div class="message ${type}">
    <p>${message}</p>
    ${type === 'error' ? `<button onclick="retryFetch()">Retry</button>` : ""}
  </div>
  `;
}

function retryFetch() {
  getCurrentImageOfTheDay();
}

let currentDate = new Date().toISOString().split('T')[0];

async function getCurrentImageOfTheDay() {
  try {
    showMessage('Loading NASA Picture of the Day...', 'info');
    await getImageOfTheDay(currentDate);
  } catch (error) {
    console.error(('Error in loading NASA Date:', error));
    showMessage('Unable to load NASA Picture of the day. Please check ur internet or try again later', 'error');
  }
}

async function  getImageOfTheDay(date) {
  try {
    const res = await fetch(`${URL}date=${date}&api_key=${API_KEY}`);
    if (!res.ok) {
      let message = `Error ${res.status}: ${res.statusText}`;
      showMessage(`${message}`, 'error');
      return;
    } 
    
    const data = await res.json();
    displayImage(data);

    if (date !== currentDate) {
      let isNew = saveSearch(date);
      if (isNew) {
        addSearchToHistory(date);
      }
    }
  } catch (error) {
    console.error("Error in fetching NASA API:", error);
    showMessage(`${error.message}`, 'error');
  }
}

function displayImage(data) {
  currentImageContainer.innerHTML = `
  <h1>${data.date === currentDate
      ? "NASA Picture of the Day"
      : "Picture On " + data.date
    }</h1>
  <img src="${data.url}" alt="${data.title}"/>
  <h3>${data.title}</h3>
  <p>${data.explanation}</p>
  `;
}

function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  if (!searches.find(s => s.date === date)) {
    searches.push({ date });
    localStorage.setItem('searches', JSON.stringify(searches));
    return true;
  } else {
    return false;
  }
}

function addSearchToHistory(date) {
  const li = document.createElement('li');
  li.textContent = date;
  li.addEventListener('click', () => getImageOfTheDay(date));
  searchHistory.appendChild(li);
}

function loadSearchHistory() {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.forEach(s => addSearchToHistory(s.date));
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let selectedDate = searchInput.value;
  if (selectedDate) {
    getImageOfTheDay(selectedDate);
  }
})

getCurrentImageOfTheDay();
loadSearchHistory();