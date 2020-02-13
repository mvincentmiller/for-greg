const path = require('path')
module.exports = {
  components: 'src/components/**/*.js',
  //Grab our custom react scripts webpack config
  webpackConfig: require('bulu-react-scripts/config/webpack.config.js'),
  require: [path.join(__dirname, './sgOverride.scss')],
}
