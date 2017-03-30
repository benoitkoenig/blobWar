const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ["env", "react", "es2015-node"]
					}
				},
				{ test: /\.json$/, loader: "json-loader" }
			]
		},
		externals: {
			"socket.io": "commonjs socket.io"
		}
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
						presets: ["env", "react", "es2015-node"]
					}
				},
				{ test: /\.json$/, loader: "json-loader" }
			]
		}
	}
]
