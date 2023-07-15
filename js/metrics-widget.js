document.addEventListener("DOMContentLoaded", function () {
  const verticalLines = Array.from(document.getElementsByClassName("verticalLine"));

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

  function showMetrics(metricsToShow) {
    for (const metric of currentMetrics) {
      document.querySelector(metric).style.display = "none";
    }

    for (const metric of metricsToShow) {
      document.querySelector(metric).style.display = "flex";
    }

    currentMetrics = metricsToShow;
  }

  function changeToBitcoinMetrics() {
    showMetrics(initialMetrics);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(0, 2).forEach(line => line.style.display = "block");

    changeMetricsBTCBtn.classList.add("active");
    changeMetricsCandleBtn.classList.remove("active");
    changeMetricsLightningBtn.classList.remove("active");
  }

  function changeToCandleMetrics() {
    showMetrics(newMetrics);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(2, 4).forEach(line => line.style.display = "block");

    changeMetricsBTCBtn.classList.remove("active");
    changeMetricsCandleBtn.classList.add("active");
    changeMetricsLightningBtn.classList.remove("active");
  }

  function changeToLightningMetrics() {
    showMetrics(newMetrics2);
    verticalLines.forEach(line => line.style.display = "none");
    verticalLines.slice(4).forEach(line => line.style.display = "block");

    changeMetricsBTCBtn.classList.remove("active");
    changeMetricsCandleBtn.classList.remove("active");
    changeMetricsLightningBtn.classList.add("active");
  }

  const changeMetricsBtn = document.getElementById("change-metrics-btn");
  const changeMetricsBTCBtn = document.getElementById("change-metrics-btc");
  const changeMetricsCandleBtn = document.getElementById("change-metrics-candle");
  const changeMetricsLightningBtn = document.getElementById("change-metrics-lightning");

  changeMetricsBTCBtn.addEventListener("click", changeToBitcoinMetrics);
  changeMetricsCandleBtn.addEventListener("click", changeToCandleMetrics);
  changeMetricsLightningBtn.addEventListener("click", changeToLightningMetrics);

  // Ocultar todas as vertical lines inicialmente
  verticalLines.forEach(line => line.style.display = "none");

  // Exibir as duas vertical lines relevantes para o botão change-metrics-btc
  verticalLines.slice(0, 2).forEach(line => line.style.display = "block");

  // Ocultar o elemento correspondente à classe .nupl
  document.querySelector(".nupl").style.display = "none";
});
