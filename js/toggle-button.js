document.getElementById("change-metrics-btc").addEventListener("click", function() {
    var btcButton = document.getElementsByClassName("btc-button")[0];
    var marketButton = document.getElementsByClassName("market-button")[0];
    var lightningButton = document.getElementsByClassName("lightning-button")[0];
  
    if (!btcButton.classList.contains("active")) {
      btcButton.classList.add("active");
      btcButton.classList.remove("inactive");
      marketButton.classList.remove("active");
      marketButton.classList.add("inactive");
      lightningButton.classList.remove("active");
      lightningButton.classList.add("inactive");
    }
  });
  
  document.getElementById("change-metrics-candle").addEventListener("click", function() {
    var btcButton = document.getElementsByClassName("btc-button")[0];
    var marketButton = document.getElementsByClassName("market-button")[0];
    var lightningButton = document.getElementsByClassName("lightning-button")[0];
  
    if (!marketButton.classList.contains("active")) {
      marketButton.classList.add("active");
      marketButton.classList.remove("inactive");
      btcButton.classList.remove("active");
      btcButton.classList.add("inactive");
      lightningButton.classList.remove("active");
      lightningButton.classList.add("inactive");
    }
  });
  
  document.getElementById("change-metrics-lightning").addEventListener("click", function() {
    var btcButton = document.getElementsByClassName("btc-button")[0];
    var marketButton = document.getElementsByClassName("market-button")[0];
    var lightningButton = document.getElementsByClassName("lightning-button")[0];
  
    if (!lightningButton.classList.contains("active")) {
      lightningButton.classList.add("active");
      lightningButton.classList.remove("inactive");
      btcButton.classList.remove("active");
      btcButton.classList.add("inactive");
      marketButton.classList.remove("active");
      marketButton.classList.add("inactive");
    }
  });
  