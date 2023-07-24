// This script calculates and displays the time remaining until the next Bitcoin halving event.

function startClock(height) {
  const blockTime = 9.65;
  const halvingBlockHeight = 840000;
  const currentBlockHeight = height;
  const blocksUntilHalving = halvingBlockHeight - currentBlockHeight;
  const minutesUntilHalving = blocksUntilHalving * blockTime;
  const daysUntilHalving = Math.floor(minutesUntilHalving / (24 * 60));
  const yearsUntilHalving = Math.floor(daysUntilHalving / 365);
  const remainingDays = daysUntilHalving % 365;

  let halvingTimeText = "";
  if (yearsUntilHalving > 0) {
    halvingTimeText += yearsUntilHalving + " years, ";
  }
  halvingTimeText += remainingDays + " <span class=\"unit\">Days</span>";

  // Display the time remaining until halving on the page
  document.getElementById('halving-time').innerHTML = halvingTimeText;
}

// jQuery ready event to fetch the latest block height from an external API
jQuery(document).ready(function ($) {
  $.get("https://www.satochi.co/latest-block")
    .done((height) => {
      // Start the countdown clock based on the retrieved block height
      startClock(height);
    })
    .fail(() => {
      console.error("Error calling /latest-block");
    });
});
