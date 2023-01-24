import { ExitButton } from "../ExitButton/ExitButton.js";

export function BookInfoPopup() {
  const popup = document.createElement("div");
  popup.className = "popup";

  const exitPopupButton = ExitButton();
  exitPopupButton.classList.add("popup__exit-btn");
  exitPopupButton.onclick = () => popup.classList.remove("popup--active");
  popup.append(exitPopupButton);

  const popupDescription = document.createElement("p");
  popupDescription.className = "popup__description";
  popup.append(popupDescription);

  return popup;
}
