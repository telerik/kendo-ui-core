---
title: Module Bundlers
page_title: Module Bundlers - Kendo UI Third-Party Tools
description: "Learn how to use the @progress/kendo-ui package with modern module bundlers like webpack, rollup, esbuild, and Vite's dev server)."
slug: module_bundlers_integration_kendoui
---

# Module Bundlers

The recommended approach to include Kendo UI is by using the NPM package.

Version 2023.3.718 of the `@progress/kendo-ui` package provides various improvements in the support for modern module bundlers. If you use an older version, consider upgrading to the latest one to take advantage of the improvements.

## Using NPM

As of the Kendo UI 2016 Q2 SP1 release, both Kendo UI Core and Kendo UI Professional are distributed in an NPM format. For more details, refer to [the installation instructions]({% slug kendoui_npm_packages_kendoui_installation %}).

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. 
The Kendo UI NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry.

## Module Dependencies

The Kendo UI NPM package requires jQuery—make sure you register it as a dependency in your project. 

```
  npm install --save jquery
```

or

```
  {
    "dependencies": {
      "jquery": "^3.6.0"
    }
  }
``` 

## Handling the jQuery Instance

The Kendo UI for jQuery library presumes that the jQuery instance is available as a global variable. With the modern module bundlers, you can register a global variable by following the specific instruction of the bundler. For example:

* With rollup, use globals: 

```javascript
  // rollup.config.js
  export default {
    input: 'index.js',
    output: [{
      file: 'dist/bundled.js',
      sourcemap: 'inline',
      globals: {
        jquery: '$'
      }
    }],
    external: ['jquery'],
    treeshake: false,
  }
```

* With webpack, use the [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/):

```javascript
  // webpack.config.js
  const webpack = require('webpack');

  module.exports = {
    //...
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  };
```

Registering a global variable will ultimately enable you to avoid importing jQuery as a module in your JS/TS file and still have jQuery available globally: 

```javascript
  import `@progress/kendo-ui`;

  $("#grid").kendoGrid({...grid configs...});
```


If the module bundler you are using cannot register a global variable (for example, esbuild and Vite's dev server), you can get the default export from the `@progress/kendo-ui` package and use it to get the jQuery instance imported by `@progress/kendo-ui`.

> This approach is supported with version 2023.3.718 or later.

```javascript
  import kendo from '@progress/kendo-ui';

  const $ = kendo.jQuery;

  $("#grid").kendoGrid({...grid configs...});
```

## Using the @progress/kendo-ui Package as a Global Variable

As with the jQuery instance, when possible, register the `@progress/kendo-ui` package as a global variable. That will ultimately enable you to avoid importing the package in your JS/TS file and still have the Kendo UI available globally:

Webpack, for example, requires the following setup for the `webpack.config.js` and the JS/TS files:

* `webpack.config.js`:

```javascript
  // webpack.config.js
  const webpack = require('webpack');

  module.exports = {
    //...
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        kendo: '@progress/kendo-ui',
        'window.kendo': '@progress/kendo-ui'
      })
    ]
  };
```

* JS/TS file: 

```javascript
  $("#grid").kendoGrid({...grid configs...});
```

## Picking Up the Right Modules

Prior to version 2022.3.1109, the `@progress/kendo-ui` package was published only with CommonJS modules and bundlers. Using these versions of the module requires you to utilize a compatible CommonJS loader plugin to compile/bundle your code. 

As of version 2022.3.1109, the `@progress/kendo-ui` package includes both CommonJS and ES modules and the module bundler will automatically pick up the module system it requires based on your configuration and the type of project you are building.

If, for some reason, you need to instruct the module bundler to pick up a specific module system, you can do that by using the `module` field in the `package.json` file or setting that up through the configuration of the module bundler.

For example, with webpack you need to:

* Set up the `resolve.mainFields` ([resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolvemainfields)) to rearrange the order of the fields that webpack will search to find the entry point of the package:

```javascript
  // webpack.config.js
  module.exports = {
    //...
    resolve: {
      mainFields: ['main', 'module'] // Use the CommonJS module and ESM as a fallback.
    }
  };
```

or

* make an [alias](https://webpack.js.org/configuration/resolve/#resolvealias) for the `@progress/kendo-ui` package and point it to the `module` field of the package:

```javascript
  // webpack.config.js
  module.exports = {
    //...
    resolve: {
      alias: {
        '@progress/kendo-ui': path.resolve(__dirname, 'node_modules/@progress/kendo-ui/js/kendo.all.js') // Use the CommonJS module.
      }
    }
  };
```

To set up the same with the module bundler you are using, refer to its documentation.

## See Also

* [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI for jQuery with NuGet]({% slug kendoui_nuget_packages %})
* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
