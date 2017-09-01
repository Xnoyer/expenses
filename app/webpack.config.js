var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./client/js/app.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};