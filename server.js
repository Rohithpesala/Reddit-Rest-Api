var express = require('express');
var app = express();
var b = "";
var c = "";
var titles="";


app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})


//GET request that accepts two inputs, Subreddit and limit of subreddits to show.
app.get('/show', function (req, res) {
	var request = require('request');
	var id = req.query.id;		//Subreddit name
	var lim = req.query.lim;	//Number of subreddits to return
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



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
