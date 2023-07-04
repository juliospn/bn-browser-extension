document.addEventListener("DOMContentLoaded", function () {
    const initialMetrics = [
      ".bitcoin-price",
      ".halving-time",
      ".nupl",
    ];
  
    const newMetrics = [
      ".price-change-24",
      ".price-change-7d",
      ".nupl",
    ];
  
    const newMetrics2 = [
      ".nodes",
      ".lightning-channels",
      ".network-capacity",
    ];
  
    let currentMetrics = initialMetrics;
  
    function changeMetrics() {
      const metricsToShow = currentMetrics === initialMetrics
        ? newMetrics
        : currentMetrics === newMetrics
        ? newMetrics2
        : initialMetrics;
  
      for (const metric of currentMetrics) {
        document.querySelector(metric).style.display = "none";
      }
  
      for (const metric of metricsToShow) {
        document.querySelector(metric).style.display = "flex";
      }
  
      currentMetrics = metricsToShow;
    }
  
    const changeMetricsBtn = document.getElementById("change-metrics-btn");
    changeMetricsBtn.addEventListener("click", changeMetrics);
  });
  

// Obtém referências para os elementos HTML
const verticalLines = Array.from(document.getElementsByClassName("verticalLine"));
const changeMetricsBtn = document.getElementById("change-metrics-btn");

let clickCount = 0;

// Configura a visibilidade inicial das vertical lines
verticalLines.slice(2).forEach(line => line.style.display = "none");

// Função para trocar a visibilidade das vertical lines
function toggleVerticalLines() {
  // Incrementa a contagem de cliques
  clickCount++;

  // Obtém as vertical lines visíveis no momento
  const visibleLines = verticalLines.filter(line => line.style.display !== "none");

  // Torna as duas primeiras vertical lines invisíveis
  visibleLines.slice(0, 2).forEach(line => line.style.display = "none");

  if (clickCount >= 3) {
    // Reinicia o contador após 3 cliques e exibe as duas primeiras vertical lines
    clickCount = 0;
    verticalLines.slice(2).forEach(line => line.style.display = "none");
    verticalLines.slice(0, 2).forEach(line => line.style.display = "block");
  } else {
    // Obtém as próximas duas vertical lines que devem ser visíveis
    const nextVisibleLines = verticalLines.slice(verticalLines.indexOf(visibleLines[1]) + 1, verticalLines.indexOf(visibleLines[1]) + 3);

    // Torna as próximas duas vertical lines visíveis
    nextVisibleLines.forEach(line => line.style.display = "block");
  }
}

// Adiciona o evento de clique ao botão "Change metrics"
changeMetricsBtn.addEventListener("click", toggleVerticalLines);
