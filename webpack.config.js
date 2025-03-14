const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    entry: {
      admin: './assets/js/admin/index.js',
      editor: './assets/js/editor/index.js'
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'assets/dist/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../css/[name].min.css'
      })
    ],
    optimization: {
      minimize: isProduction, // Minify only in production
      minimizer: isProduction ? [ new TerserPlugin(), new CssMinimizerPlugin() ] : []
    },
    watch: !isProduction // Enable watch mode in development
  }
}
