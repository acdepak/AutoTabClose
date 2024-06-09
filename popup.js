document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("savedData") || "{}");
  if (savedData.time) {
    document.getElementById("timeInput").value = savedData.time;
    document.getElementById("displayTime").textContent = savedData.time;
  }
  if (savedData.url) {
    document.getElementById("urlInput").value = savedData.url;
  }
  displaySites();
});

function displaySites() {
  const sites = JSON.parse(localStorage.getItem("sitesList") || "[]");
  const listContainer = document.getElementById("sitesList");
  listContainer.innerHTML = ""; // Clear existing list
  sites.forEach((site, index) => {
    const siteElement = document.createElement("tr");
    siteElement.innerHTML = `
    <td class="hidden"><input type="hidden" id="editIndex" value=${index}></td>
    <td>${site.url}</td>
    <td>${site.time} min</td>
    <td class="text-blue-600 cursor-pointer">
      <div class="flex justify-center  items-center ">
        <svg
          class="w-5 h-5"
          viewBox="0 0 12 21"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          transform="rotate(45)"
        >
          <path d="M2 2v11M2 13h8M10 13v-11M2 2h8M2 13 6 19M10 13 6 19" />
        </svg>
      </div>
    </td>
    <td class="text-red-800 cursor-pointer ">
      <div class="flex items-center justify-center">
        <svg
          class="w-5 h-5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path d="m5.75 4.25v-2.5h4.5v2.5m-6.5 1v9h8.5v-9m-9.5-.5h10.5" />
        </svg>
      </div>
    </td>
    `;
    const editButton = siteElement.querySelector(".text-blue-600 div");
    const delButton = siteElement.querySelector(".text-red-800 div");

    editButton.addEventListener("click", () => editSite(index));
    delButton.addEventListener("click", () => deleteItem(index));

    listContainer.appendChild(siteElement);
  });
}

function addUrl() {
  // if (!index) {
  const url = document.getElementById("urlInput").value;
  const time = +document.getElementById("timeInput").value;
  const sites = JSON.parse(localStorage.getItem("sitesList") || "[]");

  sites.push({ url, time, active: true });
  localStorage.setItem("sitesList", JSON.stringify(sites));
  displaySites(); // Refresh the list display
  // } else {
  //   updateSite(index);
  // }
}

function checkVal() {
  const index = document.getElementById("editIndex").value;
  if (document.getElementById("addUrl").innerHTML === "Add") {
    addUrl;
  } else {
    updateSite(index);
  }
}

document.getElementById("addUrl").addEventListener("click", checkVal);
// document.getElementById("Update").addEventListener("click", updateSite(index));

function editSite(index) {
  const sites = JSON.parse(localStorage.getItem("sitesList") || "[]");
  document.getElementById("urlInput").value = sites[index].url;
  document.getElementById("timeInput").value = +sites[index].time;
  document.getElementById("editIndex").value = index;
  document.getElementById("addUrl").innerHTML = "Update";
}

function updateSite(index) {
  const sites = JSON.parse(localStorage.getItem("sitesList") || "[]");
  sites[index].url = document.getElementById("urlInput").value;
  sites[index].time = +document.getElementById("timeInput").value;

  localStorage.setItem("sitesList", JSON.stringify(sites));
  displaySites(); // Refresh the list display

  document.getElementById("Update").innerHTML = "Add";
  document.getElementById("editIndex").value = "";
  // document.getElementById("addUrl").onclick = addUrl;
}

function deleteItem(index) {
  let sites = JSON.parse(localStorage.getItem("sitesList") || "[]");
  sites.splice(index, 1); // Remove the site
  localStorage.setItem("sitesList", JSON.stringify(sites));
  displaySites();
}

// document.getElementById("startButton").addEventListener("click", () => {
//   const timeInSeconds = document.getElementById("timeInput").value;
//   const url = document.getElementById("urlInput").value;
//   const closeAfterMs = timeInSeconds * 1000;
//   const editIndex = document.getElementById("editIndex") ? document.getElementById("editIndex").value : -1;

//   const sites = JSON.parse(localStorage.getItem("sitesList") || "[]");
//   if (editIndex >= 0) {
//     sites[editIndex] = { url, time: closeAfterMs }; // Update existing
//   } else {
//     sites.push({ url, time: closeAfterMs }); // Add new
//   }
//   localStorage.setItem("sitesList", JSON.stringify(sites));
//   localStorage.setItem("savedData", JSON.stringify({ time: timeInSeconds, url }));

//   document.getElementById("displayTime").textContent = timeInSeconds;
//   displaySites(); // Refresh the list
// });
