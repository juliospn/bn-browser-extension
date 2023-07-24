// Show the loading spinner element
document.getElementById('loading-spinner').style.display = 'block';

// Hide the content of the feed
document.getElementById('feed-content').style.display = 'none';

// Load the RSS feed content
loadRSSFeed(function() {
  // Callback function executed after the RSS feed is loaded

  // Hide the loading spinner element
  document.getElementById('loading-spinner').style.display = 'none';

  // Show the content of the feed
  document.getElementById('feed-content').style.display = 'block';
});

function loadRSSFeed(callback) {
  // Simulate loading the RSS feed (fictional loading time of 3 seconds)
  setTimeout(function() {
    // After the fictional loading time, call the callback
    callback();
  }, 3000);
}
