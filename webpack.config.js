var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = [
	{
		entry: './src/app.js',
		output: {
			path: __dirname,
			filename: 'app.js'
		},
		target: 'node',
		node: {
			__dirname: false,
			fs: "empty",
			net: "empty",
			tls: "empty"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		externals: [nodeExternals()]
	},
	{
		entry: './src/Client/index.jsx',
		output: {
			path: `${__dirname}/Client`,
			filename: 'index.js'
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
				{ test: /\.(woff|png|jpg|gif|eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=100000' }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/Client/index.html',
				inject: 'body',
			})
		]
	}
]
