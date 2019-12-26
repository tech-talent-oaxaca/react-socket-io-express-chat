const express = require('express');
const path = require('path');

// Socket IO
const http = require('http');
const sockeIo = require('socket.io');

// Webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();
const server = http.createServer(app);
const io = sockeIo(server);

// Middleware
app.use(webpackDevMiddleware(webpack(config)));
app.use(express.static(__dirname + '/public'));

server.listen(3000, () => console.log('Server running on localhost:3000'));
