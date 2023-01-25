import { goToFormPage } from "../main.js";

export function Summary() {
  const summary = document.createElement("div");
  summary.className = "summary";

  const totalPrice = TotalPrice();
  summary.append(totalPrice);

  const confirmOrderBtn = ConfirmOrderBtn();
  summary.append(confirmOrderBtn);

  return summary;
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
