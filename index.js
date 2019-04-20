const express = require('express');

// set up express app
const app = express();

app.use(express.static('public'));

// listen for request
app.listen(process.env.port || 4000, function(){
  console.log('Server is now listening!');
});
