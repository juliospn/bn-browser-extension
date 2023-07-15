// Mostrar o elemento de carregamento
document.getElementById('loading-spinner').style.display = 'block';

// Ocultar o conteúdo do feed
document.getElementById('feed-content').style.display = 'none';

// Carregar o conteúdo do feed RSS
carregarFeedRSS(function() {
  // Callback que é executado após o carregamento do feed RSS

  // Ocultar o elemento de carregamento
  document.getElementById('loading-spinner').style.display = 'none';

  // Exibir o conteúdo do feed
  document.getElementById('feed-content').style.display = 'block';
});

function carregarFeedRSS(callback) {
  // Simulação de carregamento do feed RSS (tempo fictício de 3 segundos)
  setTimeout(function() {
    // Após o tempo de carregamento fictício, chame o callback
    callback();
  }, 3000);
}
