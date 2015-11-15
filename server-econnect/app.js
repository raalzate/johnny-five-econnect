var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });  
});

app.get('/node/', function (req, res) {
  var ip = req.query.ip;
    var request = require('request');
	request('http://' + ip, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.json({message:body});  
	     }
	});

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
