const webpack = require('webpack');

module.exports = {
  // ... other webpack configurations ...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto'),
      stream: require.resolve('stream-browserify'),
    },
  },

  plugins: [
    // Add the following plugin to provide a global Buffer object
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
