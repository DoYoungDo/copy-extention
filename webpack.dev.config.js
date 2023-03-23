const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
	mode: "development",
	devtool: "source-map",
	watch: true,
	watchOptions: {
		ignored: '**/node_modules',
		poll: 3000,
	}
})  
