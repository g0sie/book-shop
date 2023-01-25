import { Bag } from "./Bag.js";
import { Summary } from "./Summary.js";

export function OrderBookSection() {
  const section = document.createElement("section");
  section.className = "order-book section";

  const sectionTitle = document.createElement("h2");
  sectionTitle.className = "section__title";
  sectionTitle.innerText = "Order Book";
  section.append(sectionTitle);

  const bag = Bag();
  section.append(bag);

  const summary = Summary();
  section.append(summary);

  return section;
}
