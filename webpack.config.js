var
  path = require('path')

  // webpack plugin
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

var
  IS_PRODUCTION = process.env.NODE_ENV === 'production'
  , cssIdentifier = IS_PRODUCTION ? '[hash:base64:10]' : '[path][name]__[local]'
;


var config = {
  devtool: 'source-map',
  entry: path.resolve('src', 'index.js'),

  output: {
    path: path.resolve('dist'),
    filename: IS_PRODUCTION
      ? 'H5AudioControls.min.js'
      : 'H5AudioControls.js',
    library: 'H5AudioControls',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
        exclude: [
          path.resolve('node_modules'),
        ],
        loader: 'babel-loader',
      },

      // Style
      {
        test: /\.scss$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: cssIdentifier,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
            },
          },
        ]
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('src'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'images/[hash:12].[ext]',
            }
          },
        ],
      },
    ]
  },

  plugins: [],
};

// Clean Dist Dir
if (!IS_PRODUCTION) {
  config.plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    })
  );
}

// Uglify Js
if (IS_PRODUCTION) {
  config.plugins.push(
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    })
  );
}

module.exports = config;
