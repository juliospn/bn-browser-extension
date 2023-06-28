document.addEventListener('DOMContentLoaded', function () {
  var feedContent = document.getElementById('feed-content');
  var newsCounter = 3; // Inicialmente, três notícias já estão sendo exibidas
  var extractedItems; // Declaração da variável no escopo global

  // Fazer a solicitação HTTP
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://server-proxy-bitcoinnews-juliospn.vercel.app/feed', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);

      // Obter todas as notícias do array "item" (considerando que o array esteja em ordem decrescente de data)
      var allItems = response.rss.channel.item;

      // Mapear os itens para extrair as informações desejadas
      extractedItems = allItems.map(function (item) {
        return {
          title: item.title._text,
          link: item.link._text,
          pubDate: item.pubDate._text,
          creator: item["dc:creator"]._cdata,
          description: item.description._cdata,
          thumbnail: item["content:encoded"]._cdata.match(/src="([^"]+)"/)[1].replace(".jpg", "-300x169.jpg")
        };
      });

      // Construir o HTML dos posts
      var html = '<div class="posts">';
      extractedItems.slice(0, newsCounter).forEach(function (item) {
        html += '<div class="single-post">';
        html += '<div><a href="' + item.link + '" rel="noreferrer" target="_blank"><img src="' + item.thumbnail + '" alt="Post Thumbnail"></a></div>';
        html += '<div class="posts-title">';
        html += '<h2><a href="' + item.link + '" rel="noreferrer" target="_blank">' + item.title + '</a></h2>';
        html += '<span><time datetime="' + item.pubDate + '" title="' + item.pubDate + '">' + getTimeDifference(item.pubDate) + ' ago</time> | ' + item.creator + '</span>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';

      // Exibir o conteúdo na div
      feedContent.innerHTML = html;

      // Verificar se há mais notícias disponíveis
      if (newsCounter < extractedItems.length) {
        document.querySelector('.loadMore button').style.display = 'inline';
      } else {
        document.querySelector('.loadMore button').style.display = 'none';
      }
    }
  };

  xhr.send();

  // Função para calcular a diferença de tempo
  function getTimeDifference(pubDate) {
    var currentDate = new Date();
    var postDate = new Date(pubDate);
    var timeDifference = Math.abs(currentDate - postDate);
    var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Alterado para floor em vez de round
  
    if (hoursDifference >= 24) {
      var daysDifference = Math.floor(hoursDifference / 24);
      var remainingHours = hoursDifference % 24;
      if (remainingHours > 0) {
        return daysDifference + 'd ' + remainingHours + ' hours';
      } else {
        return daysDifference + 'd ago';
      }
    } else if (hoursDifference >= 1) { // Verifica se a diferença é maior ou igual a 1 hora
      return hoursDifference + ' hours';
    } else {
      var minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Calcula a diferença em minutos
      return minutesDifference + ' minutes';
    }
  }
  


  document.querySelector('.loadMore button').addEventListener('click', function () {
    newsCounter += 3; // Aumenta o contador em 3 para exibir mais notícias

    // Construir o HTML dos posts com as notícias adicionais
    var html = '<div class="posts">';
    extractedItems.slice(0, newsCounter).forEach(function (item) {
      html += '<div class="single-post">';
      html += '<div><a href="' + item.link + '" rel="noreferrer" target="_blank"><img src="' + item.thumbnail + '" alt="Post Thumbnail"></a></div>';
      html += '<div class="posts-title">';
      html += '<h2><a href="' + item.link + '" rel="noreferrer" target="_blank">' + item.title + '</a></h2>';
      html += '<span><time datetime="' + item.pubDate + '" title="' + item.pubDate + '">' + getTimeDifference(item.pubDate) + ' ago</time> | ' + item.creator + '</span>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Exibir o conteúdo atualizado na div
    feedContent.innerHTML = html;

    // Verificar se há mais notícias disponíveis
    if (newsCounter >= extractedItems.length) {
      document.querySelector('.loadMore button').style.display = 'none';
    }
  });
});
