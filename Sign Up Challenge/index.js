function submitForm() { 
  let emailValidation = validateEmail();
  let passValidation = validatePass();
  const successText = document.getElementById("sucess");
  if (emailValidation && passValidation) {
    successText.style.display = "block";
  }else{
    successText.style.display = "none";
  }
}

function validateEmail() {
  const emailInput = document.getElementById("email").value;
  const paraEmail = document.getElementById("para1");
  if (emailInput.length > 3 && emailInput.includes("@") && emailInput.includes(".")) {
    paraEmail.style.display = "none";
    return true;
  } else {
    paraEmail.style.display = "block";
    return false;
  }
}

function validatePass() {
  const passInput = document.getElementById("password").value;
  const paraPassword = document.getElementById("para2");
  if (passInput.length > 8) {
    paraPassword.style.display = "none";
    return true;
  } else {
    paraPassword.style.display = "block";
    return false;
  }
}

function askSubmit() {
  const confirmMsg = confirm("Are you sure you want to submit?");
  if (confirmMsg) {
    alert("successful signup!");
  } else {
    location.reload();
  }
}