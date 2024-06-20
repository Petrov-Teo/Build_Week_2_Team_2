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
  const serverURL = "";
  cl(imgAlbum);
  cl(albumName);
  cl(imgArtist);
  cl(artistName);
  cl(albumYear);
  cl(numberSongsAlbum);
  cl(totalAlbumDuration);
  cl(numberSong);
  cl(titleSong);
  cl(reproductions);
  cl(durationTime);
});

fetch();
