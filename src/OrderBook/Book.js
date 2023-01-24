import { totalPriceSpan } from "../main.js";
import { ExitButton } from "../ExitButton/ExitButton.js";

export function Book(book) {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";
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

  const removeBook = RemoveBookBtn(bookDiv, book);
  bookFragment.append(removeBook);

  bookDiv.append(bookFragment);

  return bookDiv;
}

function RemoveBookBtn(bookDiv, book) {
  const removeBook = () => {
    bookDiv.remove();
    const totalPrice = parseInt(totalPriceSpan.innerText) - book.price;
    totalPriceSpan.innerText = totalPrice;
  };

  const btn = ExitButton();

  btn.onclick = removeBook;

  return btn;
}
