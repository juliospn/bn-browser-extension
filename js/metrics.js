const wst = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');
const priceDisplay = document.getElementById('price');

wst.onmessage = function (event) {
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

      priceChange24Value.innerHTML = `${changePercent24Hr.toFixed(2)}<span class="unit">%</span>`;
      priceChange24Value.style.display = "block";

      if (changePercent24Hr > 0) {
        priceChange24Value.style.color = "green";
      } else if (changePercent24Hr < 0) {
        priceChange24Value.style.color = "darkred";
      }
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
      const [value, unit] = formattedNetworkCapacity.split(" ");
      const intValue = parseInt(value.replace(/,/g, ""));
      networkCapacityValue.innerHTML = `<span class="value">${intValue.toLocaleString()}</span> <span class="unit">${unit}</span>`;
      networkCapacityValue.style.display = "block";
    });
}

getLightningMetrics();

function getWeekPriceChange() {
  var url = "https://api.coinranking.com/v2/coin/Qwsogvtv82FCd?timePeriod=7d";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.status === "success" && data.data.coin) {
        let priceChange7d = parseFloat(data.data.coin.change);
        let priceChange7dValue = document.getElementById("price-change-7d-value");

        if (!isNaN(priceChange7d)) {
          priceChange7dValue.innerHTML = `${priceChange7d.toFixed(2)}<span class="unit">%</span>`;
          priceChange7dValue.style.display = "block";

          if (priceChange7d > 0) {
            priceChange7dValue.style.color = "green";
          } else if (priceChange7d < 0) {
            priceChange7dValue.style.color = "darkred";
          }
        } else {
          priceChange7dValue.textContent = "N/A";
          priceChange7dValue.style.display = "block";
        }
      } else {
        console.error("Invalid data structure:", data);
      }
    })
    .catch(function(error) {
      console.error("Failed to fetch data:", error);
    });
}

getWeekPriceChange();













