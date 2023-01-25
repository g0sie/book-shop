import { Bag } from "./Bag.js";
import { goToFormPage } from "../main.js";

export function OrderBookSection() {
  const section = document.createElement("section");
  section.className = "order-book";

  const h2OrderBook = document.createElement("h2");
  h2OrderBook.innerText = "Order Book";
  section.append(h2OrderBook);

  const bag = Bag();
  section.append(bag);

  const summary = document.createElement("div");
  summary.className = "summary";

  const totalPrice = TotalPrice();
  summary.append(totalPrice);

  const confirmOrderBtn = ConfirmOrderBtn();
  summary.append(confirmOrderBtn);

  section.append(summary);

  return section;
}

function TotalPrice() {
  const totalPriceElement = document.createElement("p");
  totalPriceElement.className = "total";
  totalPriceElement.innerText = " $";

  const totalPriceSpan = document.createElement("span");
  totalPriceSpan.id = "total-price";
  totalPriceSpan.innerText = "0";
  totalPriceElement.prepend(totalPriceSpan);

  return totalPriceElement;
}

function ConfirmOrderBtn() {
  const btn = document.createElement("button");
  btn.innerHTML = "Confirm order";
  btn.onclick = goToFormPage;

  return btn;
}
