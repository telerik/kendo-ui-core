---
title: Webpack
page_title: Webpack - Kendo UI Third-Party Tools
description: "Package Kendo UI with Webpack."
slug: webpacksupport_integration_kendoui
---

# Webpack

The recommended approach to include Kendo UI is by using the NPM package.

## Using NPM

As of the Kendo UI 2016 Q2 SP1 release, both Kendo UI Core and Kendo UI Professional are distributed in an NPM format. For more details, refer to [the installation instructions]({% slug kendoui_npm_packages_kendoui_installation %}).

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. 
The Kendo UI NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry.

> * The typescript step is optional&mdash;the NPM package can be consumed from vanilla JavaScript or with the Babel transpiler.
> * The Kendo UI [TypeScript typings are global](https://github.com/typings/typings/blob/master/docs/faq.md#what-are-global-dependencies). This means that TypeScript will complain if you try to import the `kendo` object. Use the global reference instead.

```typescript
// This won't work
import kendo from 'kendo-ui-core';

// This works
import 'kendo-ui-core'; //or import '@progress/kendo-ui' to install the Kendo UI package

console.log(kendo);
```
## Using in JavaScript and TypeScript Applications

To see the runnable examples on how to use Kendo UI with Webpack in both JavaScript and TypeScript applications, refer to the following [sample repository](https://github.com/telerik/kendo-ui-npm-example).


## Module System

The Kendo UI for jQuery library distributes the commercial code in the following module systems:

(Available as of v2022.3.1109) ECMAScript—The script files are located in the `esm` folder.
(Available as of v2022.3.1109) UMD—The script files are located in the `umd` folder.
CommonJS—The script files are located in the js folder.

This sections below demonstrate the necessary Webpack configuration setup with the ECMAScript scripts located in the esm folder.


## Building the ES Modules Scripts


### 1. Initialize the Default NPM Settings

Run the following command to create the `package.json` and initialize the default NPM settings.

```
npm init
```

### 2. Install the Webpack Dependencies

You can install the [Webpack development server](https://www.npmjs.com/package/webpack-dev-server) and [Webpack CLI](https://www.npmjs.com/package/webpack-cli) with the following command.

```
npm install -save webpack webpack-cli webpack-dev-server
```

### 3. Install the Kendo NPM Package

The commercial distribution NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry. 
The following command will install the commercial distribution package:
```
  npm install --save @progress/kendo-ui
```

Alternatively, you can install the open-source distribution NPM package that is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [https://npmjs.com/](http://npmjs.com/).

### 4. Modify the package.json File
Add commands in the `package.json` file for building and running the application. 
Later we will use the `build` and `start` commands to build and run the app. 

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve --open",
    "build": "webpack"
  },
```

After the modification the `package.json` file will look like in the example below:
```
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
        "webpack": "^5.75.0",
        "webpack-cli": "^5.0.1",
        "webpack-dev-server": "^4.11.1"
      }
    }
``` 

### 5. Add Webpack Configuration File
In the root of the directory add the following `webpack.config.js` file:

Note, that which [module system]({% slug kendoui_npm_packages_kendoui_installation %}#4-bundling-the-scripts) will be used depends on the order the modules are listed in the `mainFields` field. 
In the current sample we will use the ECMAScript modules and the files located in the `esm` folder. Thus, the `module` string is placed first in the list. 

```
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
              $: 'jquery',
              jQuery: 'jquery'
          })
      ]
    };
```

### 6. Create The Index File

Create a folder named `dist` and add the `index.html` file in it.

```
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
```
    import '@progress/kendo-ui/esm/kendo.button'
    import '@progress/kendo-ui/esm/kendo.dropdownlist'

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
```
    npm run build
    npm start
```

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
