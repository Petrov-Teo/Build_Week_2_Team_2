document.addEventListener("DOMContentLoaded", () => {
    const query = "queen"; // Cambia questo valore per cercare un artista diverso
    const endpoint = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const artist = data.data[0].artist;
                const tracks = data.data;

                document.getElementById('artist-name').textContent = artist.name;

                // Imposta la "picture_big" dell'artista come sfondo dell'header
                const artistHeader = document.getElementById('artist-header');
                artistHeader.style.backgroundImage = `url(${artist.picture_big})`;

                const tracksList = document.getElementById('tracks-list');
                tracksList.innerHTML = '';
                tracks.slice(0, 5).forEach((track, index) => {
                    const trackItem = document.createElement('li');
                    trackItem.classList.add('d-flex', 'align-items-center', 'mb-3');
                    trackItem.innerHTML = `
                        <div class=" track-info d-flex align-items-center">
                            <img src="${track.album.cover}" alt="cover" class="img-thumbnail">
                            <div class="ml-3">
                                <h6 class="mb-0">${track.title}</h6>
                                <small>${track.artist.name}</small>
                            </div>
                        </div>
                        <div class=" track-duration">
                            <small>${Math.floor(track.duration / 60)}:${('0' + track.duration % 60).slice(-2)}</small>
                        </div>
                    `;
                    trackItem.addEventListener('click', () => {
                        document.querySelector('.player .cover-img').src = track.album.cover;
                        document.querySelector('.player h6').textContent = track.title;
                        document.querySelector('.player small').textContent = track.artist.name;
                        document.querySelector('.player').style.display = 'block';
                    });
                    
                    tracksList.appendChild(trackItem);
                });

                const likedSongsInfo = document.getElementById('liked-songs-info');
                likedSongsInfo.innerHTML = `
                    <img src="${artist.picture_medium}" alt="artist picture" class="img-thumbnail" style="width: 50px; height: 50px; border-radius: 50%;">
                    <div class="ml-3">
                        <p class="mb-0">Hai messo Mi piace a 11 brani</p>
                        <p class="mb-0">Di ${artist.name}</p>
                    </div>
                `;

            } else {
                console.error('No artist data found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

