const colorInput = document.getElementById('colorInput');
const colorHex = document.getElementById('colorHex');

colorInput.addEventListener('input', (e) => {
  const color = e.target.value;
  colorHex.textContent = `Hex: ${color}`;
  document.body.style.background = color;
});
