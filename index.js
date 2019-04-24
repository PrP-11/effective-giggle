const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

// listen for request
app.listen(process.env.port || 5000, function(){
  console.log('Server is now listening!');
});
