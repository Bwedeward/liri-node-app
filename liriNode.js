require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var nodeSpotifyAPI = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv");
var omdb = require("omdb")
var fs = require("fs-extra")

var doSomething = process.argv[2]
var input = process.argv[3];

function runIt(){
switch (doSomething) {
  case "concert-this":
    concertSearch()
    console.log("concert-this");
    break;
  case "spotify-this-song":
    spotifySearch();
    console.log("spotify-this-song");
    break;
  case "movie-this":
    movieSearch()
    console.log("movie-this");
    break;
  case "do-what-it-says":
    console.log("do-what-it-says");
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      } else {
      var random = data.split(",");
      doSomething = random[0]
      input = random[1]
      console.log(doSomething, input)
      runIt()
    }});
    break;
}}

runIt()

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
  spotify.search({ type: "track", query: input })
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
        //   var items = response.tracks.items;
        //loop through itmes array and log out info
        // var inputSong = items.find((item) => {
        //     return item.artists[0].name
        // })
        // var previewUrl = inputSong.preview_url;
        // if (!previewUrl) {
        //   previewUrl = inputSong.external_url.spotify;
        // }
        console.log(items[0].artists[0].name)
        console.log(items[0].name)
        console.log(items[0].album.name)
        // console.log(inputSong.artists[0].name)
        // console.log(inputSong.name);
        // console.log(inputSong.album.name);
        console.log(previewUrl);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}


function movieSearch() {
  isDefault = false
  if (input === undefined){
    input = "Mr. Nobody"
    isDefault = true;
  }
  axios
  .get(
  `http://www.omdbapi.com/?apikey=trilogy&t=${input}`
  )
  .then(function(response) {
    if (isDefault){
      console.log(`${response.data.Title}`);
      console.log(`${response.data.Year}`)
      console.log(`${response.data.Rated}`)
      console.log(`${response.data.Ratings[1].Value}`)
      console.log(`${response.data.Country}`)
      console.log(`${response.data.Language}`)
      console.log(`${response.data.Plot}`)
      console.log(`${response.data.Actors}`) 
    }else {
      console.log(`${response.data.Title}`);
      console.log(`${response.data.Year}`)
      console.log(`${response.data.Rated}`)
      console.log(`${response.data.Ratings[1].Value}`)
      console.log(`${response.data.Country}`)
      console.log(`${response.data.Language}`)
      console.log(`${response.data.Plot}`)
      console.log(`${response.data.Actors}`)
    }
  });
}
