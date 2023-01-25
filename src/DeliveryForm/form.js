const leftInputs = document.querySelectorAll("form .left input");
leftInputs.forEach((input) => (input.onblur = handleEmptyInputs));

const nameInput = document.getElementById("name");
const nameError = document.getElementById("error-msg-name");
nameInput.oninput = validateNameInput;

const surnameInput = document.getElementById("surname");
const surnameError = document.getElementById("error-msg-surname");
surnameInput.oninput = validateSurnameInput;

const dateInput = document.getElementById("date");
const dateError = document.getElementById("error-msg-date");
dateInput.oninput = validateDeliveryDate;

const streetInput = document.getElementById("street");
const streetError = document.getElementById("error-msg-street");
streetInput.oninput = validateStreet;

const houseInput = document.getElementById("house");
const houseError = document.getElementById("error-msg-house");
houseInput.oninput = validateHouseNumber;

const flatInput = document.getElementById("flat");
const flateError = document.getElementById("error-msg-flat");
flatInput.oninput = validateFlatNumber;

const giftCheckboxes = document.querySelectorAll(".gifts input");
giftCheckboxes.forEach((checkbox) => (checkbox.oninput = validateGifts));

const completeButton = document.getElementById("complete");
completeButton.onclick = goToOrderCreatedPage;

// VALIDATORS

function handleEmptyInputs(event) {
  const inputElem = event.target;
  if (inputElem.value === "") {
    inputElem.className = "invalid";
    inputElem.nextElementSibling.innerText = "This field can't be empty";
  }
}

function validateNameInput(event) {
  const name = event.target.value.trim();
  if (name.length < 4) {
    nameInput.className = "invalid";
    nameError.innerText = "Too short name";
  } else if (name.indexOf(" ") > -1) {
    nameInput.className = "invalid";
    nameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    nameInput.className = "invalid";
    nameError.innerText = "Only letters allowed";
  } else {
    nameInput.className = "valid";
    nameError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateSurnameInput(event) {
  const surname = event.target.value.trim();
  if (surname.length < 5) {
    surnameInput.className = "invalid";
    surnameError.innerText = "Too short surname";
  } else if (surname.indexOf(" ") > -1) {
    surnameInput.className = "invalid";
    surnameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(surname)) {
    surnameInput.className = "invalid";
    surnameError.innerText = "Only letters allowed";
  } else {
    surnameInput.className = "valid";
    surnameError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateDeliveryDate(event) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0);

  const givenDate = new Date(event.target.value);

  if (givenDate < tomorrow) {
    dateInput.className = "invalid";
    dateError.innerText = "The earliest possible date is tomorrow";
  } else {
    dateInput.className = "valid";
    dateError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateStreet(event) {
  const street = event.target.value.trim();
  if (street.length < 5) {
    streetInput.className = "invalid";
    streetError.innerText = "Too short street";
  } else {
    streetInput.className = "valid";
    streetError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateHouseNumber(event) {
  const houseNumber = +event.target.value.trim();
  if (houseNumber < 1) {
    houseInput.className = "invalid";
    houseError.innerText = "Only positive numbers are allowed";
  } else {
    houseInput.className = "valid";
    houseError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateFlatNumber(event) {
  const flatNumber = event.target.value;
  if (!/^[1-9]/.test(flatNumber)) {
    flatInput.className = "invalid";
    flateError.innerText = "Must start with a positive number";
  } else if (!/[0-9]$/.test(flatNumber)) {
    flatInput.className = "invalid";
    flateError.innerText = "Must end with a number";
  } else if (!/^[-0-9]*$/.test(flatNumber)) {
    flatInput.className = "invalid";
    flateError.innerText = "Only numbers and dashes are allowed";
  } else {
    flatInput.className = "valid";
    flateError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

let checkedGiftsCount = 0;
function validateGifts(event) {
  const MAX = 2;
  const errorMsg = document.getElementById("error-msg-gifts");
  const parent = event.target.parentElement;

  checkedGiftsCount += event.target.checked ? 1 : -1;
  if (checkedGiftsCount > MAX) {
    parent.classList.replace("valid", "invalid");
    errorMsg.innerText = "You can choose at most two gifts";
  } else {
    parent.classList.replace("invalid", "valid");
    errorMsg.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function isFormValid() {
  return [...leftInputs, giftCheckboxes[0].parentElement].every((elem) =>
    elem.classList.contains("valid")
  );
}

function tryToEnableCompleteBtn() {
  const completeButton = document.getElementById("complete");
  completeButton.disabled = !isFormValid();
}

function goToOrderCreatedPage() {
  const successMsg = document.createElement("div");
  successMsg.className = "order-completed";
  successMsg.innerHTML = `
      <h2>The order has been created</h2>
      <p>The delivery address is 
        <span>
          ${streetInput.value} ${houseInput.value}/${flatInput.value}
        </span>
      </p>
      <p>Customer
        <span>${nameInput.value} ${surnameInput.value}</span>
      </p>
      `;
  document.querySelector(".container").append(successMsg);

  const form = document.getElementById("form");
  form.style.display = "none";
}
