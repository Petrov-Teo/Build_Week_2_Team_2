document.addEventListener("DOMContentLoaded", () => {
    const query = "queen"; // Cambia questo valore per cercare un artista diverso
    const endpoint = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const artist = data.data[0].artist;
            const tracks = data.data;

            document.getElementById('artist-name').textContent = artist.name;
            document.getElementById('monthly-listeners').textContent = `${artist.nb_fan} ascoltatori mensili`;

            const tracksList = document.getElementById('tracks-list');
            tracksList.innerHTML = '';
            tracks.slice(0, 5).forEach((track, index) => {
                const trackItem = document.createElement('li');
                trackItem.classList.add('d-flex', 'align-items-center', 'mb-3');
                trackItem.innerHTML = `
                    <img src="${track.album.cover}" alt="cover" class="img-thumbnail" style="width: 50px;">
                    <div class="ml-3">
                        <h6 class="mb-0">${track.title}</h6>
                        <small>${track.artist.name}</small>
                    </div>
                    <div class="ml-auto">
                        <small>${track.duration} secondi</small>
                    </div>
                `;
                tracksList.appendChild(trackItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

