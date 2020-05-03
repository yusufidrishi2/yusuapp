const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = env => {
	const dotenvpath = path.resolve(__dirname,'./.env/', env.NODE_ENV);
	console.log('env_path = ', dotenvpath);
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
				},
				{
					test: /.(sa|sc|c|module.c)ss$/,
					exclude: /(node_modules|libs)/,
					use: [
						'style-loader',
						{
							loader: '@teamsupercell/typings-for-css-modules-loader'
						},
						{
							loader: "css-loader",
							options: {
								url: false,
								modules: true,
								importLoaders: 1,
								localsConvention: 'camelCase',
								modules: {
									localIdentName: "[name]__[local]___[hash:base64:5]",
								},
							}
						},
						'sass-loader',
						{  
							loader : 'postcss-loader',
							options: {
								plugins: (loader) => [
									require('autoprefixer'),
								]
							}

						}
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),
			new webpack.IgnorePlugin(/^\.\/env.js$/),
			new CopyPlugin([
				{ 
					from: 'img', 
					to: 'img' 
				},
				{
					from : 'src/env.js',
					to : './'
				}
			]),
			new Dotenv({
				path: dotenvpath, // load this now instead of the ones in '.env'
				safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
				systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
				silent: false, // hide any errors
				defaults: false // load '.env.defaults' as the default values if empty.
			})
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		}
	};
};
