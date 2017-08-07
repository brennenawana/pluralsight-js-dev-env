import path from 'path'; //path package comes with Node
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true, //gives us helpful debuggin info as we build
  devtool: 'inline-source-map', // there are many; compilation speed vs. quality is the tradeoff
  noInfo: false, // it means that Webpack will list of all files while bundling
  entry: [
    path.resolve(__dirname, 'src/index') //passing an array of entrypoints, can include middleware for hot reloading
  ],
  target: 'web', // targets web, could be Node or electron.
  output: { // we tell Webpack where it should create our dev bundle
    path: path.resolve(__dirname, 'src'), // Note: Webpack won't generate any physical files for our dev build. It will serve our build from memory
    publicPath: '/', // they simulate the files existence
    filename: 'bundle.js' //name of our file
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ], // Used for linting, hot reloading, etc.
  module: { // We need to tell webpack the types of files we want it to handle
    loaders: [ // I can now import these filetypes at the top of the JS files, and they will be intelligently bundled here for me.
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
