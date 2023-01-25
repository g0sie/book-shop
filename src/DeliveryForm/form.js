const leftInputs = document.querySelectorAll(".left-side__input");
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

const completeButton = document.getElementById("complete-btn");
completeButton.onclick = goToOrderCreatedPage;

// VALIDATORS

function handleEmptyInputs(event) {
  const inputElem = event.target;
  if (inputElem.value === "") {
    inputElem.classList.remove("left-side__input--valid");
    inputElem.classList.add("left-side__input--invalid");
    inputElem.nextElementSibling.innerText = "This field can't be empty";
  }
}

function validateNameInput(event) {
  const name = event.target.value.trim();
  nameInput.classList.remove("left-side__input--valid");
  nameInput.classList.add("left-side__input--invalid");

  if (name.length < 4) {
    nameError.innerText = "Too short name";
  } else if (name.indexOf(" ") > -1) {
    nameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    nameError.innerText = "Only letters allowed";
  } else {
    nameInput.classList.remove("left-side__input--invalid");
    nameInput.classList.add("left-side__input--valid");
    nameError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateSurnameInput(event) {
  const surname = event.target.value.trim();
  surnameInput.classList.remove("left-side__input--valid");
  surnameInput.classList.add("left-side__input--invalid");

  if (surname.length < 5) {
    surnameError.innerText = "Too short surname";
  } else if (surname.indexOf(" ") > -1) {
    surnameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(surname)) {
    surnameError.innerText = "Only letters allowed";
  } else {
    surnameInput.classList.remove("left-side__input--invalid");
    surnameInput.classList.add("left-side__input--valid");
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
    dateInput.classList.remove("left-side__input--valid");
    dateInput.classList.add("left-side__input--invalid");
    dateError.innerText = "The earliest possible date is tomorrow";
  } else {
    dateInput.classList.remove("left-side__input--invalid");
    dateInput.classList.add("left-side__input--valid");
    dateError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateStreet(event) {
  const street = event.target.value.trim();
  if (street.length < 5) {
    streetInput.classList.remove("left-side__input--valid");
    streetInput.classList.add("left-side__input--invalid");
    streetError.innerText = "Too short street";
  } else {
    streetInput.classList.remove("left-side__input--invalid");
    streetInput.classList.add("left-side__input--valid");
    streetError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateHouseNumber(event) {
  const houseNumber = +event.target.value.trim();
  if (houseNumber < 1) {
    houseInput.classList.remove("left-side__input--valid");
    houseInput.classList.add("left-side__input--invalid");
    houseError.innerText = "Only positive numbers are allowed";
  } else {
    houseInput.classList.remove("left-side__input--invalid");
    houseInput.classList.add("left-side__input--valid");
    houseError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function validateFlatNumber(event) {
  const flatNumber = event.target.value;
  flatInput.classList.remove("left-side__input--valid");
  flatInput.classList.add("left-side__input--invalid");

  if (!/^[1-9]/.test(flatNumber)) {
    flateError.innerText = "Must start with a positive number";
  } else if (!/[0-9]$/.test(flatNumber)) {
    flateError.innerText = "Must end with a number";
  } else if (!/^[-0-9]*$/.test(flatNumber)) {
    flateError.innerText = "Only numbers and dashes are allowed";
  } else {
    flatInput.classList.remove("left-side__input--invalid");
    flatInput.classList.add("left-side__input--valid");
    flateError.innerText = "";
  }
  tryToEnableCompleteBtn();
}

let checkedGiftsCount = 0;
function validateGifts(event) {
  const MAX = 2;
  const errorMsg = document.getElementById("error-msg-gifts");
  const giftsElement = event.target.parentElement;

  checkedGiftsCount += event.target.checked ? 1 : -1;
  if (checkedGiftsCount > MAX) {
    giftsElement.classList.replace("gifts--valid", "gifts--invalid");
    errorMsg.innerText = "You can choose at most two gifts";
  } else {
    giftsElement.classList.replace("gifts--invalid", "gifts--valid");
    errorMsg.innerText = "";
  }
  tryToEnableCompleteBtn();
}

function isFormValid() {
  const isLeftSideValid = [...leftInputs].every((input) =>
    input.classList.contains("left-side__input--valid")
  );

  const areGiftCheckboxesValid =
    document.querySelector(".gifts--valid") !== null;

  return isLeftSideValid && areGiftCheckboxesValid;
}

function tryToEnableCompleteBtn() {
  const completeButton = document.getElementById("complete-btn");
  completeButton.disabled = !isFormValid();
}

function goToOrderCreatedPage() {
  const successMsg = document.createElement("div");
  successMsg.className = "order-completed";
  successMsg.innerHTML = `
      <h2 class="font-weight-600">The order has been created</h2>
      <p>The delivery address is 
        <span class="font-weight-600">
          ${streetInput.value} ${houseInput.value}/${flatInput.value}
        </span>
      </p>
      <p>Customer
        <span class="font-weight-600">
          ${nameInput.value} ${surnameInput.value}
        </span>
      </p>
      `;
  document.querySelector(".container").append(successMsg);

  const form = document.getElementById("form");
  form.style.display = "none";
}
