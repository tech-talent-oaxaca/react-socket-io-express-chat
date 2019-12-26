const express = require('express');
const path = require('path');

// Webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();

// Middleware
app.use(webpackDevMiddleware(webpack(config)));
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('Server running on localhost:3000'));
