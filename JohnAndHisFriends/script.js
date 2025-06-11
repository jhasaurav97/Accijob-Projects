let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];


function PrintDeveloperbyMap() {
  //Write your code here , just console.log
  arr.map((person) => {
    if (person.profession === "developer") {
      console.log(
        `id : ${person.id}, Name : ${person.name}, Age : ${person.age}, Profession : ${person.profession}`
      );
    }
  });
}

function PrintDeveloperbyForEach() {
  //Write your code here , just console.log
  arr.forEach((p) => {
    if (p.profession === "developer") {
      console.log(
        `id : ${p.id}, Name : ${p.name}, Age : ${p.age}, Profession : ${p.profession}`
      );
    }
  });
}

function addData() {
  //Write your code here, just console.log
  arr.push({
    id: 4,
    name: "susan",
    age: "20",
    profession: "intern",
  });
  arr.map((people) => {
    console.log(
      `id : ${people.id}, Name : ${people.name}, Age : ${people.age}, Profession : ${people.profession}`
    );
  });
}

function removeAdmin() {
  //Write your code here, just console.log
  arr = arr.filter((p) => p.profession !== "admin");
  arr.map((person) => {
    console.log(
      `id : ${person.id}, Name : ${person.name}, Age : ${person.age}, Profession : ${person.profession}`
    );
  });
}

function concatenateArray() {
  //Write your code here, just console.log
  let newArr = [
    { id: 5, name: "rahul", age: "24", profession: "admin" },
    { id: 6, name: "shivam", age: "30", profession: "developer" },
    { id: 7, name: "saurav", age: "28", profession: "manager" },
  ];
  arr = arr.concat(newArr);
  arr.map((person) => {
    console.log(
      `id : ${person.id}, Name : ${person.name}, Age : ${person.age}, Profession : ${person.profession}`
    );
  });
}
