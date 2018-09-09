const config = require("config");
const generateWithPlugin = require("@vue/cli-test-utils/generateWithPlugin");
const Service = require("@vue/cli-service/lib/Service");

test("devDependencies", async () => {
  const { pkg } = await generateWithPlugin([
    {
      id: "config",
      apply: require("../generator"),
      options: {}
    }
  ]);

  expect(pkg.devDependencies).toHaveProperty("config");
});

test("has the DefinePlugin", () => {
  const service = new Service("/", {
    pkg: {},
    plugins: [
      {
        id: "vue-cli-plugin-node-config",
        apply: require("../index")
      }
    ]
  });

  service.init();
  const config = service.resolveWebpackConfig();
  const plugin = config.plugins.find(plugin => {
    return plugin.constructor.name === "DefinePlugin";
  });

  expect(plugin).toBeTruthy();
});

test("keeps the original environment variables passed to the plugin", () => {
  const service = new Service("/", {
    pkg: {},
    plugins: [
      {
        id: "vue-cli-plugin-node-config",
        apply: require("../index")
      }
    ]
  });

  service.init();
  const webpackConfig = service.resolveWebpackConfig();
  const plugin = webpackConfig.plugins.find(plugin => {
    return plugin.constructor.name === "DefinePlugin";
  });

  expect(plugin.definitions).toEqual({
    CONFIG: config.util.toObject(config),
    "process.env": {
      BASE_URL: '"/"',
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  });
});
