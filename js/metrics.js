/* ========= BTC Price Binance ========= */

// Connect to WebSocket to get BTC price from Binance
const wst = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');
const priceDisplay = document.getElementById('price');

// Event listener to handle WebSocket messages
wst.onmessage = function (event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;

  // Format the price and display it in the extension interface
  const formattedPrice = formatPrice(markPrice);
  priceDisplay.textContent = formattedPrice;
}

// Function to format the price with appropriate currency symbols and commas
function formatPrice(price) {
  const formatted = parseFloat(price).toFixed(0);
  if (formatted.length > 3) {
    return '$ ' + formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '$ ' + formatted;
}

// Function to format network capacity in BTC
function formatNetworkCapacity(networkCapacity) {
  return networkCapacity.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " BTC";
}

// Function to format network capacity in BTC
function formatNetworkCapacity(networkCapacity) {
  const formattedValue = (networkCapacity / 10 ** 8).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formattedValue} BTC`;
}


/* ========= Lightning Metrics ========= */

// Function to fetch and display Lightning Network metrics
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

      // Display the fetched data in the respective elements
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

// Call the function to get Lightning Network metrics
getLightningMetrics();


/* ========= 24hr Price Change ========= */

// Function to fetch and display the 24hr price change
function getPriceChange() {
  var url = "https://api.coincap.io/v2/assets/bitcoin";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let changePercent24Hr = parseFloat(data.data.changePercent24Hr);
      let priceChange24Value = document.getElementById("price-change-24-value");

      // Format and display the 24hr price change percentage
      if (!isNaN(changePercent24Hr)) {
        priceChange24Value.innerHTML = `<span class="value">${changePercent24Hr.toFixed(2)}</span><span class="unit"> %</span>`;

        // Apply color based on price change direction
        if (changePercent24Hr > 0) {
          priceChange24Value.style.color = "green";
        } else if (changePercent24Hr < 0) {
          priceChange24Value.style.color = "black"; // Dark red
        } else {
          priceChange24Value.style.color = "inherit";
        }
      } else {
        priceChange24Value.textContent = "N/A";
        priceChange24Value.style.display = "block";
      }
    });
}

// Call the function to get the 24hr price change
getPriceChange();


/* ========= Week Price Change ========= */

// Function to fetch and display the week price change
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

        // Format and display the week price change percentage
        if (!isNaN(priceChange7d)) {
          if (priceChange7d > 0) {
            priceChange7dValue.innerHTML = `<span class="value">${priceChange7d.toFixed(2)}</span><span class="unit"> %</span>`;
            priceChange7dValue.style.color = "green";
          } else if (priceChange7d < 0) {
            priceChange7dValue.innerHTML = `<span class="value">${priceChange7d.toFixed(2)}</span><span class="unit"> %</span>`;
            priceChange7dValue.style.color = "black";
          } else {
            priceChange7dValue.innerHTML = `<span class="value">${priceChange7d.toFixed(2)}</span><span class="unit"> %</span>`;
            priceChange7dValue.style.color = "inherit";
          }

          priceChange7dValue.style.display = "block";
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

// Call the function to get the week price change
getWeekPriceChange();


/* ========= BTC DOM ========= */

// Function to fetch and display Bitcoin dominance percentage
function getBitcoinDominance() {
  var url = "https://api.coingecko.com/api/v3/global";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let bitcoinDominance = data.data.market_cap_percentage.btc.toFixed(2);
      let btcDomValue = document.getElementById("btc-dom-value");

      // Display the Bitcoin dominance percentage
      btcDomValue.innerHTML = `<span class="value">${bitcoinDominance}</span><span class="unit"> %<span>`;
    })
    .catch(function(error) {
      console.error("Failed to fetch data:", error);
    });
}

// Call the function to get Bitcoin dominance
getBitcoinDominance();
