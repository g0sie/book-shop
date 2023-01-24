export function ExitButton() {
  const button = document.createElement("div");
  button.className = "exit";
  button.innerHTML = '<div class="line"></div><div class="line"></div>';
  return button;
}
