browser.tabs.onCreated.addListener((tab) => {
  setTimeout(() => {
    browser.tabs.remove(tab.id);
  }, 5000); // Set the delay as needed
});
