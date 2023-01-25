import { BookInfoPopup } from "./BookInfoPopup/BookInfoPopup.js";
import { BookCatalog } from "./BookCatalog/BookCatalog.js";
import { OrderBookSection } from "./OrderBook/OrderBookSection.js";

export const container = document.getElementById("container");
container.className = "container";
document.body.append(container);

const containerFragment = new DocumentFragment();

const h1 = document.createElement("h1");
h1.append("book shop");
containerFragment.append(h1);

const main = document.createElement("main");
containerFragment.append(main);

const form = document.querySelector("form");

export function goToFormPage() {
  main.style.display = "none";
  h1.style.display = "none";
  form.style.display = "grid";
}

const bookInfoPopup = BookInfoPopup();
containerFragment.append(bookInfoPopup);

const bookCatalog = BookCatalog(bookInfoPopup);
main.append(bookCatalog);

export const orderBookSection = OrderBookSection();
main.append(orderBookSection);

container.append(containerFragment);

// FORM

const handleEmptyInputs = (event) => {
  const elem = event.target;
  if (elem.value === "") {
    elem.className = "invalid";
    elem.nextElementSibling.innerText = "This field can't be empty";
  }
};

const leftInputs = document.querySelectorAll("form .left input");
leftInputs.forEach((input) => (input.onblur = handleEmptyInputs));

const handleName = (event) => {
  const val = event.target.value.trim();
  if (val.length < 4) {
    inputName.className = "invalid";
    nameError.innerText = "Too short name";
  } else if (val.indexOf(" ") > -1) {
    inputName.className = "invalid";
    nameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(val)) {
    inputName.className = "invalid";
    nameError.innerText = "Only letters allowed";
  } else {
    inputName.className = "valid";
    nameError.innerText = "";
  }
  handleCompleteButton();
};
const inputName = document.getElementById("name");
const nameError = document.getElementById("error-msg-name");
inputName.oninput = handleName;

const handleSurname = (event) => {
  const val = event.target.value.trim();
  if (val.length < 5) {
    inputSurname.className = "invalid";
    surnameError.innerText = "Too short surname";
  } else if (val.indexOf(" ") > -1) {
    inputSurname.className = "invalid";
    surnameError.innerText = "Whitespaces are not allowed";
  } else if (!/^[a-zA-Z]*$/.test(val)) {
    inputSurname.className = "invalid";
    surnameError.innerText = "Only letters allowed";
  } else {
    inputSurname.className = "valid";
    surnameError.innerText = "";
  }
  handleCompleteButton();
};
const inputSurname = document.getElementById("surname");
const surnameError = document.getElementById("error-msg-surname");
inputSurname.oninput = handleSurname;

const handleDeliveryDate = (event) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0);
  const val = new Date(event.target.value);
  if (val < tomorrow) {
    inputDate.className = "invalid";
    dateError.innerText = "The earliest possible date is tomorrow";
  } else {
    inputDate.className = "valid";
    dateError.innerText = "";
  }
  handleCompleteButton();
};
const inputDate = document.getElementById("date");
const dateError = document.getElementById("error-msg-date");
inputDate.oninput = handleDeliveryDate;

const handleStreet = (event) => {
  const val = event.target.value.trim();
  if (val.length < 5) {
    inputStreet.className = "invalid";
    streetError.innerText = "Too short street";
  } else {
    inputStreet.className = "valid";
    streetError.innerText = "";
  }
  handleCompleteButton();
};
const inputStreet = document.getElementById("street");
const streetError = document.getElementById("error-msg-street");
inputStreet.oninput = handleStreet;

const handleHouseNumber = (event) => {
  const val = +event.target.value.trim();
  if (val < 1) {
    inputHouse.className = "invalid";
    houseError.innerText = "Only positive numbers are allowed";
  } else {
    inputHouse.className = "valid";
    houseError.innerText = "";
  }
  handleCompleteButton();
};
const inputHouse = document.getElementById("house");
const houseError = document.getElementById("error-msg-house");
inputHouse.oninput = handleHouseNumber;

const handleFlatNumber = (event) => {
  const val = event.target.value;
  if (!/^[1-9]/.test(val)) {
    inputFlat.className = "invalid";
    flateError.innerText = "Must start with a positive number";
  } else if (!/[0-9]$/.test(val)) {
    inputFlat.className = "invalid";
    flateError.innerText = "Must end with a number";
  } else if (!/^[-0-9]*$/.test(val)) {
    inputFlat.className = "invalid";
    flateError.innerText = "Only numbers and dashes are allowed";
  } else {
    inputFlat.className = "valid";
    flateError.innerText = "";
  }
  handleCompleteButton();
};
const inputFlat = document.getElementById("flat");
const flateError = document.getElementById("error-msg-flat");
inputFlat.oninput = handleFlatNumber;

const handleGifts = (event) => {
  const MAX = 2;
  const errorMsg = document.getElementById("error-msg-gifts");
  const parent = event.target.parentElement;
  checkedCount += event.target.checked ? 1 : -1;
  if (checkedCount > MAX) {
    parent.classList.replace("valid", "invalid");
    errorMsg.innerText = "You can choose at most two gifts";
  } else {
    parent.classList.replace("invalid", "valid");
    errorMsg.innerText = "";
  }
  handleCompleteButton();
};

const giftCheckboxes = document.querySelectorAll(".gifts input");
giftCheckboxes.forEach((checkbox) => (checkbox.oninput = handleGifts));
let checkedCount = 0;

const isFormValid = () => {
  return [...leftInputs, giftCheckboxes[0].parentElement].every((elem) =>
    elem.classList.contains("valid")
  );
};

function handleCompleteButton() {
  const completeButton = document.getElementById("complete");
  completeButton.disabled = !isFormValid();
}

const completeButton = document.getElementById("complete");
completeButton.onclick = () => {
  const message = document.createElement("div");
  message.className = "order-completed";
  message.innerHTML = `
  <h2>The order created</h2>
  <p>The delivery address is 
    <span>
      ${inputStreet.value} ${inputHouse.value}/${inputFlat.value}
    </span>
  </p>
  <p>Customer
    <span>${inputName.value} ${inputSurname.value}</span>
  </p>
  `;
  containerFragment.append(message);
  container.append(containerFragment);

  const form = document.getElementById("form");
  form.style.display = "none";
};
