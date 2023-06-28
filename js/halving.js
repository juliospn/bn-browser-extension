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
    halvingTimeText += remainingDays + " days";
  
    document.getElementById('halving-time').textContent = halvingTimeText;
  }
  
  jQuery(document).ready(function ($) {
    $.get("https://www.satochi.co/latest-block")
      .done((height) => {
        startClock(height);
      })
      .fail(() => {
        console.error("Error calling /latest-block");
      });
  });
  