// task1 => select all dom el
// task2 => select input value;
// add input value into array of obj
// then that arr add on my table

let inputName = document.getElementById("name");
let inputAge = document.getElementById("age");
let inputProfession = document.getElementById("profession");
const tableBox = document.getElementById("table-body")
function addData() {
  console.log(tableBox);
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>2</td>
  <td>${inputName.value}</td>
  <td>${inputAge.value}</td>
  <td>${inputProfession.value}</td>
  `;
  tableBox.appendChild(tr);

  inputName.value = "";
  inputAge.value = "";
  inputProfession.value = ""
}
