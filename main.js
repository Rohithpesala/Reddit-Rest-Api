var express = require('express');
var app = express();
var b = ""; // Will take in the original JSON
var c = ""; // The JSON to send out from our API

//GET request that accepts two inputs, Subreddit and limit of subreddits to show.
app.get('/api/:id/:lim', function (req, res) {
	var request = require('request');
	var id = req.params.id;		//Subreddit name
	var lim = req.params.lim;	//Number of subreddits to return
	request('https://www.reddit.com/r/' + id + '/new.json?limit='+lim, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received		
		b = JSON.parse(body);
		c = "{\"subreddit\":\"" + id + "\", \"titles\":[";
		var dchildren = b['data']['children'];
		console.log(dchildren.length);
		for (var i=0; i<dchildren.length; i++){
			if(dchildren[i].hasOwnProperty('data')){
				var k = dchildren[i]['data'];
				if(k.hasOwnProperty('title')){
					c += "{\"name\":\"" + dchildren[i]['data']['title'] + "\",";
				}
				//We can add more if loops to add more details to the JSON object.
				if(k.hasOwnProperty('permalink')){
					c += "\"url\": \"reddit.com" + dchildren[i]['data']['permalink'] + "\"},";
				}
			}
		}
		c += "{}]}";
		res.json(c);
	});
})



var server = app.listen(8081);
