import { books } from "./books.js";
import { BookInfoPopup } from "./BookInfoPopup/BookInfoPopup.js";
import { ExitButton } from "./ExitButton/ExitButton.js";

const container = document.getElementById("container");
container.className = "container";
document.body.append(container);

const containerFragment = new DocumentFragment();

const h1 = document.createElement("h1");
h1.append("book shop");
containerFragment.append(h1);

const main = document.createElement("main");
const mainFragment = new DocumentFragment();
containerFragment.append(main);

const bookInfoPopup = BookInfoPopup();
containerFragment.append(bookInfoPopup);

// BOOK CATALOG SECTION
const bookCatalog = document.createElement("section");
bookCatalog.className = "book-catalog";
const bookCatalogFragment = new DocumentFragment();

const h2BookCatalog = document.createElement("h2");
h2BookCatalog.innerText = "Book Catalog";
bookCatalogFragment.append(h2BookCatalog);

let draggingBook = null;
books.forEach((book) => {
  const bookDiv = document.createElement("div");
  const bookFragment = new DocumentFragment();
  bookDiv.className = "book";
  bookDiv.draggable = true;
  bookDiv.ondragstart = () => {
    draggingBook = book;
    bookDiv.classList.add("dragging");
  };
  bookDiv.ondragend = () => {
    draggingBook = null;
    bookDiv.classList.remove("dragging");
  };

  const image = document.createElement("div");
  image.className = "cover";
  image.style.backgroundImage = `url(${book.imageLink})`;
  bookFragment.append(image);

  const info = document.createElement("div");
  const infoFragment = new DocumentFragment();
  info.className = "info";

  const author = document.createElement("p");
  author.className = "author";
  author.innerText = book.author;
  infoFragment.append(author);

  const title = document.createElement("h3");
  title.innerText = book.title;
  infoFragment.append(title);

  const price = document.createElement("p");
  price.className = "price";
  price.innerText = `Price: $${book.price}`;
  infoFragment.append(price);

  const showMore = document.createElement("button");
  showMore.className = "show-more";
  showMore.innerText = "Show more";
  showMore.onclick = (event) => {
    if (!bookInfoPopup.classList.contains("active")) {
      bookInfoPopup.classList.add("active");
    }
    document.querySelector(".description").innerText = book.description;
    const rect = bookInfoPopup.getBoundingClientRect();
    bookInfoPopup.style.top = `min(100vh - ${rect.height}px, ${event.pageY}px)`;
    bookInfoPopup.style.left = `min(100% - ${rect.width}px, ${event.pageX}px)`;
  };
  infoFragment.append(showMore);

  const addToBag = document.createElement("button");
  addToBag.className = "add-to-bag";
  addToBag.innerText = "Add to bag";
  addToBag.onclick = () => addBookToBag(book);
  infoFragment.append(addToBag);

  info.append(infoFragment);
  bookFragment.append(info);
  bookDiv.append(bookFragment);
  bookCatalogFragment.append(bookDiv);
});

bookCatalog.append(bookCatalogFragment);
mainFragment.append(bookCatalog);

// ORDER BOOK SECTION
const bag = [];
let total = 0;

const orderBook = document.createElement("section");
const orderBookFragment = new DocumentFragment();
orderBook.className = "order-book";

const h2OrderBook = document.createElement("h2");
h2OrderBook.innerText = "Order Book";
orderBookFragment.append(h2OrderBook);

const bagElement = document.createElement("div");
const bagFragment = new DocumentFragment();
bagElement.className = "bag";

const addBookToBag = (book) => {
  bag.push(book);
  total += book.price;
  totalElement.innerText = total + "$";

  const bookInBag = document.createElement("div");
  bookInBag.className = "book";
  const bookFragment = new DocumentFragment();

  const author = document.createElement("p");
  author.className = "author";
  author.innerText = book.author;
  bookFragment.append(author);

  const title = document.createElement("p");
  title.className = "title";
  title.innerText = book.title;
  bookFragment.append(title);

  const price = document.createElement("p");
  price.className = "price";
  price.innerText = "$" + book.price;
  bookFragment.append(price);

  const deleteButton = ExitButton();
  deleteButton.onclick = () => {
    bag.splice(bag.indexOf(book), 1);
    bookInBag.remove();
    total -= book.price;
    totalElement.innerText = total + "$";
  };
  bookFragment.append(deleteButton);

  bookInBag.append(bookFragment);
  bagFragment.append(bookInBag);
  bagElement.append(bagFragment);
};

bagElement.ondragover = (event) => {
  event.preventDefault();
};

bagElement.ondrop = (event) => {
  if (draggingBook) addBookToBag(draggingBook);
};

orderBookFragment.append(bagElement);

const summary = document.createElement("div");
const summaryFragment = new DocumentFragment();
summary.className = "summary";

const totalElement = document.createElement("p");
totalElement.className = "total";
totalElement.innerText = total + "$";
summaryFragment.append(totalElement);

const confirmOrder = document.createElement("button");
confirmOrder.innerHTML = "Confirm order";
confirmOrder.onclick = () => {
  main.style.display = "none";
  h1.style.display = "none";
  form.style.display = "grid";
};
summaryFragment.append(confirmOrder);

summary.append(summaryFragment);
orderBookFragment.append(summary);

orderBook.append(orderBookFragment);
mainFragment.append(orderBook);
main.append(mainFragment);
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
