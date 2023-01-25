import { orderBookSection } from "./main.js";
import { Book } from "./OrderBook/Book.js";

export const addBookToBag = (book) => {
  const totalPriceSpan = orderBookSection.querySelector("#total-price");
  let totalPrice = parseInt(totalPriceSpan.innerText) + book.price;
  totalPriceSpan.innerText = totalPrice;

  const bookDiv = Book(book);
  const bag = orderBookSection.querySelector(".order-book__bag");
  bag.append(bookDiv);
};
