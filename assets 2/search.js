const apiKey = "283b2ef6c5msha650b13812608b0p174f2fjsn2d49a13a9160";

document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  hideStaticCards();
  searchDeezer(query);
});

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const query = event.target.value;
      hideStaticCards();
      searchDeezer(query);
    }
  });

function hideStaticCards() {
  document.querySelectorAll(".static-card").forEach((card) => {
    card.style.display = "none";
  });

  const browseAll = document.getElementById("browse-all");
  if (browseAll) {
    browseAll.style.display = "none";
  }
}

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
  const resultsDiv = document.getElementById("results");

  resultsDiv.style.display = "flex";
  resultsDiv.style.flexWrap = "wrap";
  resultsDiv.innerHTML = "";

  const tracks = data.data;

  if (tracks.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  const artistInfo = document.createElement("div");
  const songsInfo = document.createElement("div");

  artistInfo.id = "artist-info";
  songsInfo.id = "songs-info";

  artistInfo.classList.add("artist-info");
  songsInfo.classList.add("songs-info");

  const artist = tracks[0].artist;

  artistInfo.innerHTML = `
    <div class="artist-card card text-bg-dark">
      <img src="${artist.picture_medium}" class="card-img-top" alt="${artist.name}">
      <div class="card-body">
        <h5 class="card-title">${artist.name}</h5>
        <p class="card-text">Number of tracks: ${tracks.length}</p>
      </div>
    </div>
  `;

  tracks.forEach((track) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-card", "card", "text-bg-dark");
    songDiv.innerHTML = `
      <div class="image-container">
        <img src="${track.album.cover_medium}" class="card-img-top" alt="${track.title}">
        <div class="dropdown song-card-dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton${track.id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            &#x22EE;
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${track.id}">
            <a class="dropdown-item" href="artist.html?id=${track.artist.id}" target="_blank">Go to artist page</a>
            <a class="dropdown-item" href="album.html?id=${track.album.id}" target="_blank">Go to album page</a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${track.title}</h5>
        <p class="card-text">Album: ${track.album.title}</p>
        <a href="${track.link}" class="btn btn-primary" target="_blank">Listen on Deezer</a>
      </div>
    `;
    songsInfo.appendChild(songDiv);
  });

  resultsDiv.appendChild(artistInfo);
  resultsDiv.appendChild(songsInfo);
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
