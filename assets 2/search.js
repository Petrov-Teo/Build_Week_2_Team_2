const apiKey = "283b2ef6c5msha650b13812608b0p174f2fjsn2d49a13a9160";

document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  searchDeezer(query);
});

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const query = event.target.value;
      searchDeezer(query);
    }
  });

function searchDeezer(query) {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => console.error("Error:", error));
}

function displayResults(data) {
  const staticCardsDiv = document.getElementById("static-cards");
  const resultsDiv = document.getElementById("results");

  staticCardsDiv.style.display = "none";
  resultsDiv.style.display = "flex";
  resultsDiv.innerHTML = "";

  const tracks = data.data;
  tracks.forEach((track) => {
    const resultCard = `
      <div class="card text-bg-dark">
        <img src="${track.album.cover_medium}" class="card-img-top" alt="${track.title}">
        <div class="card-body">
          <h5 class="card-title">${track.title}</h5>
          <p class="card-text">Artist: ${track.artist.name}</p>
          <p class="card-text">Album: ${track.album.title}</p>
          <a href="${track.link}" class="btn btn-primary" target="_blank">Listen on Deezer</a>
        </div>
      </div>
    `;
    resultsDiv.innerHTML += resultCard;
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.querySelectorAll(".static-card").forEach((card) => {
  card.style.backgroundColor = getRandomColor();
});
