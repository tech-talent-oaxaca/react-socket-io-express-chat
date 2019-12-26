const express = require('express');
const path = require('path');

// Socket IO
const http = require('http');
const socketIo = require('socket.io');

// Webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(
  webpackDevMiddleware(webpack(config), {
    noInfo: true,
  }),
);
app.use(express.static(__dirname + '/public'));

// Sockect connection
io.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);

  socket.on('message', (body) => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(4),
    });
  });
});

server.listen(3000, () => console.log('Server running on localhost:3000'));
