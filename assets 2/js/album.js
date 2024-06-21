document.addEventListener("DOMContentLoaded", function () {
  const cl = function (cl) {
    console.log(cl);
  };
  //   DOM SELECTION
  const imgAlbum = document.getElementById("imgAlbum");
  const albumName = document.getElementById("titoloAlbum");
  const imgArtist = document.getElementById("imgArtist");
  const artistName = document.getElementById("nomeArtistaAlbum");
  const albumYear = document.getElementById("albumYear");
  const numberSongsAlbum = document.getElementById("numberSongs");
  const albumLength = document.getElementById("albumLength");
  const elencoBraniAlbum = document.querySelector(".elencoBraniAlbum");
  const imgFooter = document.getElementById("imgFooter");
  const imgAlbumMobile = document.getElementById("imgAlbumMobile");

  cl(treeeDotsVertical);

  // URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const serverURL = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

  fetch(serverURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (album) {
      albumName.innerText = album.title;
      artistName.innerText = album.artist.name;

      imgAlbum.src = album.cover_big;

      imgArtist.src = album.artist.picture_xl;
      imgFooter.src = album.cover_big;
      artistName.innerText = album.artist.name;
      numberSongsAlbum.innerText = `${album.nb_tracks} brani`;
      albumYear.innerText = album.release_date.substring(0, 4);
      albumLength.innerText = `${Math.floor(album.duration / 60)} min ${album.duration % 60} sec.`;
      imgAlbumMobile.src = album.cover_big;

      cl(album);

      const tracklist = album.tracks.data;
      tracklist.forEach((canzone, index) => {
        // creo il contenitore
        const songContainer = document.createElement("div");
        songContainer.className = "container pt-3 ps-3";

        // creo la row
        const songContainerRow = document.createElement("div");
        songContainerRow.className = "row d-flex align-items-center";

        // creo il contenitore del numero di canzone
        const albumNumberSong = document.createElement("div");
        albumNumberSong.className = "col-1 text-center textColor";
        albumNumberSong.innerText = index + 1;

        // creo nome canzone e nome artista
        const songDetails = document.createElement("div");
        songDetails.className = "col-11 col-md-6";
        const songName = document.createElement("p");
        songName.className = "mb-0";
        songName.innerText = canzone.title;
        const artistName = document.createElement("small");
        artistName.className = "textColor";
        artistName.innerText = canzone.artist.name;
        songDetails.append(songName, artistName);

        // creo il numero di riproduzioni
        const riproduzioni = document.createElement("div");
        riproduzioni.className = "d-none d-md-block col-md-3 text-end textColor";
        riproduzioni.innerText = canzone.rank.toLocaleString();

        // creo la durata della canzone
        const durata = document.createElement("div");
        durata.className = "d-none d-md-block col-md-2 text-center ps-3 textColor";
        durata.innerText = `${Math.floor(canzone.duration / 60)}:${canzone.duration % 60}`;

        songContainerRow.append(albumNumberSong, songDetails, riproduzioni, durata);
        cl(canzone);
        songContainer.appendChild(songContainerRow);
        elencoBraniAlbum.appendChild(songContainer);
      });
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
