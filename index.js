const colorInput = document.getElementById('colorInput');
const colorHex = document.getElementById('colorHex');
const randomBtn = document.getElementById('randomBtn');
const copyBtn = document.getElementById('copyBtn');

function getContrastColor(hexColor) {
  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminosity > 0.5 ? '#000000' : '#FFFFFF';
}

function updateColor(color) {
  colorHex.textContent = `${color.toUpperCase()}`;
  document.body.style.background = color;

  const textColor = getContrastColor(color);
  document.body.style.color = textColor;
  document.querySelector('h1').style.color = textColor;
}

function copyHexToClipboard() {
  const hexCode = colorHex.textContent;

  navigator.clipboard.writeText(hexCode).then(() => {
    showCopyNotification(hexCode);
  }).catch(err => {
    console.error('Falha ao copiar texto: ', err);
    alert(`Não foi possível copiar automaticamente. Copie manualmente: ${hexCode}`);
  });
}

function showCopyNotification(hex) {
  let notification = document.getElementById('copyNotification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'copy-notification';
    notification.className = 'copy-success';
    document.body.appendChild(notification);
  }

  notification.textContent = `Cor ${hex} copiada`;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

colorInput.addEventListener('input', (e) => {
  updateColor(e.target.value);
});

randomBtn.addEventListener('click', () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  colorInput.value = randomColor;
  updateColor(randomColor);
});

copyBtn.addEventListener('click', copyHexToClipboard);

document.addEventListener('DOMContentLoaded', () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  colorInput.value = randomColor;
  updateColor(randomColor);
});
