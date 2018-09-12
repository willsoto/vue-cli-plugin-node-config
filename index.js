module.exports = (api, projectOptions = {}) => {
  const { pluginOptions = {} } = projectOptions;
  const { nodeConfig = {} } = pluginOptions;
  const key = nodeConfig.key || "CONFIG";

  api.chainWebpack(webpackConfig => {
    const config = require("config");

    webpackConfig.plugin("define").tap(args => {
      const originalVars = args[0];

      return [
        {
          ...originalVars,
          [key]: JSON.stringify(config)
        }
      ];
    });
  });
};
