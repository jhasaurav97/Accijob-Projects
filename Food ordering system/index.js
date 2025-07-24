async function getMenu() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const data = await res.json();
    displayMenu(data);
  } catch (error) {
    console.log("Menu fetch error: ", error);
  }
}

function displayMenu(data) {
  const menuConatiner = document.querySelector(".menu-cards");
  menuConatiner.innerHTML = ""; 
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${item.imgSrc}" alt="${item.name}" />
    <div class="card-content">
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price}/-</p>
      </div>
      <div class="add-food">
        <img src="./img/plus.png" alt="plus logo">
      </div>
    </div>
    `;
    menuConatiner.appendChild(card);
  });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        "Cheeseburger",
        "Veggie Burger",
        "Chicken Burger",
        "Bacon Burger",
      ];
      const order = {
        items: Array.from(
          { length: 3 },
          () => burgers[Math.floor(Math.random() * burgers.length)]
        ),
      };
      console.log("Order taken: ", order);
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

function startOrdering() {
  getMenu()
    .then(() => takeOrder())
    .then((order) => {
      console.log("Order: ", order);
      return orderPrep();
    })
    .then((status) => {
      console.log("Preparation status: ", status);
      return payOrder();
    })
    .then((payment) => {
      console.log("Payment status: ", payment);
      if (payment.paid === true) {
        return thankyouFnc();
      }
    })
    .catch((err) => {
      console.log("Something went wrong in the chain: ", err);
    });
}
startOrdering();

document.getElementById("showHome").addEventListener("click", () => {
  document.getElementById("banner").style.display = "block";
  location.reload();
})

document.getElementById("secondScreen").addEventListener("click", () => {
  document.getElementById("banner").style.display = "none";
})

const menuIcon = document.querySelector(".fa-bars");
const sidebar = document.querySelector("aside");
const crossIcon = document.querySelector(".fa-xmark");

menuIcon.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
});

crossIcon.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
})