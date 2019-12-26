const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  mode: 'production',

  resolve: { extensions: ['.js'] },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
