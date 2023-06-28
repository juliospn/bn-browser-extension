// Seleciona o elemento onde o NUPL será exibido
const nuplValue = document.getElementById("nupl-value");

// URL da API para obter as informações de mercado do Bitcoin
const url = "https://data.messari.io/api/v1/assets/bitcoin/metrics";

// Requisita os dados da API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extrai o valor de market cap e realized cap
    const marketCap = data.data.marketcap.current_marketcap_usd;
    const realizedCap = data.data.marketcap.realized_marketcap_usd;

    // Calcula o NUPL
    const nupl = (marketCap - realizedCap) / marketCap;

    
    // Insere o valor de NUPL na div
    nuplValue.innerHTML = nupl.toFixed(3);
    // Aplica a cor definida ao elemento que exibe o NUPL

  })
  .catch(error => {
    // Caso ocorra algum erro, exibe uma mensagem
    console.error(error);
    nuplValue.innerHTML = "--";
  });
