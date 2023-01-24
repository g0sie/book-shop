import { ExitButton } from "../ExitButton/ExitButton.js";

export function BookInfoPopup() {
  const popup = document.createElement("div");
  popup.className = "popup";

  const exitPopupButton = ExitButton();
  exitPopupButton.onclick = () => popup.classList.remove("active");
  popup.append(exitPopupButton);

  const popupDescription = document.createElement("p");
  popupDescription.className = "description";
  popup.append(popupDescription);

  return popup;
}
