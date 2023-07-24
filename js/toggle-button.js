// Event listener for the click event on the "BTC" button
document.getElementById("change-metrics-btc").addEventListener("click", function() {
  // Get references to the buttons for BTC, Market, and Lightning
  var btcButton = document.getElementsByClassName("btc-button")[0];
  var marketButton = document.getElementsByClassName("market-button")[0];
  var lightningButton = document.getElementsByClassName("lightning-button")[0];

  // Check if the BTC button is not already active
  if (!btcButton.classList.contains("active")) {
    // Set the BTC button as active and remove inactive class
    btcButton.classList.add("active");
    btcButton.classList.remove("inactive");

    // Set the Market button as inactive and remove active class
    marketButton.classList.remove("active");
    marketButton.classList.add("inactive");

    // Set the Lightning button as inactive and remove active class
    lightningButton.classList.remove("active");
    lightningButton.classList.add("inactive");
  }
});

// Event listener for the click event on the "Candle" button
document.getElementById("change-metrics-candle").addEventListener("click", function() {
  // Get references to the buttons for BTC, Market, and Lightning
  var btcButton = document.getElementsByClassName("btc-button")[0];
  var marketButton = document.getElementsByClassName("market-button")[0];
  var lightningButton = document.getElementsByClassName("lightning-button")[0];

  // Check if the Market button is not already active
  if (!marketButton.classList.contains("active")) {
    // Set the Market button as active and remove inactive class
    marketButton.classList.add("active");
    marketButton.classList.remove("inactive");

    // Set the BTC button as inactive and remove active class
    btcButton.classList.remove("active");
    btcButton.classList.add("inactive");

    // Set the Lightning button as inactive and remove active class
    lightningButton.classList.remove("active");
    lightningButton.classList.add("inactive");
  }
});

// Event listener for the click event on the "Lightning" button
document.getElementById("change-metrics-lightning").addEventListener("click", function() {
  // Get references to the buttons for BTC, Market, and Lightning
  var btcButton = document.getElementsByClassName("btc-button")[0];
  var marketButton = document.getElementsByClassName("market-button")[0];
  var lightningButton = document.getElementsByClassName("lightning-button")[0];

  // Check if the Lightning button is not already active
  if (!lightningButton.classList.contains("active")) {
    // Set the Lightning button as active and remove inactive class
    lightningButton.classList.add("active");
    lightningButton.classList.remove("inactive");

    // Set the BTC button as inactive and remove active class
    btcButton.classList.remove("active");
    btcButton.classList.add("inactive");

    // Set the Market button as inactive and remove active class
    marketButton.classList.remove("active");
    marketButton.classList.add("inactive");
  }
});
