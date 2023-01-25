export function ExitButton() {
  const button = document.createElement("div");
  button.className = "exit-btn";
  button.innerHTML =
    '<div class="exit-btn__line"></div><div class="exit-btn__line"></div>';
  return button;
}
