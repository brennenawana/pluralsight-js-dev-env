import path from 'path'; //path package comes with Node
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true, //gives us helpful debuggin info as we build
  devtool: 'source-map', // there are many; compilation speed vs. quality is the tradeoff; this lets us see our sourcecode in devtools
  noInfo: false, // it means that Webpack will list of all files while bundling
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index') //passing an array of entrypoints, can include middleware for hot reloading
  },
  target: 'web', // targets web, could be Node or electron.
  output: { // we tell Webpack where it should create our dev bundle
    path: path.resolve(__dirname, 'dist'), // Note: Webpack won't generate any physical files for our dev build. It will serve our build from memory
    publicPath: '/', // they simulate the files existence
    filename: '[name].[chunkhash].js' //name of our file, the parenthesis[name] is getting it's name from the entry points. And [hash] from md5 plugin.
  },
  plugins: [
     // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'f867f490836f40f6aec26eca1cdca815'
    }),

    // Elimate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ], // Used for linting, hot reloading, etc.
  module: { // We need to tell webpack the types of files we want it to handle
    loaders: [ // I can now import these filetypes at the top of the JS files, and they will be intelligently bundled here for me.
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
