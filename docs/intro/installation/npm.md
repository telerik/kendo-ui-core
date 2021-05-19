---
title: Installing with NPM
page_title: Installing with NPM | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and install Kendo UI Core or Kendo UI as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 5
---

# Installing with NPM

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager.

This article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS. For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

Kendo UI maintains the [Kendo UI Core](#kendo-ui-core-on-npm) and the [Kendo UI](#kendo-ui-on-npm) NPM packages. All Kendo UI official releases, service packs, and internal builds are uploaded to both of them.

> The Kendo UI NPM package is available only for commercial license holders. For more information, refer to the [list of Kendo UI components and their bundle support]({% slug welcometo_kendoui %}#list-of-widgets).

## Kendo UI Core on NPM

The Kendo UI Core NPM package is available as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials. To install the package, run `npm install --save kendo-ui-core`.

## Kendo UI on NPM

The Kendo UI NPM package is available as [`@progress/kendo-ui`](https://www.npmjs.com/package/@progress/kendo-ui) in the NPM registry. To install the package, run `npm install --save @progress/kendo-ui`.

> * The Progress NPM registry was retired in favor of [npmjs.com](https://www.npmjs.com/). To start using the default registry, remove the two lines which contain `registry.npm.telerik.com` from your `.npmrc` file.
> * The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as [WebPack]({% slug webpacksupport_integration_kendoui %}).
> * After May 2017, the `kendo` legacy package that is available as a GitHub repository and is accessible through `git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git` will no longer be updated but will remain active.

## NPM Channels for Kendo UI packages

As of November 2019, there are two separate channels for the Internal and Official NPM packages. The official releases and Service Packs for Kendo UI and Kendo UI Core are distributed in the "latest" channel. The internal builds are released in the "dev" channel. 

To install the latest internal build, run `npm install --save @progress/kendo-ui@dev`. If you wish to install an older version, run `npm install --save @progress/kendo-ui@2019.3.1115-internal`. 

To install the latest official build, run `npm install --save @progress/kendo-ui@latest`.

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI NPM packages.

### The jQuery module is not found

**Description** During the installation process, you might see the `Error: Cannot find module 'jquery' from '/Users/bernhard/Documents/JavaScriptDevelopment/kendo-ui-npm-example/javascript-browserify'` error.

**Cause** Most probably, you use an earlier NPM version.

**Solution** Update to an NPM ^3.0.0 version.

## Next Steps

* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Check out the web browser support]({% slug wbe_browserand_operating_system_support %})
* [Check out the operation system support]({% slug ossupport_kendo %})
* [Check out the PDF and Excel export support]({% slug export_support_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
