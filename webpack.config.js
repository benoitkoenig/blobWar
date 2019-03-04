var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = [
	{
		entry: './src/app.js',
		output: {
			path: __dirname,
			filename: 'app.js'
		},
		target: 'electron',
		node: {
			__dirname: false,
			fs: "empty",
			net: "empty",
			tls: "empty"
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ["env", "react", "es2015-node"],
						plugins: ["transform-class-properties"],
					},
				},
				{ test: /\.json$/, exclude: /node_modules/, loader: "json-loader" }
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
			loaders: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ["env", "react", "es2015-node"],
						plugins: ["transform-class-properties"],
					}
				},
				{ test: /\.json$/, exclude: /node_modules/, loader: "json-loader" },
				// { test: /\.css$/, loader: "style-loader!css-loader" },
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
