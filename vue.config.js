module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: webpackConfig => {
    webpackConfig.devtool("node");   
  }
}