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

  artistInfo.style.flex = "1";
  songsInfo.style.flex = "2";
  songsInfo.style.display = "flex";
  songsInfo.style.flexDirection = "column";
  songsInfo.style.flexWrap = "nowrap";

  const artist = tracks[0].artist;

  artistInfo.innerHTML = `
    <h2 style="color: white; text-align: center; margin-left: 1%;">Artist</h2>
    <div class="artist-card card border border-0 text-center" style="background-color: transparent;">
      <img src="${artist.picture_medium}" class="card-img-top rounded-circle" alt="${artist.name}">
      <div class="card-body">
        <div class="artist-header">
          <h5 class="card-title" style="color: white;">${artist.name}</h5> 
          <div class="dropdown song-card-dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton${artist.id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              &#x22EE;
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${artist.id}">
              <a class="dropdown-item" href="artist.html?id=${artist.id}" target="_blank">Go to artist page</a>
              <a class="dropdown-item" href="album.html?id=${tracks[0].album.id}" target="_blank">Go to album page</a>
            </div>
          </div>
        </div>
        <p class="card-text" style="color: white;">Number of tracks: ${tracks.length}</p>
      </div>
    </div>
  `;

  const songsTitle = document.createElement("h2");
  songsTitle.style.color = "white";
  songsTitle.style.textAlign = "start";
  songsTitle.style.marginLeft = "31%";
  songsTitle.textContent = "Songs";
  songsInfo.appendChild(songsTitle);

  tracks.forEach((track) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-card", "card", "card-title");
    songDiv.style.marginBottom = "10px";
    songDiv.style.marginLeft = "30%";
    songDiv.style.display = "flex";
    songDiv.style.alignItems = "flex-start";
    songDiv.innerHTML = `
      <div class="image-container">
        <img src="${track.album.cover_medium}" class="card-img-top" alt="${track.title}">
        <div class="play-button">&#9658;</div>
      </div>
      <div class="text-container" style="padding-left: 0px;">
        <h5 class="card-title">${track.title}</h5>
        <p class="card-text">Album: ${track.album.title}</p>
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
