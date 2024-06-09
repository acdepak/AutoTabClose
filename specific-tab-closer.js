let defaultCloseAfterMs = 3000;
let urlToClose = "youtube.com";

browser.runtime.onMessage.addListener((message) => {
  if (message.closeAfterMs) {
    defaultCloseAfterMs = message.closeAfterMs;
  }
  if (message.url) {
    urlToClose = message.url;
  }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log(`Updated Tab ID: ${tabId}, URL: ${tab.url}, Status: ${changeInfo.status}`);

  if (changeInfo.status === "complete" && tab.url && tab.url.includes(urlToClose)) {
    // console.log('tab.url.includes("youtube.com")', tab.url.includes("youtube.com"));

    setTimeout(() => {
      browser.tabs.remove(tabId);
    }, defaultCloseAfterMs);
  }
  // else {
  //   console.log('tab.url.includes("youtube.com")', tab.url.includes("youtube.com"));
  // }
});
