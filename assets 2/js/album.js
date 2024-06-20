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

  // URL
  const query = "Yellowcard";
  const serverURL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query;

  fetch(serverURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const albumN = data.data[0].album;
      const artist = data.data[1].artist;
      const songsAlbum = data.data;
      console.log(data);

      cl(albumN);
      cl(songsAlbum);
      cl(artist);

      imgAlbum.src = albumN.cover_big;
      albumName.innerText = albumN.title;
      imgArtist.src = artist.picture_medium;
      artistName.innerText = artist.name;
      numberSongsAlbum.innerText = songsAlbum.length - 1 + " " + "Brani";

      cl(albumName);

      //   imgAlbum.src = album.cover_medium;
      //   albumName.textContent = album.title;
      //   artistName.textContent = album.artist.name;
      //   albumYear.textContent = new Date(album.release_date).getFullYear();
      //   numberSongsAlbum.textContent = tracks.length;
    });
});
