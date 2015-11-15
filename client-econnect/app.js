var express = require('express');
var five = require("johnny-five");

var board = new five.Board();
var app = express();

app.get('/', function (req, res) {
  
    if(board.isReady){
      
      var sensor1 = new five.Sensor("A1");
      var sensor2 = new five.Sensor("A2");

      var hasData1 = false;
      var hasData2 = false;

      sensor1.on("change", function() {
          if(!hasData1) {
            hasData1 = true;
            var a1 = this.value;
            sensor2.on("change", function() {
            if(!hasData2) {
                  var a2 = this.value;
                  res.send(""+(a1-a2)); 
                  hasData2 = true;
                }
            });
          }
      });
    }
});

app.get('/onoff', function (req, res) {
    if(board.isReady){
      var led = new five.Led(4);
      res.send('node on'); 
      led.toggle();
    }
});

app.get('/on', function (req, res) {
    if(board.isReady){
      var led = new five.Led(4);
      res.send('node on'); 
      led.on();
    }
});

app.get('/off', function (req, res) {
    if(board.isReady){
      var led = new five.Led(4);
      res.send('node off'); 
      led.off();
    }
});


var server = app.listen(4040, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});




