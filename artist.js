document.addEventListener("DOMContentLoaded", function() {
    var query = "Queen"; // Cambia questo valore per cercare un artista diverso
    var endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query;

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

                // Imposta la "picture_big" dell'artista come sfondo dell'header
                var artistHeader = document.getElementById('artist-header');
                artistHeader.style.backgroundImage = "url(" + artist.picture_big + ")";

                var tracksList = document.getElementById('tracks-list');
                tracksList.innerHTML = '';
                tracks.slice(0, 5).forEach(function(track, index) {
                    var trackItem = document.createElement('li');
                    trackItem.classList.add('d-flex', 'align-items-center', 'mb-3');
                    trackItem.innerHTML = '<div class="track-info d-flex align-items-center">' +
                                            '<img src="' + track.album.cover + '" alt="cover" class="img-thumbnail">' +
                                            '<div class="ml-3">' +
                                                '<h6 class="mb-0">' + track.title + '</h6>' +
                                                '<small>' + track.artist.name + '</small>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="track-duration">' +
                                            '<small>' + Math.floor(track.duration / 60) + ':' + ('0' + track.duration % 60).slice(-2) + '</small>' +
                                        '</div>';
                    trackItem.addEventListener('click', function() {
                        currentTrack = track;
                        updatePlayer(track);
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
