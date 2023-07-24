// Select the element where NUPL will be displayed
const nuplValue = document.getElementById("nupl-value");

// API URL to fetch Bitcoin market information
const url = "https://data.messari.io/api/v1/assets/bitcoin/metrics";

// Request data from the API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract market cap and realized cap from the API response
    const marketCap = data.data.marketcap.current_marketcap_usd;
    const realizedCap = data.data.marketcap.realized_marketcap_usd;

    // Calculate the NUPL (Net Unrealized Profit/Loss)
    const nupl = (marketCap - realizedCap) / marketCap;

    // Insert the calculated NUPL value into the div
    nuplValue.innerHTML = nupl.toFixed(3);

    // Apply the defined color to the element displaying the NUPL

  })
  .catch(error => {
    // If an error occurs, display a message and set NUPL value to "--"
    console.error(error);
    nuplValue.innerHTML = "--";
  });
