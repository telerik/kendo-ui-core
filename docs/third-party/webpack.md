---
title: Webpack
page_title: Webpack - Kendo UI Third-Party Tools
description: "Learn how to bundle Kendo UI for jQuery with Webpack using NPM, ECMAScript modules, and CommonJS."
components: ["general"]
slug: webpacksupport_integration_kendoui
---

# Webpack

The recommended approach to include Kendo UI is using the NPM package. For more information, refer to the [Installing with NPM](/intro/installation/npm) article. If you need to work with different module bundlers beyond Webpack, see the [Module Bundlers]({% slug module_bundlers_integration_kendoui %}) article.

## Using NPM

As of the Kendo UI 2016 Q2 SP1 release, both Kendo UI Core and Kendo UI Professional are distributed in an NPM format. For more details, refer to [the installation instructions]({% slug kendoui_npm_packages_kendoui_installation %}).

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. 
The Kendo UI NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry.

> * The typescript step is optional&mdash;the NPM package can be consumed from vanilla JavaScript or with the Babel transpiler.
> * The Kendo UI [TypeScript typings are global](https://github.com/typings/typings/blob/master/docs/faq.md#what-are-global-dependencies). This means that TypeScript will complain if you try to import the `kendo` object. Use the global reference instead.

> Starting from version 2023.3.718, the `kendo` instance is exported as a default export for the CommonJS and ECMAScript modules. This allows you to:
> * Use the `import kendo from '@progress/kendo-ui'` syntax to import the Kendo UI scripts in your application.
> * Use the `kendo` instance to get the jQuery in which the Kendo UI widgets are defined. For example, `const $ = kendo.jQuery; $("#grid").kendoGrid({...});`.

## Using in JavaScript and TypeScript Applications

To see the runnable examples on how to use Kendo UI with Webpack in both JavaScript and TypeScript applications, refer to the following [sample repository](https://github.com/telerik/kendo-ui-npm-example).

## Module System

The Kendo UI for jQuery library distributes the commercial code in the following module systems:

(Available as of v2022.3.1109) ECMAScript—The script files are located in the `esm` folder.
(Available as of v2022.3.1109) UMD—The script files are located in the `umd` folder.
CommonJS—The script files are located in the js folder.

This sections below demonstrate the necessary Webpack configuration setup with the ECMAScript scripts located in the esm folder.

## Building the ES Modules Scripts

For building the ES modules scripts with Webpack, you need to follow these steps:

### 1. Initialize the Default NPM Settings

Run the following command to create the `package.json` and initialize the default NPM settings.

```bash
npm init
```

### 2. Install the Webpack Dependencies

You can install the [Webpack development server](https://www.npmjs.com/package/webpack-dev-server) and [Webpack CLI](https://www.npmjs.com/package/webpack-cli) with the following command.

```bash
npm install -save webpack webpack-cli webpack-dev-server
```

### 3. Install the Kendo NPM Package

The commercial distribution NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry. 
The following command will install the distribution package:

```bash
  npm install --save @progress/kendo-ui
```

Alternatively, you can install the open-source distribution NPM package that is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [https://npmjs.com/](http://npmjs.com/).

Install jQuery as a project dependency:

```bash
  npm install --save jquery
```

### 4. Modify the package.json File

Add commands in the `package.json` file for building and running the application. 
Later we will use the `build` and `start` commands to build and run the app. 

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve --open",
    "build": "webpack"
  },
```

After the modification the `package.json` file will look like in the example below:

```json
    {
      "name": "my-kendo-webpack-app",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack serve --open",
        "build": "webpack"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "@progress/kendo-ui": "^{{site.cdnVersion}}",
        "jquery": "^4.0.0",
        "webpack": "^5.75.0",
        "webpack-cli": "^5.0.1",
        "webpack-dev-server": "^4.11.1"
      }
    }
```

### 5. Add Webpack Configuration File

In the root of the directory add the following `webpack.config.js` file:

Webpack uses a package's `exports` map when one is defined. Otherwise, the [module system]({% slug kendoui_npm_packages_kendoui_installation %}#4-bundling-the-scripts) depends on the order of the fields in `mainFields`. The following configuration places `module` first so Webpack selects the ECMAScript entry from the `esm` folder when that field is used.

jQuery 4 defines conditional package exports. When Webpack resolves its ECMAScript module entry, reference the named `$` export in the `ProvidePlugin` configuration. This prevents Webpack from injecting the module namespace object instead of the callable jQuery instance.

```javascript
    const path = require('path');
    var webpack = require('webpack');

    module.exports = {
      mode: 'development',
      entry: './src/index.js',
      devtool: 'inline-source-map',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
      },
      resolve: {
        mainFields: ['module', 'main','browser']    
      },
      devServer: {
        static: './dist',
      },  
      plugins: [
          new webpack.ProvidePlugin({
              $: ['jquery', '$'],
              jQuery: ['jquery', '$'],
              'window.jQuery': ['jquery', '$']
          })
      ]
    };
```

#### CommonJS and Older jQuery Versions

For older Kendo UI for jQuery package versions that do not define an `exports` map and use CommonJS, or for projects that use a jQuery version with a default/CommonJS export, place `main` first in `mainFields` and use the default module mapping. These settings are alternatives to the ECMAScript module configuration above.

```javascript
    module.exports = {
      // ...
      resolve: {
        mainFields: ['main', 'module', 'browser']
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ]
    };
```

### 6. Create The Index File

Create a folder named `dist` and add the `index.html` file in it.

```html
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Getting Started</title>
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{themesCdnVersion}/default/default-main.css">
        <script src="main.js"></script>
      </head>
      <body>
        <button id="btn">Button</button>
        <input id="dropdownlist" />
      </body>
    </html>
```

### 7. Initialize the Kendo Components

In the root directory add a new `src` folder that will contain the scripts. Then, add a `index.js` file and import the needed modules:

```javascript
    import '@progress/kendo-ui/esm/kendo.button.js'
    import '@progress/kendo-ui/esm/kendo.dropdownlist.js'

    $(function () {
        $("#btn").kendoButton();
        $("#dropdownlist").kendoDropDownList({
            dataSource: [
              { name: "Apples" },
              { name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "name"
          });
    
    });
```

### 8. Build and Run the Application

Execute the following commands to build and run the app:

```bash
    npm run build
    npm start
```

## See Also

* [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
