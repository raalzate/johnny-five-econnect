var express = require('express');
var app = express();
  var request = require('request');


var Parse = require('node-parse-api').Parse;

myParse = new Parse("UFbAfhbkquCpb9RV1HMwN7Boy4iIWB7G1jxMV048", "Ldw4f6yFsx8iWQl25FmFqBdBvZVuGkalTluE5ZLH");

app.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });  
});

app.get('/alloff', function (req, res) {
    var ip = "192.168.0.102:4040/off";
  request('http://' + ip, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.json({message:body}); 
       }
  });
});

app.get('/node/', function (req, res) {
  var ip = req.query.ip;
	request('http://' + ip, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.json({message:body}); 
	     }
	});
});


setInterval(function(){
  var ip = "192.168.0.102:4040";
  request('http://' + ip, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        myParse.insert('consummerNode', {nodeId: "DhhbpKrKLP", data: body}, function (err, response) {
          console.log(response);
        });

       }
  });
}, 10000);


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
