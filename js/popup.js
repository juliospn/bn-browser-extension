const globalFundingRateSpan = document.getElementById('global-funding-rate');

fetch('https://serverless-vercel-nine.vercel.app/api/last-global-funding-rate')
  .then(response => response.text())
  .then(data => {
    // Converte o resultado obtido em texto para um número float
    const globalFundingRate = parseFloat(data.replace(/['"]+/g, ''));

    // Formata a taxa de financiamento global com sinal e precisão fixa de 5 casas decimais
    const formattedGlobalFundingRate = (globalFundingRate >= 0 ? '' : '') + globalFundingRate.toFixed(4) + '%';

    // Atualiza o texto de um elemento HTML com a taxa de financiamento formatada
    globalFundingRateSpan.textContent = formattedGlobalFundingRate;

    // Determina a cor do texto com base no valor da taxa de financiamento
  })
  .catch((err) => {
    // Exibe erros no console, caso ocorram durante a chamada da API
    console.error(err);
  });