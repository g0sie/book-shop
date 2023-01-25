import { totalPriceSpan, bag } from "./main.js";
import { Book } from "./OrderBook/Book.js";

export const addBookToBag = (book) => {
  let totalPrice = parseInt(totalPriceSpan.innerText) + book.price;
  totalPriceSpan.innerText = totalPrice;

  const bookDiv = Book(book);
  bag.append(bookDiv);
};
