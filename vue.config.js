const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
// const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: webpackConfig => {
    if (process.env.VUE_APP_ENV === 'SSR') {
      webpackConfig.devtool("node");
      webpackConfig
      .entry("app")
      .clear()
      .add("./src/main.js");

      webpackConfig.target("node");
      webpackConfig.output.libraryTarget("commonjs2");

      webpackConfig
        .plugin("vuebundle")
        .use(new VueSSRServerPlugin());

      webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

      webpackConfig.optimization.splitChunks(false).minimize(false);
    } else {
      webpackConfig.devtool("node");
    }
  }
  // configureWebpack: {   
  //   devtool: 'source-map',
  //   target: 'node',
  //   entry: {
  //     app: './src/main.js'
  //   },
  //   output: {
  //     libraryTarget: 'commonjs2'
  //   },
  //   externals: nodeExternals({
  //     allowlist: /\.(css|vue)$/
  //   }),
  //   optimization: {
  //     splitChunks: false,
  //     minimize: false,
  //   },
  //   plugins: [
  //     new VueSSRServerPlugin(),
  //     // new VueSSRClientPlugin()
  //     // new WebpackManifestPlugin({ fileName: "ssr-manifest.json" })
  //   ]


  // }
}