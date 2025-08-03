const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const tbody = document.querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const mktCapBtn = document.getElementById("mktCap");
const percentSortBtn = document.getElementById("percentSort");
let coinData = [];

async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);

    coinData = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      image: coin.image,
      symbol: coin.symbol,
      curr_price: coin.current_price,
      volume: coin.total_volume,
      percent: coin.price_change_24h,
      market_cap: coin.market_cap,
    }));
    renderData(coinData);
  } catch (error) {
    console.log("Error in fetching url", error);
  }
}

function renderData(data) {
  tbody.innerHTML = "";

  data.forEach((coin) => {
    const tr = document.createElement("tr");
    tr.setAttribute('data-id', coin.id);
    const percentClass =
      coin.percent > 0 ? "green" : coin.percent < 0 ? "red" : "";
    tr.innerHTML = `
    <td>
      <div class="coin-img">
        <img src="${coin.image}" alt="${coin.name}" />
        <span>${coin.name}</span> 
      </div>
    </td>
    <td>${coin.symbol.toUpperCase()}</td>
    <td>${coin.curr_price}</td>
    <td>${coin.volume}</td>
    <td class=${percentClass}>${coin.percent.toFixed(2)}%</td>
    <td>Mkr Cap: ${coin.market_cap}</td>
    `;
    tbody.appendChild(tr);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = coinData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(keyword) ||
      coin.symbol.toLowerCase().includes(keyword)
  );
  renderData(filtered);
});

mktCapBtn.addEventListener("click", () => {
  const sorted = [...coinData].sort((a, b) => b.market_cap - a.market_cap);
  renderData(sorted);
});

percentSortBtn.addEventListener("click", () => {
  const percentSort = [...coinData].sort((a, b) => (b.percent ?? 0) - (a.percent ?? 0))
  renderData(percentSort);
})

fetchData().then(() => console.log("Top 10 coins data loading..."));
