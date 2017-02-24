var express = require('express');
var app = express();
var b = "";
var c = "";
var titles="";

app.get('/api/:id/:lim', function (req, res) {
	var request = require('request');
	var id = req.params.id;
	var lim = req.params.lim;
	console.log('enter');
	request('https://www.reddit.com/r/' + id + '/new.json?limit='+lim, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received		
		b = JSON.parse(body);
		c = "{\"subreddit\":\"" + id + "\", \"titles\":[";
		//c = JSON.parse('{a:b, c:d}');
		var dchildren = b['data']['children'];
		console.log(dchildren.length);
		for (var i=0; i<dchildren.length; i++){
			//	 titles = dchildren[i]['kind'];
			if(dchildren[i].hasOwnProperty('data')){
				var k = dchildren[i]['data'];
				if(k.hasOwnProperty('title')){
					//titles += i + dchildren[i]['data']['title'] +'\n'; 
					c += "{\"name\":\"" + dchildren[i]['data']['title'] + "\",";
				}
				if(k.hasOwnProperty('permalink')){
					c += "\"url\": \"reddit.com" + dchildren[i]['data']['permalink'] + "\"},";
				}
			}
		}
		c += "{}]}";
		//c = "{\"a\":\"b\", \"c\": [{\"kya\":\"hua\"},{\"pata\":\"nahi\"},]}";
		res.end(c);
		titles = "";
	});
})



var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
