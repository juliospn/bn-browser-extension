const wst = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');
const fundingRateDisplay = document.getElementById('funding-rate');

wst.onmessage = function (event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;

  // Exibir o preço na interface da extensão
  document.getElementById('price').textContent = '$ ' + parseFloat(markPrice).toFixed(0)+',00';

}
