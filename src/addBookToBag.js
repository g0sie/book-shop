import { totalPriceElement, bagElement } from "./main.js";
import { ExitButton } from "./ExitButton/ExitButton.js";

let totalPrice = 0;

export const addBookToBag = (book) => {
  console.log(totalPrice);
  totalPrice += book.price;
  totalPriceElement.innerText = totalPrice + "$";

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

  const removeBook = RemoveBookBtn(bookDiv);
  bookFragment.append(removeBook);

  bookDiv.append(bookFragment);
  bagElement.append(bookDiv);
};

function RemoveBookBtn(bookDiv) {
  const removeBook = () => {
    bookDiv.remove();
    totalPrice -= book.price;
    totalPriceElement.innerText = totalPrice + "$";
  };

  const btn = ExitButton();

  btn.onclick = removeBook;
}
