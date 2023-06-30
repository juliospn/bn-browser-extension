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

function getPriceChange() {
  var url = "https://api.coincap.io/v2/assets/bitcoin";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let changePercent24Hr = parseFloat(data.data.changePercent24Hr);
      let priceChange24Value = document.getElementById("price-change-24-value");
      priceChange24Value.textContent = `${changePercent24Hr.toFixed(2)}%`;
      priceChange24Value.style.display = "block";
    });
}

getPriceChange();


function formatNetworkCapacity(networkCapacity) {
  return networkCapacity.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " BTC";
}

function formatNetworkCapacity(networkCapacity) {
  const formattedValue = (networkCapacity / 10 ** 8).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formattedValue} BTC`;
}

function getLightningMetrics() {
  var url = "https://server-proxy-bitcoinnews-juliospn.vercel.app/lightning-metrics";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let nodesValue = document.getElementById("nodes-value");
      let lightningChannelsValue = document.getElementById("lightning-channels-value");
      let networkCapacityValue = document.getElementById("network-capacity-value");

      nodesValue.textContent = data.numberofnodes.toLocaleString();
      nodesValue.style.display = "block";

      lightningChannelsValue.textContent = data.numberofchannels.toLocaleString();
      lightningChannelsValue.style.display = "block";

      const formattedNetworkCapacity = formatNetworkCapacity(data.networkcapacity);
      networkCapacityValue.textContent = formattedNetworkCapacity;
      networkCapacityValue.style.display = "block";
    });
}

getLightningMetrics();







