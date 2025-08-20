async function getUserIP(){
  try {
    const res = await fetch('https://api.ipify.org/?format=json');
    const data = await res.json();

    document.getElementById('user-ip').textContent = data.ip;
    document.getElementById('ip').textContent = data.ip;

    return data.ip;
  } catch (error) {
    console.error("Error in fetching IP address:", error);
    document.getElementById("user-ip").textContent = "Error retrieving IP";
    document.getElementById("ip").textContent = "Error retrieving IP";
  }
}

async function getUserInfo(ip) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/geo`);
    const data = await res.json();

    let [lat, lon] = data.loc.split(',');
    document.getElementById('lat').textContent = lat;
    document.getElementById('long').textContent = lon;
    document.getElementById('city').textContent = data.city;
    document.getElementById('region').textContent = data.region;
    document.getElementById('org').textContent = data.org || "N/A";
    document.getElementById('hostname').textContent = data.hostname || data.ip || "N/A";

    console.log(data);
    return { lat, lon, data };
  } catch (error) {
    console.error("Error in fetching User Info:", error);
  }
}

function showMap(lat, lon) {
  let mapFrame = `
  <iframe
  width="100%"
  height="300px"
  style="border: none; border-radius: 8px;"
  loading="lazy"
  allowfullscreen
  src="https://maps.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed"
  ></iframe>
  `;
  document.getElementById('map').innerHTML = mapFrame;
}

function showUserTime(timezone) {
  try {
    let now = new Date().toLocaleString("en-US", { timeZone: timezone });
    document.getElementById('timezone').textContent = timezone;
    document.getElementById('date-time').textContent = now;
  } catch (error) {
    console.error("Error in fetching time:", error);
  }
}

async function getPostOffices(pincode) {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await res.json();

    let PostOffices = data[0].PostOffice;
    console.log(data);
    document.getElementById('pincode').textContent = pincode;
    document.getElementById('message').textContent = data[0].Message;

    let list = document.getElementById('post-office-list');
    list.innerHTML = '';
    PostOffices.forEach(po => {
      let card = `
      <div class="post-office-card">
        <p><strong>Name:</strong> ${po.Name}</p>
        <p><strong>Branch Type:</strong> ${po.BranchType}</p>
        <p><strong>Delivery Status:</strong> ${po.DeliveryStatus}</p>
        <p><strong>District:</strong> ${po.District}</p>
        <p><strong>Division:</strong> ${po.Division}</p>
      </div>
      `;
      list.innerHTML += card;
    })
  } catch (error) {
    console.error("Error in fetching PostOffices:", error);
  }
}

document.getElementById('searchBox').addEventListener('input', function () {
  let filter = this.value.toLowerCase();
  let cards = document.querySelectorAll('.post-office-card');
  cards.forEach(card => {
    let text = card.textContent.toLowerCase();
    if (filter === '') {
      card.style.display = 'block';
    } else {
      card.style.display = text.includes(filter) ? "block" : "none";
    }
  })
})

document.getElementById("getStartedBtn").addEventListener('click', async () => {
  document.getElementById('firstScreen').style.display = 'none';
  document.getElementById('secondScreen').style.display = 'block';

  let ip = await getUserIP();

  let { lat, lon, data } = await getUserInfo(ip);

  showMap(lat, lon);

  showUserTime(data.timezone);

  getPostOffices(data.postal);
})
getUserIP();