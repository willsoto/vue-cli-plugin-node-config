# vue-cli-plugin-node-config

[![pipeline status](https://gitlab.com/willsoto/vue-cli-plugin-node-config/badges/master/pipeline.svg)](https://gitlab.com/willsoto/vue-cli-plugin-node-config/commits/master)

Integrates [node-config](https://github.com/lorenwest/node-config) with [vue-cli](https://cli.vuejs.org/).

Exposes configuration defined according to node-config in client code via Webpack's `DefinePlugin`

### Installation

```bash
vue add node-config
```

### Configuration

You can change how you access configuration through `pluginOptions`.

By default, `CONFIG` is used:

```js
if (CONFIG.DEVELOPMENT) {
  // whatever
}
```

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    nodeConfig: {
      key: "somethingElse" // default: CONFIG
    }
  }
};
```

```js
if (somethingElse.DEVELOPMENT) {
  // whatever
}
```
