"use strict";

const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

const h1 = document.createElement("h1");
h1.append("book shop");
container.appendChild(h1);

const main = document.createElement("main");
container.appendChild(main);

const bookCatalog = document.createElement("section");
bookCatalog.className = "book-catalog";
main.appendChild(bookCatalog);

const orderBook = document.createElement("section");
orderBook.className = "order-book";
main.appendChild(orderBook);
