const colorInput = document.getElementById("colorInput");
const colorHex = document.getElementById("colorHex");
const colorName = document.getElementById("colorName");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");

function getContrastColor(hexColor) {
  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminosity > 0.5 ? "#000000" : "#FFFFFF";
}

function updateColor(color) {
  colorHex.value = color.toUpperCase();
  document.body.style.background = color;

  const textColor = getContrastColor(color);
  document.body.style.color = textColor;
  document.querySelector("h1").style.color = textColor;
  colorName.textContent = getColorNamePt(color);
}

function copyHexToClipboard() {
  const hexCode = colorHex.value;

  navigator.clipboard
    .writeText(hexCode)
    .then(() => {
      showCopyNotification(hexCode);
    })
    .catch((err) => {
      console.error("Falha ao copiar texto: ", err);
      alert(
        `Não foi possível copiar automaticamente. Copie manualmente: ${hexCode}`
      );
    });
}

function showCopyNotification(hex) {
  let notification = document.getElementById("copy-notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "copy-notification";
    notification.className = "copy-success";
    document.body.appendChild(notification);
  }

  notification.textContent = `Cor ${hex} copiada`;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

colorInput.addEventListener("input", (e) => {
  updateColor(e.target.value);
});

randomBtn.addEventListener("click", () => {
  const randomColor = generateRandomColor();
  colorInput.value = randomColor;
  updateColor(randomColor);
});

copyBtn.addEventListener("click", copyHexToClipboard);

colorHex.addEventListener("input", (e) => {
  let value = e.target.value;

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  const hexPattern = /^#([0-9A-Fa-f]{0,6})$/;

  if (hexPattern.test(value)) {
    colorInput.value = value;
    updateColor(value);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const randomColor = generateRandomColor();
  colorInput.value = randomColor;
  updateColor(randomColor);
});

// Utilidades para nomear cor
function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.substring(0, 2), 16),
    g: parseInt(value.substring(2, 4), 16),
    b: parseInt(value.substring(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function isGray(r, g, b, tolerance = 10) {
  return (
    Math.abs(r - g) <= tolerance &&
    Math.abs(g - b) <= tolerance &&
    Math.abs(r - b) <= tolerance
  );
}

function getColorNamePt(hex) {
  const { r, g, b } = hexToRgb(hex);
  if (r === 0 && g === 0 && b === 0) return "Preto";
  if (r === 255 && g === 255 && b === 255) return "Branco";

  if (isGray(r, g, b)) {
    if (r < 40) return "Preto";
    if (r > 215) return "Branco";
    return "Cinza";
  }

  const { h, s, l } = rgbToHsl(r, g, b);

  if (l < 15) return "Preto";
  if (l > 90 && s < 20) return "Branco";

  if (s < 15) return "Cinza";

  // Faixas aproximadas de matiz para nomes comuns
  if (h >= 0 && h < 15) return "Vermelho";
  if (h >= 15 && h < 45) return "Laranja";
  if (h >= 45 && h < 65) return "Amarelo";
  if (h >= 65 && h < 170) return "Verde";
  if (h >= 170 && h < 200) return "Ciano";
  if (h >= 200 && h < 255) return "Azul";
  if (h >= 255 && h < 290) return "Anil";
  if (h >= 290 && h < 330) return "Roxo";
  if (h >= 330 && h <= 360) return "Magenta";

  return "Cor";
}
