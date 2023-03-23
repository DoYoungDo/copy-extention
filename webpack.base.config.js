const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const NLSTransPlugin = require('webpack-nls-plugin');
const { NLSBundlePlugin } = require('hxnls-dev/lib/webpack-bundler')
const { bundleId, singleFiles, handleMain } = require('./utils');

module.exports = {
	entry: {
		extension: './src/extension.js'
	},
	target: 'node',
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'hxnls-dev/lib/webpack-loader',
					options: {
						base: path.join("./", 'src')
					}
				}
			]
		}],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{
					from: path.resolve(__dirname, 'package.json'),
					to: ".",
					transform: {
						transformer(content, path) {
							return handleMain(content);
						},
					}
				},
				...singleFiles
			],
		}),
		new NLSBundlePlugin(bundleId),
		new NLSTransPlugin()
	],
	externals: [
		"hbuilderx",
		"hxnls"
	],
	node: {
		__filename: false,
		__dirname: false
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist',
		library: {
			type: "commonjs2"
		}
	}
}