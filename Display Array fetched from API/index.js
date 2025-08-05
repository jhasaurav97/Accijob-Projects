const output = document.getElementById("output");

// Helper to create and display table
function displayTable(data, title, keys) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headingRow = document.createElement("tr");
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    headingRow.appendChild(th);
  });
  thead.appendChild(headingRow);

  data.forEach((item) => {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = item[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  const titleEl = document.createElement("h3");
  titleEl.textContent = title;

  table.appendChild(thead);
  table.appendChild(tbody);
  output.appendChild(titleEl);
  output.appendChild(table);
}

// Fetch and display posts data
function PromiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((res) => res.json())
        .then((data) => {
          displayTable(data.posts.slice(0, 5), "Posts", [
            "id",
            "title",
            "body",
          ]);
          resolve(true);
        })
        .catch((err) => reject("Error fetching posts"));
    }, 1000);
  });
}


// Fetch and display products data after posts
function PromiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          displayTable(data.products.slice(0, 5), "Products", [
            "id",
            "title",
            "price",
          ]);
          resolve(true);
        })
        .catch((err) => reject("Error fetching products"));
    }, 2000);
  });
}

// Fetch and display todos data after products
function PromiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((data) => {
          displayTable(data.todos.slice(0, 5), "Todos", [
            "id",
            "todo",
            "completed",
          ]);
          resolve(true);
        })
        .catch((err) => reject("Error fetching todos"));
    }, 3000);
  });
}

// Start the promise chain on button click
function startFetchData() {
  output.innerHTML = ""; // clear previous
  PromiseAPI1()
    .then((res1) => {
      if (res1) return PromiseAPI2();
    })
    .then((res2) => {
      if (res2) return PromiseAPI3();
    })
    .catch((err) => {
      output.innerHTML = `<p style="color:red;">${err}</p>`;
    });
}