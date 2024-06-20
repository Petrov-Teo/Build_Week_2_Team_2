const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

console.log(id);

document.addEventListener("DOMContentLoaded", function () {
  var query = "Empire of the sun";
  var endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + query;

  fetch(URL + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      if (data /* && data.data && data.data.length > 0 */) {
        var artist = data;
        var tracks = data.data;
        var audioPlayer = document.getElementById("audio-player");
        var playPauseButton = document.getElementById("play-pause");
        var currentTrack = null;

        var likedSongsInfo = document.getElementById("liked-songs-info");
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

        document.getElementById("artist-name").textContent = artist.name;
        document.getElementById("monthly-listeners").textContent = `${artist.nb_fan.toLocaleString()} ascoltatori mensili`;

        const artistHeader = document.getElementById("artist-header");
        artistHeader.style.backgroundImage = "url(" + artist.picture_xl + ")";

        trackItem.addEventListener("click", function () {
          if (currentTrack === track) {
            if (!audioPlayer.paused) {
              audioPlayer.pause();
              playPauseButton.innerHTML = getPlayIcon();
            } else {
              audioPlayer.play();
              playPauseButton.innerHTML = getPauseIcon();
            }
          } else {
            currentTrack = track;
            updatePlayer(track);
          }
        });

        tracksList.appendChild(trackItem);
        playPauseButton.addEventListener("click", function () {
          if (currentTrack) {
            if (audioPlayer.paused) {
              audioPlayer.play();
              playPauseButton.innerHTML = getPauseIcon();
            } else {
              audioPlayer.pause();
              playPauseButton.innerHTML = getPlayIcon();
            }
          }
        });

        function updatePlayer(track) {
          document.querySelector(".player-cover").src = track.album.cover;
          document.querySelector(".player-title").textContent = track.title;
          document.querySelector(".player-artist").textContent = track.artist.name;
          audioPlayer.src = track.preview;
          audioPlayer.play();
          playPauseButton.innerHTML = getPauseIcon();
          document.querySelector("footer").style.display = "flex";
          updateProgressBar(); // Inizia a aggiornare la barra di progresso
        }

        function updateProgressBar() {
          var progressBar = document.getElementById("progressBarSong");
          var currentTimeLabel = document.getElementById("current-time");
          var totalTimeLabel = document.getElementById("total-time");
          progressBar.value = 0;
          var duration = 30; // Durata in secondi della preview
          totalTimeLabel.textContent = "0:30"; // Imposta la durata totale

          var interval = setInterval(function () {
            if (audioPlayer.paused || audioPlayer.currentTime >= duration) {
              clearInterval(interval);
            } else {
              progressBar.value = audioPlayer.currentTime;
              currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
            }
          }, 1000);
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

const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("change", event => {
  audio.volume = event.currentTarget.value / 100;
});
