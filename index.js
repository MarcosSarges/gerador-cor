const colorInput = document.getElementById('colorInput');
const colorHex = document.getElementById('colorHex');
const randomBtn = document.getElementById('randomBtn');
const copyBtn = document.getElementById('copyBtn');

// Função para calcular o contraste e ajustar a cor do texto
function getContrastColor(hexColor) {
  // Remove o # se existir
  const hex = hexColor.replace('#', '');

  // Converte para RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calcula a luminosidade
  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retorna branco para cores escuras e preto para cores claras
  return luminosity > 0.5 ? '#000000' : '#FFFFFF';
}

// Função para atualizar a cor
function updateColor(color) {
  colorHex.textContent = `Hex: ${color.toUpperCase()}`;
  document.body.style.background = color;

  // Ajusta a cor do texto com base no contraste
  const textColor = getContrastColor(color);
  document.body.style.color = textColor;
  document.querySelector('h1').style.color = textColor;
}

// Evento do input de cor
colorInput.addEventListener('input', (e) => {
  updateColor(e.target.value);
});

// Gerar cor aleatória
randomBtn.addEventListener('click', () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  colorInput.value = randomColor;
  updateColor(randomColor);
});

// Copiar código HEX
copyBtn.addEventListener('click', () => {
  const hexValue = colorInput.value;
  navigator.clipboard.writeText(hexValue).then(() => {
    // Feedback visual
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copiado!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });
});
