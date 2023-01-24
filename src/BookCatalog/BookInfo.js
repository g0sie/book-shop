import { addBookToBag } from "../addBookToBag.js";

export function BookInfo(book, bookInfoPopup) {
  const info = document.createElement("div");
  info.className = "book__book-info";

  const author = document.createElement("p");
  author.className = "book-info__author";
  author.innerText = book.author;
  info.append(author);

  const title = document.createElement("h3");
  title.className = "book-info__title";
  title.innerText = book.title;
  info.append(title);

  const price = document.createElement("p");
  price.className = "book-info__price";
  price.innerText = `Price: $${book.price}`;
  info.append(price);

  const showMore = ShowMoreBtn(book, bookInfoPopup);
  info.append(showMore);

  const addToBag = AddToBagBtn(book);
  info.append(addToBag);

  return info;
}

function ShowMoreBtn(book, bookInfoPopup) {
  const showPopup = (event) => {
    if (!bookInfoPopup.classList.contains("popup--active")) {
      bookInfoPopup.classList.add("popup--active");
    }

    const description = bookInfoPopup.querySelector(".popup__description");
    description.innerText = book.description;

    const rect = bookInfoPopup.getBoundingClientRect();
    bookInfoPopup.style.top = `min(100vh - ${rect.height}px, ${event.pageY}px)`;
    bookInfoPopup.style.left = `min(100% - ${rect.width}px, ${event.pageX}px)`;
  };

  const btn = document.createElement("button");
  btn.className = "book-info__btn";
  btn.innerText = "Show more";

  btn.onclick = showPopup;

  return btn;
}

function AddToBagBtn(book) {
  const btn = document.createElement("button");
  btn.className = "book-info__btn";
  btn.innerText = "Add to bag";

  btn.onclick = () => addBookToBag(book);

  return btn;
}
