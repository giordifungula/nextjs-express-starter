const path = require('path');
const withCSS = require('@zeit/next-css');

const DIR = __dirname || './';

module.exports = withCSS({
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      components: path.resolve(DIR, 'components'),
      // config: path.resolve(__dirname, 'config'),
      controllers: path.resolve(DIR, 'controllers'),
      // middleware: path.resolve(__dirname, 'middleware'),
      models: path.resolve(DIR, 'models'),
      node_modules: path.resolve(DIR, 'node_modules'),
      // router: path.resolve(__dirname, 'server/routes'),
      services: path.resolve(DIR, 'services'),
      static: path.resolve(DIR, 'static'),
      styles: path.resolve(DIR, 'styles'),
      transformers: path.resolve(DIR, 'transformers'),
      utils: path.resolve(DIR, 'utils')
    }

    config.module.rules.push(
      {
        test: /\.css/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )

    return config
  },
  cssModules: false
});
