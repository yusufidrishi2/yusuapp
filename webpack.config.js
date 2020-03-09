const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
	return {
		optimization: {
			splitChunks: {
				cacheGroups: {
					styles: {
					name: 'styles',
					test: /\.(sa|sc|c)ss$/,
					chunks: 'all',
					enforce: true
					}
				}
			}
		},
		entry: {
			app :[ './src/scripts/app/app.tsx']
		},
		mode: 'none',
		devtool: 'inline-source-map',
		output: {
			path : path.resolve(__dirname, 'dist'),
			filename : '[name]_bundle.[contenthash].js'
		},
		module : {
			rules : [
				{
					test: /\.tsx?$/,
					use : [
						'ts-loader'
					]
				},
				{
					test : /\.html$/,
					use : ['html-loader']
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.html'
			}),
			new CopyPlugin([
				{ 
					from: 'img', 
					to: 'img' 
				}
			])
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		}
	};
};
