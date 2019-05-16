/**
 * Webpackの設定ファイル
 */
module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './docs/js/jquery.aikatsu.js',
  target: 'web',
  // ファイルの出力設定
  output: {
    // //  出力ファイルのディレクトリ名
    // path: `${__dirname}/docs`,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: ['url-loader']
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: `${__dirname}/docs`,
    publicPath: '/'
  },
  devtool: 'source-map'
};
