const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packahgeJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:8081/';
const prodConfig = {
  mode: 'production',
  output: {
     filename: '[name].[contenthash].js',
    publicPath: domain,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
      './MarketingApp': './src/bootstrap',
      },
      shared: packahgeJson.dependencies,
    })
  ],
};

module.exports = merge(commonConfig, prodConfig);
