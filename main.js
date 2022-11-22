"use strict";

const books = [
  {
    author: "Douglas Crockford",
    imageLink:
      "https://m.media-amazon.com/images/I/5131OWtQRaL._AC_SY1000_.jpg",
    title: "JavaScript: The Good Parts: The Good Parts",
    price: 30,
    description:
      "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must",
  },
  {
    author: "David Herman",
    imageLink:
      "https://image.ceneostatic.pl/data/products/41441585/i-effective-javascript-68-specific-ways-to-harness-the-power-of-javascript.jpg",
    title:
      "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
    price: 22,
    description:
      "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency",
  },
  {
    author: "David Flanagan",
    imageLink:
      "https://static01.helion.com.pl/global/okladki/326x466/e_1uas.jpg",
    title: "JavaScript: The Definitive Guide",
    price: 40,
    description:
      "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript",
  },
  {
    author: " Eric Elliott",
    imageLink: "https://m.media-amazon.com/images/I/51t0zfcEBVL.jpg",
    title: "Programming JavaScript Applications",
    price: 19,
    description:
      "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows.",
  },
  {
    author: "Addy Osmani",
    imageLink: "https://m.media-amazon.com/images/I/51H-31ivMTL._AC_SY780_.jpg",
    title: "Learning JavaScript Design Patterns",
    price: 32,
    description:
      "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
  },
  {
    author: "Boris Cherny",
    imageLink:
      "https://static01.helion.com.pl/global/okladki/326x466/e_13qs.jpg",
    title: "Programming TypeScript",
    price: 28,
    description:
      "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system.",
  },
  {
    author: "Alex Banks, Eve Porcello",
    imageLink:
      "https://static01.helion.com.pl/global/okladki/326x466/e_1uaz.jpg",
    title: "Learning React, 2nd Edition",
    price: 25,
    description:
      "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary.",
  },
  {
    author: "Bradley Meck Alex Young and Mike Cantelon",
    imageLink:
      "https://images.manning.com/book/9/be0e700-8ac5-44b7-92fc-0a0d250969be/Cantelon-Node-2ed.png",
    title: "Node.js in Action",
    price: 38,
    description:
      "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications.",
  },
  {
    author: "Kyle Simpson",
    imageLink:
      "https://m.media-amazon.com/images/I/41T5H8u7fUL._AC_SY1000_.jpg",
    title: "You Don't Know JS Yet: Get Started",
    price: 26,
    description:
      "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!",
  },
  {
    author: "John Resig and Bear Bibeault",
    imageLink:
      "https://images.manning.com/360/480/resize/book/b/72b6dbb-4eb6-4bbd-9078-b47f0393a1bb/Resig-JSN-2ed-HI.png",
    title: "Secrets of the JavaScript Ninja",
    price: 33,
    description:
      "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up.",
  },
];

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

// POPUP
const popup = document.createElement("div");
popup.className = "popup";
const popupFragment = new DocumentFragment();

const exitButton = () => {
  const button = document.createElement("div");
  button.className = "exit";
  button.innerHTML = '<div class="line"></div><div class="line"></div>';
  return button;
};

const exitPopup = exitButton();
exitPopup.onclick = () => popup.classList.remove("active");
popupFragment.append(exitPopup);

const popupDescription = document.createElement("p");
popupDescription.className = "description";
popupFragment.append(popupDescription);

popup.append(popupFragment);
containerFragment.append(popup);

// BOOK CATALOG SECTION
const bookCatalog = document.createElement("section");
bookCatalog.className = "book-catalog";
const bookCatalogFragment = new DocumentFragment();

const h2BookCatalog = document.createElement("h2");
h2BookCatalog.innerText = "Book Catalog";
bookCatalogFragment.append(h2BookCatalog);

books.forEach((book) => {
  const bookDiv = document.createElement("div");
  const bookFragment = new DocumentFragment();
  bookDiv.className = "book";

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
    if (!popup.classList.contains("active")) popup.classList.add("active");
    popupDescription.innerText = book.description;
    const rect = popup.getBoundingClientRect();
    popup.style.top = `min(100vh - ${rect.height}px, ${event.pageY}px)`;
    popup.style.left = `min(100% - ${rect.width}px, ${event.pageX}px)`;
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

  const deleteButton = exitButton();
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

const form = document.getElementById("form");
