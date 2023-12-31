// This script fetches news data from an API, extracts relevant information, and displays it on the page.

document.addEventListener('DOMContentLoaded', function () {
  var feedContent = document.getElementById('feed-content');
  var newsCounter = 3; // Initially, three news items are displayed

  // Making an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://server-proxy-bitcoinnews-juliospn.vercel.app/feed', true);
  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);

      // Get all news items from the "item" array (assuming the array is in descending order of date)
      var allItems = response.rss.channel.item;

      // Function to check if an image exists
      async function checkImageExistence(url) {
        return new Promise((resolve, reject) => {
          var img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      }

      // Map the items to extract desired information
      extractedItems = await Promise.all(allItems.map(async function (item) {
        // ...
        // Corretamente obter a URL da imagem em miniatura
        var thumbnailMatch = item["content:encoded"]._cdata.match(/src="([^"]+)"/);
        var thumbnail = thumbnailMatch ? thumbnailMatch[1] : '';

        // Verificar se a imagem com o sufixo -300x169.jpg existe
        var thumbnailSize = '-300x169.jpg';
        var selectedThumbnail = thumbnail.replace(/\.[^.]+$/, thumbnailSize);

        // Verificar se a imagem existe, senão usar a thumbnail com .jpg
        try {
          await checkImageExistence(selectedThumbnail);
        } catch {
          // Imagem não encontrada, usar a thumbnail com .jpg
          console.log('Image "-300x169.jpg" not found, so we used this:', thumbnail);
          selectedThumbnail = thumbnail.replace(/\.[^.]+$/, '.jpg');
        }

        return {
          title: item.title._text,
          link: item.link._text,
          pubDate: item.pubDate._text,
          creator: item["dc:creator"]._cdata,
          description: item.description._cdata,
          thumbnail: selectedThumbnail
        };
      }));

      // Build the HTML for the posts
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

      // Display the content in the div
      feedContent.innerHTML = html;

      // Check if there are more news items available
      if (newsCounter < extractedItems.length) {
        document.querySelector('.loadMore button').style.display = 'inline';
      } else {
        document.querySelector('.loadMore button').style.display = 'none';
      }
    }
  };

  xhr.send();

  // Function to calculate time difference
  function getTimeDifference(pubDate) {
    var currentDate = new Date();
    var postDate = new Date(pubDate);
    var timeDifference = Math.abs(currentDate - postDate);
    var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Changed to floor instead of round

    if (hoursDifference >= 24) {
      var daysDifference = Math.floor(hoursDifference / 24);
      var remainingHours = hoursDifference % 24;
      if (remainingHours > 0) {
        return daysDifference + 'd ' + remainingHours + ' hours';
      } else {
        return daysDifference + 'd ago';
      }
    } else if (hoursDifference >= 1) { // Check if the difference is greater than or equal to 1 hour
      return hoursDifference + ' hours';
    } else {
      var minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Calculate difference in minutes
      return minutesDifference + ' minutes';
    }
  }

  // Load more button event listener
  document.querySelector('.loadMore button').addEventListener('click', function () {
    newsCounter += 3; // Increase the counter by 3 to display more news

    // Build the HTML for the posts with the additional news
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

    // Display the updated content in the div
    feedContent.innerHTML = html;

    // Check if there are more news items available
    if (newsCounter >= extractedItems.length) {
      document.querySelector('.loadMore button').style.display = 'none';
    }
  });
});
