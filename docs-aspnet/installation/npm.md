---
title: Installing with NPM
page_title: Installing with NPM
description: "Get started with Telerik UI for ASP.NET Core and install NPM packages of the helpers."
previous_url: /getting-started/installation/npm
slug: npmpackages_core
position: 4
---

# Installing with NPM

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager.

This article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS. For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

Telerik UI for ASP.NET Core is a set of server-side wrappers that wrap Kendo UI for jQuery widgets. Kendo UI maintains the [Kendo UI Core](#kendo-ui-core-on-npm) and the [Kendo UI Professional](#kendo-ui-professional-on-npm) NPM packages. All Kendo UI official releases, service packs, and internal builds are uploaded to both of them.

> The Kendo UI Professional NPM package is available only for commercial license holders. For more information, refer to the [list of Kendo UI components and their bundle support](https://docs.telerik.com/kendo-ui/introduction#list-of-widgets).

## Kendo UI Core on NPM

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. To install the package, run `npm install --save kendo-ui-core`.

## Kendo UI Professional on NPM

The Kendo UI Professional NPM package is available as `@progress/kendo-ui` in the NPM registry. To install the package, run `npm install --save @progress/kendo-ui`.

> * The Progress NPM registry was retired in favor of [npmjs.com](https://www.npmjs.com/). To start using the default registry, remove the two lines which contain `registry.npm.telerik.com` from your `.npmrc` file.
> * The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as WebPack.
> * After May 2017, the `kendo` legacy package that is available as a GitHub repository and is accessible through `git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git` will no longer be updated but will remain active.

## Using NPM and Webpack

1. If the project is created through **Create New Project Wizard**, remove the `bower.json` file. Otherwise, skip this step.
1. Add the `package.json` file.

        {
            "name": "ApplicationName",
            "version": "1.0.0",
            "description": "",
            "main": "main.js",
            "scripts": {
                "build": "webpack"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
                "css-loader": "^1.0.0",
                "jquery": "^3.2.1",
                "popper.js": "^1.12.6",
                "style-loader": "^0.21.0",
                "@progress/kendo-theme-default": "^2.54.1",
                "@progress/kendo-ui": "{{ site.cdnVersion }}"
            },
            "devDependencies": {
                "webpack": "^4.12.0",
                "webpack-cli": "^3.0.8"
            }
        }

1. Add the `webpack.config.js` file.

        const path = require('path');
        const webpack = require('webpack');

        module.exports = {
            entry: './main.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'wwwroot')
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                }),
            ],
        }

1. Create a `main.js` file with the following content.

    > As both `jQuery` and `$` are used throughout the application, jQuery is assigned to both variables in the global scope.

        import $ from 'jquery';
        window.jQuery = $; window.$ = $;

        import "@progress/kendo-ui";
        import "@progress/kendo-ui/js/kendo.aspnetmvc";
        import "@progress/kendo-theme-default/dist/all.css";


1. Open the command prompt and navigate to the folder of the project.
1. Run the `npm install && npm run build` commands.
1. In `~/Views/Shared/_Layout.cshtml`, replace the Kendo UI CDN scripts with the script that references `bundle.js`.

        <script src="~/bundle.js"></script>

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI NPM packages.

### The jQuery module is not found

**Description** During the installation process, you might see the `Error: Cannot find module 'jquery' from '/Users/bernhard/Documents/JavaScriptDevelopment/kendo-ui-npm-example/javascript-browserify'` error.

**Cause** Most probably, you use an earlier NPM version.

**Solution** Update to an NPM ^3.0.0 version.

## Next Steps

* [Create your own custom bundles]({% slug custombundles_core %})
* [Check out the jQuery version support]({% slug jquerysupport_core %})
* [Check out the web browser support]({% slug webbrowsersupport_core %})
* [Check out the operation system support]({% slug ossupport_core %})
* [Check out the PDF and Excel export support]({% slug exportsupport_core %})
* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with Bower]({% slug bowerpackage_core %})
* [Installing Telerik UI for ASP.NET Core by Using the CDN Services]({% slug cdnservices_core %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
