export function generatePrice(min = 1700, max = 2000) {
  const displayPrice = document.getElementById('price-display')
  const randomPrice = Math.random() * (max - min) + min
  displayPrice.textContent = randomPrice.toFixed(2)
}

export function updatePrice() {
  setInterval(generatePrice, 10000)
}