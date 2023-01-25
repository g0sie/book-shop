import { draggingBook } from "../BookCatalog/BookCatalog.js";
import { addBookToBag } from "../addBookToBag.js";

export function Bag() {
  const bag = document.createElement("div");
  bag.className = "order-book__bag";

  bag.ondragover = (event) => {
    event.preventDefault();
  };

  bag.ondrop = () => {
    if (draggingBook) addBookToBag(draggingBook);
  };

  return bag;
}
