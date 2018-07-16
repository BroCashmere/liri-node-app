require("dotenv").config();

//Files and Modules Required
let fs = require("fs");
let keys = require("./keys");
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
var request = require('request');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

//Setting Variables for command arguments
let app = process.argv[2];
let para = process.argv[3];

//If command is tweet, request most recent 20 tweets
if (app === 'my-tweets'){
    tweets();
};

//If command is spotify, return song info regarding query
if (app === 'spotify-this-song'){
    spotifyThisSong();
};

//If command is movie, return movie info regarding query
if (app === 'movie-this'){
    movieTime();
    };

//Run the Spotify command on each song in the random.txt file
if (app === 'do-what-it-says'){
    //Reading the random.txt file to find the command
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        //If command is Spotify
        if (dataArr[0] === 'spotify-this-song'){
            para = dataArr[1];
            spotifyThisSong();
        }

        //If command is tweets
        if (dataArr[0] === 'my-tweets'){
            tweets();
        }

        //If command is movie
        if (dataArr[0] === 'movie-this'){
            para = dataArr[1];
            movieTime();
        }

        //Read through the random.txt to display song info for each song in file
        // for (i=1;i<dataArr.length;i++){
            
        //     spotify
        //     .search({ type: 'track', query: dataArr[i], limit: 1 })
        //     .then(function(response) {
        //         let songData = response.tracks.items[0]
    
        //         console.log('Artists(s): ' + songData.artists[0].name)
        //         console.log('Song Name: ' + songData.name)
        //         console.log('Spotify Preview Link: ' + songData.external_urls.spotify)
        //         console.log('Album Name: ' + songData.album.name)
        //     })
        //     .catch(function(err) {
        //     console.log(err);
        //     });
        // }



      });
      
    
};


//Functions for each command so they can be called if needed for 'do-what-it-says'
function tweets(){
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?brocashmere=' + client.options.consumer_key + '&count=20', function(error, tweets, response) {
        if(error) throw error;

        for (i=0;i<tweets.length;i++){
        console.log("Tweet: " + tweets[i].text + " Created at: " + tweets[i].created_at);
        }
        });
}

function spotifyThisSong(){
    if (para != null){
        
        spotify
            .search({ type: 'track', query: para, limit: 1 })
            .then(function(response) {
                let songData = response.tracks.items[0]

                console.log('Artists(s): ' + songData.artists[0].name)
                console.log('Song Name: ' + songData.name)
                console.log('Spotify Preview Link: ' + songData.external_urls.spotify)
                console.log('Album Name: ' + songData.album.name)
            })
            .catch(function(err) {
            console.log(err);
            });
    
//If no song parameter, default to Ace of Base info
    } else {
        spotify
            .search({ type: 'track', query: "Ace of Base The Sign", limit: 1 })
            .then(function(response) {
                let songData = response.tracks.items[0]

                console.log('Artists(s): ' + songData.artists[0].name)
                console.log('Song Name: ' + songData.name)
                console.log('Spotify Preview Link: ' + songData.external_urls.spotify)
                console.log('Album Name: ' + songData.album.name)
            })
            .catch(function(err) {
            console.log(err);
            });
    }
}

function movieTime(){
    if (para != null){

        request('https://www.omdbapi.com/?t=' + para + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            let newBody = JSON.parse(body);
            console.log('Title: ' + newBody.Title);
            console.log('Year: ' + newBody.Year);
            console.log('IMDB Rating: ' + newBody.imdbRating);
            console.log('Country Produced: ' + newBody.Country);
            console.log('Language: ' + newBody.Language);
            console.log('Plot: ' + newBody.Plot);
            console.log('Actors: ' + newBody.Actors);
        });
    //If no movie title parameter, default to Mr. Nobody movie info
        } else {
        
        request('https://www.omdbapi.com/?t=' + "Mr. Nobody" + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            let newBody = JSON.parse(body);
            console.log('Title: ' + newBody.Title);
            console.log('Year: ' + newBody.Year);
            console.log('IMDB Rating: ' + newBody.imdbRating);
            console.log('Country Produced: ' + newBody.Country);
            console.log('Language: ' + newBody.Language);
            console.log('Plot: ' + newBody.Plot);
            console.log('Actors: ' + newBody.Actors);
        }
    
        )}
};