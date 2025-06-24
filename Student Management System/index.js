import users from "./users.js";

const inputEl = document.getElementById("inputEl");
const formEl = document.querySelector("form");
const tbodyEl = document.querySelector("tbody");
const sortAZBtn = document.getElementById("sortA-Z");
const sortZABtn = document.getElementById("sortZ-A");
const sortMarksBtn = document.getElementById("sortMarks");
const sortPassBtn = document.getElementById("sortPass");
const sortClassBtn = document.getElementById("sortClass");
const sortGenderBtn = document.getElementById("sortGender");
const defaultTable = document.getElementById("defaultTable");
const femaleSection = document.getElementById("femaleSection");
const maleSection = document.getElementById("maleSection");
const femaleTbody = document.getElementById("femaleTbody");
const maleTbody = document.getElementById("maleTbody");


function renderUsers(userList) {
  tbodyEl.innerHTML = "";

  userList.forEach((users) => {
    const tr = document.createElement("tr");

    // Create td elemment for each column
    const tdId = document.createElement("td");
    tdId.textContent = users.id;

    const tdName = document.createElement("td");
    const imgEl = document.createElement("img");
    imgEl.src = users.img_src;
    imgEl.alt = "Avatar";
    imgEl.width = 30;
    imgEl.height = 30;
    imgEl.style.marginRight = "8px";

    const span = document.createElement("span");
    span.textContent = `${users.first_name} ${users.last_name}`;

    tdName.append(imgEl, span);

    const tdGender = document.createElement("td");
    tdGender.textContent = users.gender;

    const tdClass = document.createElement("td");
    tdClass.textContent = users.class;

    const tdMarks = document.createElement("td");
    tdMarks.textContent = users.marks;

    const tdPassing = document.createElement("td");
    tdPassing.textContent = users.passing ? "Passed" : "Failed";

    const tdEmail = document.createElement("td");
    tdEmail.textContent = users.email;

    tr.append(tdId, tdName, tdGender, tdClass, tdMarks, tdPassing, tdEmail);

    tbodyEl.appendChild(tr);
  });
}
renderUsers(users);

function renderUsersToBody(userList, targetTBody) {
  targetTBody.innerHTML = "";

  userList.forEach((user) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = user.id;

    const tdName = document.createElement("td");
    const img = document.createElement("img");
    img.src = user.img_src;
    img.alt = "avatar";
    img.width = 30;
    img.height = 30;
    img.style.borderRadius = "50%";
    img.style.marginRight = "8px";

    const span = document.createElement("span");
    span.textContent = `${user.first_name} ${user.last_name}`;
    tdName.append(img, span);

    const tdGender = document.createElement("td");
    tdGender.textContent = user.gender;

    const tdClass = document.createElement("td");
    tdClass.textContent = user.class;

    const tdMarks = document.createElement("td");
    tdMarks.textContent = user.marks;

    const tdPassing = document.createElement("td");
    tdPassing.textContent = user.passing ? "Passed" : "Failed";

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    tr.append(tdId, tdName, tdGender, tdClass, tdMarks, tdPassing, tdEmail);
    targetTBody.appendChild(tr);
  });
}

function handleSearch() {
  const query = inputEl.value.toLowerCase().trim();

  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const filterUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      fullName.includes(query) || email.includes(query)
    )
  })
  renderUsers(filterUsers);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch();
})

inputEl.addEventListener("input", () => {
  handleSearch();
})

sortAZBtn.addEventListener("click", () => {
  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const sortedUsers = [...users].sort((a, b) => {
    return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
  })
  renderUsers(sortedUsers);
});

sortZABtn.addEventListener("click", () => {
  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const sorted = [...users].sort((a, b) => {
    return `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
  });
  renderUsers(sorted);
});

sortMarksBtn.addEventListener("click", () => {
  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const sorted = [...users].sort((a, b) => {
    return a.marks - b.marks;
  });
  renderUsers(sorted);
});

sortPassBtn.addEventListener("click", () => {
  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const sorted = [...users].filter(user => {
    return user.passing === true;
  })
  renderUsers(sorted);
});

sortClassBtn.addEventListener("click", () => {
  defaultTable.style.display = "table";
  femaleSection.style.display = "none";
  maleSection.style.display = "none";

  const sorted = [...users].sort((a, b) => {
    return a.class - b.class;
  })
  renderUsers(sorted);
});


sortGenderBtn.addEventListener("click", () => {
  defaultTable.style.display = "none";

  const femaleUsers = users.filter(user => user.gender.toLowerCase() === "female");
  const maleUsers = users.filter(user => user.gender.toLowerCase() === "male");

  femaleSection.style.display = "block";
  maleSection.style.display = "block";

  renderUsersToBody(femaleUsers, femaleTbody);
  renderUsersToBody(maleUsers, maleTbody);
})