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
  const totalAlbumDuration = document.getElementById("albumLength");
  const numberSong = document.getElementById("numberSong");
  const titleSong = document.getElementById("titleSong");
  const reproductions = document.getElementById("reproductions");
  const durationTime = document.getElementById("durationTime");
  const albumLength = document.getElementById("albumLength");
  const elencoBraniAlbum = document.querySelector(".elencoBraniAlbum");

  // URL
  const query = "423368";
  const serverURL = "https://striveschool-api.herokuapp.com/api/deezer/album/" + query;

  fetch(serverURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (album) {
      albumName.innerText = album.title;
      artistName.innerText = album.artist.name;
      /* const songsAlbum = data.data; */
      console.log(album);

      cl(albumName);
      /* cl(songsAlbum); */
      /* cl(artist); */

      imgAlbum.src = album.cover_big;
      /* albumName.innerText = albumN.title; */
      imgArtist.src = album.artist.picture_xl;
      artistName.innerText = album.artist.name;
      numberSongsAlbum.innerText = `${album.nb_tracks} brani`;
      albumYear.innerText = album.release_date.substring(0, 4);
      albumLength.innerText = `${Math.floor(album.duration / 60)} min ${album.duration % 60} sec.`;

      cl(albumName);

      const tracklist = album.tracks.data;
      tracklist.forEach((canzone, index) => {
        // creo il contenitore
        const songContainer = document.createElement("div");
        songContainer.className = "container pt-3";

        // creo la row
        const songContainerRow = document.createElement("div");
        songContainerRow.className = "row d-flex align-items-center";

        // creo il contenitore del numero di canzone
        const albumNumberSong = document.createElement("div");
        albumNumberSong.className = "col-1 text-center textColor";
        albumNumberSong.innerText = index + 1;

        // creo nome canzone e nome artista
        const songDetails = document.createElement("div");
        songDetails.className = "col-6";
        const songName = document.createElement("p");
        songName.innerText = canzone.title;
        const artistName = document.createElement("small");
        artistName.innerText = canzone.artist.name;
        songDetails.append(songName, artistName);

        // creo il numero di riproduzioni
        const riproduzioni = document.createElement("div");
        riproduzioni.className = "col-3 text-end textColor";
        riproduzioni.innerText = canzone.rank;

        // creo la durata della canzone
        const durata = document.createElement("div");
        durata.className = "col-2 text-center ps-3 textColor";
        durata.innerText = `${Math.floor(canzone.duration / 60)}:${canzone.duration % 60}`;

        songContainerRow.append(albumNumberSong, songDetails, riproduzioni, durata);
        songContainer.appendChild(songContainerRow);
        elencoBraniAlbum.appendChild(songContainer);
      });

      //   imgAlbum.src = album.cover_medium;
      //   albumName.textContent = album.title;
      //   artistName.textContent = album.artist.name;
      //   albumYear.textContent = new Date(album.release_date).getFullYear();
      //   numberSongsAlbum.textContent = tracks.length;
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
