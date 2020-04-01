'use strict';

const express = require('express');
const mustache = require('mustache')
const mustacheExpress = require('mustache-express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const exec = require('child_process').exec;
const http = require('http');
//Define IP
var os = require( 'os' );

var networkInterfaces = os.networkInterfaces( );

var external = exec('curl https://ipinfo.ip', (err, stdout, stderr ) => console.log(stdout));



console.log( networkInterfaces );

// App
const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/view');
app.get('/', (req, res) => {
  res.render('index', {
		content: {
		viewPort: PORT,
		viewHost: HOST,
		localIP: JSON.stringify(networkInterfaces),
                externalIP: external

}});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
