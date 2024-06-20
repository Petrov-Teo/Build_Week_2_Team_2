
document.addEventListener("DOMContentLoaded", function() {
    var query = "Empire of the sun";
    var endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query;

    function getRandomListeners() {
        return Math.floor(Math.random() * (20000000 - 1000000 + 1)) + 1000000;
    }

    function getRandomTrackPlays() {
        return Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000;
    }


    fetch(endpoint)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data && data.data && data.data.length > 0) {
                var artist = data.data[0].artist;
                var tracks = data.data;
                var audioPlayer = document.getElementById('audio-player');
                var playPauseButton = document.getElementById('play-pause');
                var currentTrack = null;

                var likedSongsInfo = document.getElementById('liked-songs-info');
                likedSongsInfo.innerHTML = '<img src="' + artist.picture_medium + '" alt="artist picture" class="img-thumbnail" style="width: 50px; height: 50px; border-radius: 50%;">' +
                                            '<div class="ml-3">' +
                                                '<p class="mb-0">Hai messo Mi piace a 11 brani</p>' +
                                                '<p class="mb-0">Di ' + artist.name + '</p>' +
                                            '</div>';

                document.getElementById('artist-name').textContent = artist.name;
                document.getElementById('monthly-listeners').textContent = getRandomListeners().toLocaleString() + " ascoltatori mensili";


                // Imposta la "picture_big" dell'artista come sfondo dell'header
                var artistHeader = document.getElementById('artist-header');
                artistHeader.style.backgroundImage = "url(" + artist.picture_big + ")";

                var tracksList = document.getElementById('tracks-list');
                tracksList.innerHTML = '';
                tracks.slice(0, 5).forEach(function(track, index) {
                    var trackItem = document.createElement('li');
                    var randomPlays = getRandomTrackPlays();
                    trackItem.classList.add('d-flex', 'align-items-center', 'mb-3');
                    trackItem.innerHTML = '<div class="col-6 track-info d-flex align-items-center">' +
                                            '<img src="' + track.album.cover + '" alt="cover" class="img-thumbnail">' +
                                            '<div class="ml-3">' +
                                                '<h6 class="mb-0">' + track.title + '</h6>' +
                                                '<small>' + track.artist.name + '</small>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-3 track-plays text-center">' +
                                            '<small>' + randomPlays.toLocaleString() + ' ascolti</small>' +
                                        '</div>' +
                                        '<div class="col-3 track-duration text-right">' +
                                            '<small>' + Math.floor(track.duration / 60) + ':' + ('0' + track.duration % 60).slice(-2) + '</small>' +
                                        '</div>';

                    trackItem.addEventListener('click', function() {
                        if (currentTrack === track) {
                            // Se il brano è lo stesso, ferma la riproduzione
                        if (!audioPlayer.paused) {
                            audioPlayer.pause();
                            playPauseButton.innerHTML = getPlayIcon();  // Cambia icona a play
                         } else {
                            audioPlayer.play();
                            playPauseButton.innerHTML = getPauseIcon();  // Cambia icona a pausa
                            }
                        } else {
                            currentTrack = track;
                            updatePlayer(track);
                         }
                        });

                    tracksList.appendChild(trackItem);
                });

                function updatePlayer(track) {
                    document.querySelector('.player-cover').src = track.album.cover;
                    document.querySelector('.player-title').textContent = track.title;
                    document.querySelector('.player-artist').textContent = track.artist.name;
                    audioPlayer.src = track.preview;  // Imposta l'anteprima audio come sorgente
                    audioPlayer.play();  // Riproduce l'audio
                    document.querySelector('footer').style.display = 'flex';
                }

            } else {
                console.error('No artist data found');
            }
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
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

