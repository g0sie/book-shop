import { ExitButton } from "../ExitButton/ExitButton.js";
import { orderBookSection } from "../main.js";

export function Book(book) {
  const bookDiv = document.createElement("div");
  bookDiv.className = "order-book__book";
  const bookFragment = new DocumentFragment();

  const author = document.createElement("p");
  author.className = "book__author";
  author.innerText = book.author;
  bookFragment.append(author);

  const title = document.createElement("p");
  title.className = "book__title";
  title.innerText = book.title;
  bookFragment.append(title);

  const price = document.createElement("p");
  price.className = "book__price";
  price.innerText = "$" + book.price;
  bookFragment.append(price);

  const removeBook = RemoveBookBtn(bookDiv, book);
  removeBook.classList.add("book__remove-btn");
  bookFragment.append(removeBook);

  bookDiv.append(bookFragment);

  return bookDiv;
}

function RemoveBookBtn(bookDiv, book) {
  const totalPriceSpan = orderBookSection.querySelector("#total-price");

  const removeBook = () => {
    bookDiv.remove();
    const totalPrice = parseInt(totalPriceSpan.innerText) - book.price;
    totalPriceSpan.innerText = totalPrice;
  };

  const btn = ExitButton();

  btn.onclick = removeBook;

  return btn;
}
