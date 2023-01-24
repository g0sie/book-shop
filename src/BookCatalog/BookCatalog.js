import { books } from "../books.js";
import { addBookToBag } from "../main.js";

export let draggingBook = null;

export function BookCatalog(bookInfoPopup) {
  const bookCatalog = document.createElement("section");
  bookCatalog.className = "book-catalog";

  const h2BookCatalog = document.createElement("h2");
  h2BookCatalog.innerText = "Book Catalog";
  bookCatalog.append(h2BookCatalog);

  books.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-catalog__book";
    bookDiv.draggable = true;
    bookCatalog.append(bookDiv);

    bookDiv.ondragstart = () => {
      draggingBook = book;
      bookDiv.classList.add(".book-catalog__book--dragging");
    };

    bookDiv.ondragend = () => {
      draggingBook = null;
      bookDiv.classList.remove(".book-catalog__book--dragging");
    };

    const image = document.createElement("div");
    image.className = "book__cover";
    image.style.backgroundImage = `url(${book.imageLink})`;
    bookDiv.append(image);

    const bookInfo = BookInfo(book, bookInfoPopup);
    bookDiv.append(bookInfo);
  });

  return bookCatalog;
}

function BookInfo(book, bookInfoPopup) {
  const info = document.createElement("div");
  info.className = "book__book-info";

  const author = document.createElement("p");
  author.className = "book-info__author";
  author.innerText = book.author;
  info.append(author);

  const title = document.createElement("h3");
  title.className = "book-info__title";
  title.innerText = book.title;
  info.append(title);

  const price = document.createElement("p");
  price.className = "book-info__price";
  price.innerText = `Price: $${book.price}`;
  info.append(price);

  const showMore = document.createElement("button");
  showMore.className = "book-info__btn";
  showMore.innerText = "Show more";

  showMore.onclick = (event) => {
    if (!bookInfoPopup.classList.contains("popup--active")) {
      bookInfoPopup.classList.add("popup--active");
    }
    bookInfoPopup.querySelector(".popup__description").innerText =
      book.description;
    const rect = bookInfoPopup.getBoundingClientRect();
    bookInfoPopup.style.top = `min(100vh - ${rect.height}px, ${event.pageY}px)`;
    bookInfoPopup.style.left = `min(100% - ${rect.width}px, ${event.pageX}px)`;
  };
  info.append(showMore);

  const addToBag = document.createElement("button");
  addToBag.className = "book-info__btn";
  addToBag.innerText = "Add to bag";
  addToBag.onclick = () => addBookToBag(book);
  info.append(addToBag);

  return info;
}
