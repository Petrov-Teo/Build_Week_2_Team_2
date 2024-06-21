const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

console.log(id);

document.addEventListener("DOMContentLoaded", function () {
  function getRandomTrackPlays() {
    return Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000;
  }

  const tracksList = document.getElementById("tracks-list");
  const pageTitle = document.querySelector("title");

  fetch(URL + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (objArtist) {
      console.log("objArtist", objArtist);
      if (objArtist) {
        const artist = objArtist;
        const audioPlayer = document.getElementById("audio-player");
        const playPauseButton = document.getElementById("play-pause");
        let currentTrack = null;

        const likedSongsInfo = document.getElementById("liked-songs-info");
        likedSongsInfo.innerHTML =
          '<img src="' +
          artist.picture_medium +
          '" alt="artist picture" class="img-thumbnail" style="width: 50px; height: 50px; border-radius: 50%;">' +
          '<div class="ml-3">' +
          '<p class="mb-0">Hai messo Mi piace a 11 brani</p>' +
          '<p class="mb-0">Di ' +
          artist.name +
          "</p>" +
          "</div>";

        document.getElementById("artist-name").innerText = artist.name;
        document.getElementById("monthly-listeners").innerText = `${artist.nb_fan.toLocaleString()} ascoltatori mensili`;

        const artistHeader = document.getElementById("artist-header");
        artistHeader.style.backgroundImage = `url(${artist.picture_xl})`;

        const tracksList = document.getElementById("tracks-list");
        tracksList.innerHTML = "";

        const artistTracklist = artist.tracklist;

        pageTitle.innerText = `${artist.name} | Spotify`;

        fetch(artistTracklist)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Couldn't get data");
            }
          })
          .then(arrayCanzoni => {
            console.log(arrayCanzoni);
            const top10Songs = arrayCanzoni.data.slice(0, 10);
            console.log("top 10", top10Songs);
            top10Songs.forEach((song, index) => {
              const top10SongContainer = document.createElement("div");
              top10SongContainer.className = "d-flex justify-content-between align-items-center mb-3";
              const top10SongLeftContainer = document.createElement("div");
              top10SongLeftContainer.className = "d-flex align-items-center";
              const top10SongRank = document.createElement("p");
              top10SongRank.innerText = index + 1;
              top10SongRank.className = "me-3";
              const top10SongImg = document.createElement("img");
              top10SongImg.style.width = "75px";
              top10SongImg.src = song.album.cover_medium;
              top10SongImg.className = "me-3";
              const top10SongTitle = document.createElement("p");
              top10SongTitle.innerText = song.title;
              top10SongLeftContainer.append(top10SongRank, top10SongImg, top10SongTitle);

              const top10SongDuration = document.createElement("p");
              top10SongDuration.innerText = `${Math.floor(song.duration / 60)}:${song.duration % 60}`;
              top10SongContainer.append(top10SongLeftContainer, top10SongDuration);
              tracksList.append(top10SongContainer);

              top10SongContainer.addEventListener("click", function () {
                if (currentTrack === song) {
                  if (!audioPlayer.paused) {
                    audioPlayer.pause();
                    playPauseButton.innerHTML = getPlayIcon();
                  } else {
                    audioPlayer.play();
                    playPauseButton.innerHTML = getPauseIcon();
                  }
                } else {
                  currentTrack = song;
                  updatePlayer(song);
                }
              });
            });
          });

        playPauseButton.addEventListener("click", function () {
          if (currentTrack) {
            if (audioPlayer.paused) {
              audioPlayer.play();
              playPauseButton.innerHTML = getPauseIcon();
              updateProgressBar();
            } else {
              audioPlayer.pause();
              playPauseButton.innerHTML = getPlayIcon();
              updateProgressBar();
            }
          }
        });

        function updatePlayer(song) {
          document.querySelector(".player-cover").src = song.album.cover;
          document.querySelector(".player-title").textContent = song.title;
          document.querySelector(".player-artist").textContent = song.artist.name;
          audioPlayer.src = song.preview;
          audioPlayer.play();
          playPauseButton.innerHTML = getPauseIcon();
          document.querySelector("footer").style.display = "flex";
          updateProgressBar(); // Inizia a aggiornare la barra di progresso
        }

        function updateProgressBar() {
          const songBar = document.getElementById("songBar");
          const currentTimeLabel = document.getElementById("current-time");
          const totalTimeLabel = document.getElementById("total-time");
          /* songBar.style.width = 0; */
          const duration = 30; // Durata in secondi della preview
          totalTimeLabel.innerText = "0:30"; // Imposta la durata totale

          var interval = setInterval(function () {
            if (audioPlayer.paused || audioPlayer.currentTime >= duration) {
              clearInterval(interval);
              playPauseButton.innerHTML = getPlayIcon();
            } else {
              songBar.style.width = `${(audioPlayer.currentTime / 30) * 100}%`;
              currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
            }
          }, 300);
        }

        function formatTime(seconds) {
          var minutes = Math.floor(seconds / 60);
          var seconds = Math.floor(seconds % 60);
          return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }

        function getPlayIcon() {
          return (
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-play-fill" viewBox="2 2 12 12">' +
            '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>' +
            "</svg>"
          );
        }

        function getPauseIcon() {
          return (
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pause-fill" viewBox="2 2 12 12">' +
            '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>' +
            "</svg>"
          );
        }

        const volumeSlider = document.getElementById("volumeSlider");
        volumeSlider.addEventListener("change", event => {
          audioPlayer.volume = event.currentTarget.value / 100;
        });
      } else {
        console.error("No artist data found");
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
});

const activities = document.getElementById("activities");
const hideActivitiesBtn = document.getElementById("hideActivitiesBtn");
const showActivitiesBtn = document.getElementById("showActivitiesBtn");

hideActivitiesBtn.addEventListener("click", () => {
  activities.classList.remove("d-lg-block");
});

showActivitiesBtn.addEventListener("click", () => {
  activities.classList.toggle("d-lg-block");
});
