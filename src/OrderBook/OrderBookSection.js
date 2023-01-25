import { Bag } from "./Bag.js";
import { Summary } from "./Summary.js";

export function OrderBookSection() {
  const section = document.createElement("section");
  section.className = "order-book";

  const h2OrderBook = document.createElement("h2");
  h2OrderBook.innerText = "Order Book";
  section.append(h2OrderBook);

  const bag = Bag();
  section.append(bag);

  const summary = Summary();
  section.append(summary);

  return section;
}
