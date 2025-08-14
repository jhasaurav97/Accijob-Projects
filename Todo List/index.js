document.addEventListener('DOMContentLoaded', () => {
  // Slect DOM HTML Elements
  const itemInput = document.getElementById('item');
  const dateInput = document.getElementById('date');
  const priorityInput = document.getElementById('priority');
  const form = document.getElementById('taskForm');

  const todayList = document.querySelector('.todayList');
  const futureList = document.querySelector('.futureList');
  const completeList = document.querySelector('.completeList');

  let tasks = JSON.parse(localStorage.getItem('todoItem')) || [];

  function saveTask() {
    localStorage.setItem('todoItem', JSON.stringify(tasks));
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const today = new Date().toISOString().split('T')[0];
  function renderItem() {
    todayList.innerHTML = '';
    futureList.innerHTML = '';
    completeList.innerHTML = '';


    let todayCount = 1;
    let futureCount = 1;
    let completeCount = 1;

    tasks.forEach((item, index) => {
      const taskDiv = document.createElement('div');
      if (item.completed) {
        taskDiv.classList.add('complete-task');
      } else {
        taskDiv.classList.add('add-task');
      };

      let numberLabel = "";

      if (item.completed) {
        numberLabel = completeCount++;
      } else if (item.date === today) {
        numberLabel = todayCount++;
      } else {
        numberLabel = futureCount++;
      }

      taskDiv.innerHTML = `
      <p>${numberLabel}. ${item.name}</p>
      <p>${formatDate(item.date)}</p>
      <p>${item.priority}</p>
      <p>
        ${!item.completed ?
          `<img src="./img/check-circle 1.png" alt="check-circle" onclick="toggleComplete(${index})" />
        <img src="./img/trash 1.png" alt="trash" onclick="deleteTask(${index})" />`
          : ""
        }
        <img src="./img/trash-black.png" alt="trash" onclick="deleteTask(${index})" />
      </p>
      `;

      if (item.completed) {
        completeList.appendChild(taskDiv);
      } else if (item.date === today) {
        todayList.appendChild(taskDiv);
      } else {
        futureList.appendChild(taskDiv);
      }
    })
  }

  window.toggleComplete = (index) => {
    tasks[index].completed = true;
    saveTask();
    renderItem();
  }

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTask();
    renderItem();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!itemInput.value || !dateInput.value || !priorityInput.value) {
      alert('Please enter all detail');
      return;
    }

    if (new Date(dateInput.value) < new Date(today)) {
      alert("You Can not Enter past Date");
      return;
    }
    
    tasks.push({
      name: itemInput.value,
      date: dateInput.value,
      priority: priorityInput.value,
      completed: false
    });
    saveTask();
    renderItem();

    itemInput.value = "";
    dateInput.value = "";
    priorityInput.value = "";
  })
  renderItem();
})