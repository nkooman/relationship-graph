const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/relationship-graph/" : "/",
  chainWebpack: config => {
    config
      .plugin("html")
      .tap(args => [{ ...args[0], title: "Relationship Graph" }])
      .end();
  }
};
