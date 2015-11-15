var express = require('express');
var five = require("johnny-five");

var board = new five.Board();
var app = express();

app.get('/', function (req, res) {
    if(board.isReady){
      var sensor = new five.Sensor("A1");
      var hasData = false;
      sensor.on("change", function() {
          if(!hasData) {
            res.send(""+this.value); 
            hasData = true;
          }
      });
    }
});

app.get('/on', function (req, res) {
    if(board.isReady){
      var led = new five.Led(13);
      res.send('node on'); 
      led.on();
    }
});

app.get('/off', function (req, res) {
    if(board.isReady){
      var led = new five.Led(13);
      res.send('node off'); 
      led.off();
    }
});


var server = app.listen(4040, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});




