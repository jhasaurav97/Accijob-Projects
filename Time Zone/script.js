const API_KEY = "317cf1fd477049d7b9eb626b3e5c3382";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  document.getElementById('current-timezone').innerHTML = 
  "<p>Geolocation is not supported by this browser</p>";
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getGeoLocation(lat, lon, "current-timezone");
}

function error() {
  document.getElementById("current-timezone").innerHTML =
    "<p>Sorry, no position is available</p>";
}

async function getGeoLocation(lat, lon, containerId) {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`
    );
    const data = await res.json();
    const info = data.results[0];

    document.getElementById(containerId).innerHTML = `
    <p><strong>Name Of Time Zone:</strong> ${
      info.timezone?.name || "N/A"
    }</p>
    <p><strong>Lat:</strong> ${lat} &nbsp;&nbsp;&nbsp; <strong>Lon:</strong> ${lon}</p>
    <p><strong>Offset STD:</strong> ${
      info.timezone?.offset_STD || "N/A"
    }
      </p>
      <p><strong>Offset STD Seconds:</strong> ${
      info.timezone?.offset_STD_seconds || "N/A"
      }</p>
      <p><strong>Offset DST:</strong> ${
      info.timezone?.offset_DST || "N/A"
      }</p>
      <p><strong>Offset DST Seconds:</strong> ${
      info.timezone?.offset_DST_seconds
      }</p>
      <p><strong>Country:</strong> ${info.country || "N/A"}</p>
      <p><strong>Postcode:</strong> ${info.postcode || "N/A"}</p>
      <p><strong>City:</strong> ${info.city || "N/A"}</p>
    `
  } catch (err) {
    document.getElementById(containerId).innerHTML =
      "<p>Error in fetching location data.</p>";
    console.error(err);
  }
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const address = document.getElementById('address').value.trim();
  if (!address) {
    document.getElementById('error').textContent = "Please enter an address";
    return;
  }
  document.getElementById('error').textContent = "";

  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&format=json&apiKey=${API_KEY}`
    );
    const data = await res.json();

    if (data.results.length === 0) {
      document.getElementById("address-timezone").innerHTML = 
      "<p>No result found for this address.</p>";
      return;
    }

    const lat = data.results[0].lat;
    const lon = data.results[0].lon;

    // Use reverse geocoding to get full details
    getGeoLocation(lat, lon, "address-timezone");
  } catch (error) {
    document.getElementById('address-timezone').innerHTML =
      "<p>Error searching for address.</p>";
    console.error(error);
  }

  document.getElementById('address').value = "";
})