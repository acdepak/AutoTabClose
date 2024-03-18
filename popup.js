document.addEventListener("DOMContentLoaded", () => {
  const savedTime = localStorage.getItem("savedTime");
  if (savedTime) {
    document.getElementById("timeInput").value = savedTime;
    document.getElementById("displayTime").textContent = savedTime;
  }
});

document.getElementById("startButton").addEventListener("click", () => {
  const timeInSeconds = document.getElementById("timeInput").value;
  localStorage.setItem("savedTime", timeInSeconds); // Save the time
  document.getElementById("displayTime").textContent = timeInSeconds;
  const closeAfterMs = timeInSeconds * 1000;
  browser.runtime.sendMessage({ closeAfterMs });
});
