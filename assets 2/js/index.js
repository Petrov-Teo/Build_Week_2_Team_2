const annunci = document.getElementById("annunci");
const nascondiAnnunciBtn = document.getElementById("nascondiAnnunciBtn");

nascondiAnnunciBtn.addEventListener("click", () => {
  annunci.remove();
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

window.addEventListener("DOMContentLoaded", () => {
  const annunciImg = document.getElementById("annunciImg");
  const annunciTypeOfRecord = document.getElementById("annunciTypeOfRecord");
  const annunciTitle = document.getElementById("annunciTitle");
  const annunciArtist = document.getElementById("annunciArtist");
  const annunciDescription = document.getElementById("annunciDescription");
  const annunciPlayBtn = document.getElementById("annunciPlayBtn");
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause");
  const mobilePlayerImg = document.getElementById("mobilePlayerImg");
  const mobilePlayerTitle = document.getElementById("mobilePlayerTitle");
  const mobilePlayerBtn = document.getElementById("mobilePlayerBtn");

  fetch("https://striveschool-api.herokuapp.com/api/deezer/track/114811546")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Couldn't get data");
      }
    })
    .then(canzone => {
      console.log(canzone);
      annunciImg.src = canzone.album.cover_big;
      annunciTypeOfRecord.innerText = canzone.type.toUpperCase();
      annunciTitle.innerText = canzone.title;
      annunciArtist.innerText = canzone.artist.name;
      annunciDescription.innerText = "Get rickrolled!";
      let currentTrack = null;

      annunciPlayBtn.addEventListener("click", () => {
        if (currentTrack === canzone) {
          if (!audioPlayer.paused) {
            audioPlayer.pause();
            playPauseButton.innerHTML = getPlayIcon();
          } else {
            audioPlayer.play();
            playPauseButton.innerHTML = getPauseIcon();
          }
        } else {
          currentTrack = canzone;
          updatePlayer(canzone);
        }
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

      mobilePlayerBtn.addEventListener("click", function () {
        if (currentTrack) {
          if (audioPlayer.paused) {
            audioPlayer.play();
            mobilePlayerBtn.innerHTML = getPauseIconMobile();
            updateProgressBar();
          } else {
            audioPlayer.pause();
            mobilePlayerBtn.innerHTML = getPlayIconMobile();
            updateProgressBar();
          }
        }
      });

      function updatePlayer(canzone) {
        document.querySelector(".player-cover").src = canzone.album.cover;
        document.querySelector(".player-title").innerText = canzone.title;
        document.querySelector(".player-artist").innerText = canzone.artist.name;
        audioPlayer.src = canzone.preview;
        mobilePlayerImg.src = canzone.album.cover;
        mobilePlayerTitle.innerText = canzone.title;
        audioPlayer.play();
        playPauseButton.innerHTML = getPauseIcon();
        mobilePlayerBtn.innerHTML = getPauseIconMobile();
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

        const interval = setInterval(function () {
          if (audioPlayer.paused || audioPlayer.currentTime >= duration) {
            clearInterval(interval);
            playPauseButton.innerHTML = getPlayIcon();
          } else {
            songBar.style.width = `${(audioPlayer.currentTime / 30) * 100}%`;
            currentTimeLabel.innerText = formatTime(audioPlayer.currentTime);
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

      function getPlayIconMobile() {
        return (
          '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" width="25" height="25" fill="#ffffff">' +
          '<path d=" M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>' +
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

      function getPauseIconMobile() {
        return (
          '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" class="bi bi-pause-fill" viewBox="2 2 12 12">' +
          '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>' +
          "</svg>"
        );
      }

      const volumeSlider = document.getElementById("volumeSlider");
      volumeSlider.addEventListener("change", event => {
        audioPlayer.volume = event.currentTarget.value / 100;
      });
    });
});
