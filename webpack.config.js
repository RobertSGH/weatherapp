const path = require('path');

module.exports = {
  entry: './WeatherWidget.js',
  output: {
    filename: 'WeatherWidgetBundle.js',
    path: path.resolve(__dirname, 'public'),
    library: 'WeatherWidget', // Expose your widget globally under the name `WeatherWidget`
    libraryTarget: 'umd', // Make it compatible with commonjs, amd and as a global variable
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
