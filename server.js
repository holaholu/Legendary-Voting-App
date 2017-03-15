// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http')
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api/api');
const mypage = require('./routes/otherpages/mypage');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//View Engine
app.set("view engine","ejs");
//public files
app.use (express.static("public"));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use("/mypage",mypage);

// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  //res.sendFile("../dist/index.html'");
});

app.get("*",(req,res)=>{
res.send("page not found");

} )

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));