document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("name");
  const professionEl = document.getElementById("profession");
  const ageEl = document.getElementById("age");
  const addUserBtn = document.getElementById("addUser");
  const msg = document.getElementById("msg");
  const userBox = document.querySelector(".user-box"); // or "#user-box"
  const notFoundEl = document.getElementById("not-found");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach(renderUser);

  function showMessage(text, type = "success") {
    msg.innerHTML = `<span class="${type}">${text}</span>`;
  }

  function addUsers() {
    let name = nameEl.value.trim();
    let profession = professionEl.value.trim();
    let age = ageEl.value.trim();

    msg.innerHTML = "";
    if (!name || !profession || !age) {
      showMessage(
        "Error :Please Make sure All the field before adding in an emplyee",
        "err"
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      profession,
      age,
    };

    users.push(newUser);
    saveUsers();
    renderUser(newUser);
    showMessage("Success: Message Added");

    nameEl.value = "";
    professionEl.value = "";
    ageEl.value = "";
  }

  function renderUser(user) {
    const userList = document.createElement("div");
    userList.classList.add("user-list");
    userList.setAttribute("data-id", user.id);

    userList.innerHTML = `
    <div class="content">
      <p>${user.name}</p>
      <p>${user.profession}</p>
      <p>${user.age}</p>
    </div>
    <button class="delete">Delete</button>
  `;
    notFoundEl.style.display = "none";
    userBox.appendChild(userList);

    userList.querySelector(".delete").addEventListener("click", () => {
      users = users.filter((u) => u.id !== user.id);
      saveUsers();
      userList.remove();

      if (userBox.querySelectorAll(".user-list").length === 0) {
        notFoundEl.style.display = "block";
      }
    });
  }

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  addUserBtn.addEventListener("click", addUsers);

})