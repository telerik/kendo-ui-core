---
title: Webpack
page_title: Webpack | Kendo UI Third-Party Tools
description: "Package Kendo UI with Webpack."
slug: webpacksupport_integration_kendoui
---

# Webpack

The recommended approach to include Kendo UI is by using the NPM package.

## Using NPM

As of the Kendo UI 2016 Q2 SP1 release, both Kendo UI Core and Kendo UI Professional are distributed in an NPM format. For more details, refer to [the installation instructions]({% slug kendoui_npm_packages_kendoui_installation %}).

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. 
The Kendo UI NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry.

> * The typescript step is optional&mdash;the NPM package might be consumed from vanilla JavaScript or with the Babel transpiler.
> * The Kendo UI [TypeScript typings are global](https://github.com/typings/typings/blob/master/docs/faq.md#what-are-global-dependencies). This means that TypeScript will complain if you try to import the `kendo` object. Use the global reference instead.

```typescript
// This won't work
import kendo from 'kendo-ui-core';

// This works
import 'kendo-ui-core'; //or import '@progress/kendo-ui' to install the Kendo UI package

console.log(kendo);
```

## Using CDN or Packaged Scripts

The Kendo UI packaged scripts are in an AMD-compatible format which means that they can be used by [Webpack](http://webpack.github.io). This sections below demonstrate the necessary Webpack configuration for this setup.

(For holders of the commercial Kendo UI Complete license) The commercial Kendo UI distribution `zip` file, available for download for the active customer subscriptions has the packaged scripts available in the `js` directory.

## Using in JavaScript and TypeScript Applications

To see the runnable examples on how to use Kendo UI with Webpack in both JavaScript and TypeScript applications, refer to the following [sample repository](https://github.com/telerik/kendo-ui-npm-example).

## Building AMD-Formatted Scripts

(For users of the Kendo UI Core open-source distribution) The instructions for obtaining and building the Kendo UI Core scripts are listed in the [README](https://github.com/telerik/kendo-ui-core#how-to-build-kendo-ui-core). Once the scripts are available and present in your project directory, the Webpack configuration demonstrated in the sections below will pick and bundle them in your project. To test the configuration of the following example, run the `webpack-dev-server` executable in the directory.

```tab-index.html
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kendo UI with webpack</title>
      <!-- the styles may also be loaded with webpack -->
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css">
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css">
      <meta charset="utf-8" />
      <script src="bundle.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
      <input id="ddl" />
    </body>
    </html>
```
```tab-main.js
    require('jquery')

    require('kendo.dropdownlist')

    $("#dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
          { text: "Item1", value: "1" },
          { text: "Item2", value: "2" }
        ]
    });
```
```tab-webpack.config.js
    var path = require('path')
    module.exports = {
        resolve: {
            extensions: [ '', '.js', 'min.js' ],
            root: [
                path.resolve('.'),
                path.resolve('../kendo/dist/js/') // the path to the minified scripts
            ]
        },
        entry: './main',
        output: {
            filename: 'bundle.js'
        }
    }
```

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
