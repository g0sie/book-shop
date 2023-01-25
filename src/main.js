import { BookInfoPopup } from "./BookInfoPopup/BookInfoPopup.js";
import { BookCatalog } from "./BookCatalog/BookCatalog.js";
import { OrderBookSection } from "./OrderBook/OrderBookSection.js";

export const container = document.getElementById("container");
container.className = "container";
document.body.append(container);

const containerFragment = new DocumentFragment();

const h1 = document.createElement("h1");
h1.className = "title";
h1.append("book shop");
containerFragment.append(h1);

const main = document.createElement("main");
main.className = "main";
containerFragment.append(main);

const bookInfoPopup = BookInfoPopup();
containerFragment.append(bookInfoPopup);

const bookCatalog = BookCatalog(bookInfoPopup);
main.append(bookCatalog);

export const orderBookSection = OrderBookSection();
main.append(orderBookSection);

container.append(containerFragment);

const form = document.querySelector("form");

export function goToFormPage() {
  main.style.display = "none";
  h1.style.display = "none";
  form.style.display = "grid";
}
