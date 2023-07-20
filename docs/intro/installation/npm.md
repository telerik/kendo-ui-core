---
title: Installing with NPM
page_title: Installing with NPM - Download and Installation 
description: "Get started with Kendo UI for jQuery and install Kendo UI Core or Kendo UI as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 50
---

# Installing with NPM

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager.

This article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS. For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

## 1. Install the Package

Kendo UI for jQuery maintains the [commercial Kendo UI for jQuery (Kendo UI Professional)](#commercial-distribution-on-bower) and the [open-source Kendo UI for jQuery (Kendo UI Core)](#open-source-distribution-on-bower) NPM packages. 

All official releases, service packs, and internal builds are uploaded to both distribution packages.

### Commercial Distribution on NPM

The commercial distribution NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry. 

> As of the R2 2022 release, the `@progress/kendo-ui` NPM package requires a [script license activation]({% slug using-license-code %}).

To install `@progress/kendo-ui`, run the following command: 

```
  npm install --save @progress/kendo-ui
```

### Open-Source Distribution on NPM

The open-source distribution NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. 

To install `kendo-ui-core`, run the following command:

```
  npm install --save kendo-ui-core
```

## 2. Use the Proper NPM Channel 

As of November 2019, Kendo UI for jQuery supports two separate channels for its official and internal NPM packages.

The official releases and service packs for the commercial and open-source Kendo UI distributions are uploaded in the **latest** channel. To install the latest official build, run `npm install --save @progress/kendo-ui@latest`.

The internal builds are released in the **dev** channel. 

* To install the latest internal build, run `npm install --save @progress/kendo-ui@dev`. 
* To install an earlier version, run `npm install --save @progress/kendo-ui@2019.3.1115-internal`.

## 3. Choose a Module System 

The Kendo UI for jQuery library distributes the commercial code in the following module systems:

- (Available as of v2022.3.1109) ECMAScript—The script files are located in the `esm` folder. 
- (Available as of v2022.3.1109) UMD—The script files are located in the `umd` folder. 
- CommonJS—The script files are located in the `js` folder.

## 4. Bundling the Scripts

As of the 2022.3.1109 version, the `package.json` file comes with three [fields related to bundling](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main):

- `module`—Points to the ECMAScript `kendo.all.js` script in the `esm` folder.
- `main`—Points to the CommonJS `kendo.all.js` script in the `js` folder.
- `browser`—Points to the UMD `kendo.all.min.js` script in the `umd` folder.

To bundle the Kendo UI scripts by using one of the [module systems](#3-choose-a-module-system-to-use), you can use a plugin such as [rollup](https://rollupjs.org/guide/en/).

> Starting from version 2023.3.718, the `kendo` instance is exported as a default export for the CommonJS and ECMAScript modules. This allows you to:
> * Use the `import kendo from '@progress/kendo-ui'` syntax to import the Kendo UI scripts in your application. 
> * Use the `kendo` instance to get the jQuery in which the Kendo UI widgets are defined. For example, `const $ = kendo.jQuery; $("#grid").kendoGrid({...});`.

### ECMAScript

To bundle the ECMAScript files: 

1. Add a rollup configuration file in the main directory of your project.

    ```javascript
     // rollup.config.js
     import { nodeResolve } from '@rollup/plugin-node-resolve';

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
        plugins: [
          nodeResolve()
        ]
      }
    ```

2. Use the `import` keyword to include the Kendo UI scripts in your application:

    ```javascript
    // index.js file located in the main directory of your project (same level as rollup.config.js).

    import `jquery`;
    import `@progress/kendo-ui`;

    // A sample Kendo UI component in your project.
    $("#grid").kendoGrid({...grid configs...});
    ```

3. Open a terminal and execute the `rollup` command. As a result, the bundled script is located in the `dist/bundled.js` folder of your project.

    ```javascript
    npx rollup -c
    ```


### CommonJS

To bundle the CommonJS files: 

1. Add a rollup configuration file in the main directory of your project.

    ```javascript
     // rollup.config.js
     import { nodeResolve } from '@rollup/plugin-node-resolve';
     import commonjs from '@rollup/plugin-commonjs';

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
        plugins: [
          commonjs(), // Add the commonjs plugin.
          nodeResolve()
        ]
      }
    ```

2. Use the `require` keyword to include the Kendo UI scripts in your application:

    ```javascript
    // index.js file located in the main directory of your project (same level as rollup.config.js).

    require(`jquery`);
    require(`@progress/kendo-ui`);

    // A sample Kendo UI component in your project.
    $("#grid").kendoGrid({...grid configs...});
    ```

3. Open a terminal and execute the `rollup` command. As a result, the bundled script is located in the `dist/bundled.js` folder of your project.

    ```javascript
    npx rollup -c
    ```


### UMD

To bundle the UMD files: 

1. Add a rollup configuration file in the main directory of your project.

    ```javascript
     // rollup.config.js
     import { nodeResolve } from '@rollup/plugin-node-resolve';

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
        plugins: [
          nodeResolve({
            browser: true // Let rollup know that it has to use the browser field from the package.json file when creating the bundle. The browser field points to the UMD modules by default.
          })
        ]
      }
    ```

2. Use the `import` keyword to include the Kendo UI scripts in your application:

    ```javascript
    // index.js file located in the main directory of your project (same level as rollup.config.js).

    import `jquery`;
    import `@progress/kendo-ui`;

    // A sample Kendo UI component in your project.
    $("#grid").kendoGrid({...grid configs...});
    ```

3. Open a terminal and execute the `rollup` command. As a result, the bundled script will be located in the `dist/bundled.js` folder of your project.

    ```javascript
    npx rollup -c
    ```

## Known Issues 

* The Progress NPM registry was retired in favor of [npmjs.com](https://www.npmjs.com/). To start using the default registry, remove the two lines which contain `registry.npm.telerik.com` from your `.npmrc` file.
* The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as [WebPack]({% slug webpacksupport_integration_kendoui %}).
* After May 2017, the `kendo` legacy package that is available as a GitHub repository and is accessible through `git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git` will no longer be updated but will remain active.

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operation System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Component Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Installing with NPM]({% slug troubleshoot_npm_installing %})
* [Hosting Kendo UI for jQuery in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI for jQuery with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI for jQuery with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI for jQuery Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
