// This script handles the functionality to switch between different sets of metrics on the webpage.

document.addEventListener("DOMContentLoaded", function () {
  // Get all vertical lines as an array
  const verticalLines = Array.from(document.getElementsByClassName("verticalLine"));

  // Define initial metric sections, sets of new metrics, and another set of new metrics
  const initialMetrics = [
    ".bitcoin-price",
    ".halving-time",
    ".btc-dom",
  ];

  const newMetrics = [
    ".price-change-24",
    ".price-change-7d",
    ".nupl"
  ];

  const newMetrics2 = [
    ".nodes",
    ".lightning-channels",
    ".network-capacity",
  ];

  let currentMetrics = initialMetrics;

  // Function to show the specified metrics while hiding others
  function showMetrics(metricsToShow) {
    for (const metric of currentMetrics) {
      document.querySelector(metric).style.display = "none";
    }

    for (const metric of metricsToShow) {
      document.querySelector(metric).style.display = "flex";
    }

    currentMetrics = metricsToShow;
  }

  // Functions to handle metric changes based on button clicks
  function changeToBitcoinMetrics() {
    showMetrics(initialMetrics);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(0, 2).forEach(line => line.style.display = "block");
  }

  function changeToCandleMetrics() {
    showMetrics(newMetrics);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(2, 4).forEach(line => line.style.display = "block");
  }

  function changeToLightningMetrics() {
    showMetrics(newMetrics2);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(4).forEach(line => line.style.display = "block");
  }

  // Add event listeners to the metric change buttons
  const changeMetricsBTCBtn = document.getElementById("change-metrics-btc");
  const changeMetricsCandleBtn = document.getElementById("change-metrics-candle");
  const changeMetricsLightningBtn = document.getElementById("change-metrics-lightning");

  changeMetricsBTCBtn.addEventListener("click", changeToBitcoinMetrics);
  changeMetricsCandleBtn.addEventListener("click", changeToCandleMetrics);
  changeMetricsLightningBtn.addEventListener("click", changeToLightningMetrics);

  // Hide all vertical lines initially
  verticalLines.forEach(line => line.style.display = "none");

  // Show the relevant vertical lines for the change-metrics-btc button
  verticalLines.slice(0, 2).forEach(line => line.style.display = "block");

  // Hide the element corresponding to the class .nupl
  document.querySelector(".nupl").style.display = "none";
});
