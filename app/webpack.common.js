var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./client/js/app.js'
	],
	output: {
		path: path.join(__dirname, './client/static/'),
		filename: 'app.js'
	}
};