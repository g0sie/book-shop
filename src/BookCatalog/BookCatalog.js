import { books } from "../books.js";
import { BookInfo } from "./BookInfo.js";

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
