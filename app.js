var express =require('express');
var app = express();

app.get('/', function(request, response) {
    response.write('Hello World')       // can use .send or .write which give samr result (Output)
    response.end();
});

app.listen(3000, function() {
  console.log('Listening to port 3000');  
 });

