const wst = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');
const priceDisplay = document.getElementById('price');

wst.onmessage = function(event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;

  // Format the price
  const formattedPrice = formatPrice(markPrice);

  // Display the formatted price in the extension interface
  priceDisplay.textContent = formattedPrice;
}

function formatPrice(price) {
  const formatted = parseFloat(price).toFixed(0);
  if (formatted.length > 3) {
    return '$ ' + formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '$ ' + formatted;
}
