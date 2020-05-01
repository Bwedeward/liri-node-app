require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var nodeSpotifyAPI = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv");

var input = process.argv[3];

switch (process.argv[2]) {
  case "concert-this":
    concertSearch()
    console.log("concert-this");
    break;
  case "spotify-this-song":
    spotifySearch();
    console.log("spotify-this-song");
    break;
  case "movie-this":
    // movieSearch()
    console.log("movie-this");
    break;
  case "do-what-it-says":
    //  itSaysSearch()
    console.log("do-what-it-says");
    break;
}

function concertSearch(){
axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function(response){
  console.log(response.data[0].venue.name)
  console.log(response.data[0].venue.city)
  console.log(response.data[0].venue.country)
  console.log(moment(response.data[0].datetime).format("MM/D/YYYY"))
})}

function spotifySearch() {
  var spotify = new nodeSpotifyAPI(keys.spotify);
  var isDefault = false;
  if (input === undefined) {
    input = "The Sign";
    isDefault = true;
  }

  spotify
    .search({ type: "track", query: input })
    .then(function (response) {
      var items = response.tracks.items;
        // console.log(items);
      //   console.log(response.tracks.items[0].artists.name);
      if (isDefault) {
        var defaultSong = items.find((item) => {
          //   console.log(item);
          return item.artists[0].name === "Ace of Base";
        });
        var previewUrl = defaultSong.preview_url;
        if (!previewUrl) {
          previewUrl = defaultSong.external_url.spotify;
        }
        console.log(defaultSong);
        console.log(defaultSong.artists[0].name);
        console.log(defaultSong.name);
        console.log(defaultSong.album.name);
        console.log(previewUrl);
      } else {
        //   console.log(response.tracks.album.name)
        //loop through itmes array and log out info
        var inputSong = items.find((item) => {
            return item.artists[0].name
        })
        console.log(inputSong)
        // console.log(defaultSong);
        // console.log(defaultSong.artists[0].name);
        // console.log(items.name);
        // console.log(defaultSong.album.name);
        // console.log(previewUrl);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function movieSearch(){
 
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function(response){
      console.log(response.data[0].venue.name)
      console.log(response.data[0].venue.city)
      console.log(response.data[0].venue.country)
      console.log(moment(response.data[0].datetime).format("MM/D/YYYY"))
    })
}