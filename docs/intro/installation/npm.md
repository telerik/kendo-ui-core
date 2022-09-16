---
title: Installing with NPM
page_title: Installing with NPM | Download and Installation 
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


## 2. Use the Proper NPM Channel for Official and Internal Packages

As of November 2019, Kendo UI for jQuery supports two separate channels for its official and internal NPM packages.

The official releases and service packs for the commercial and open-source Kendo UI distributions are uploaded in the **latest** channel. To install the latest official build, run `npm install --save @progress/kendo-ui@latest`.

The internal builds are released in the **dev** channel. 

* To install the latest internal build, run `npm install --save @progress/kendo-ui@dev`. 
* To install an earlier version, run `npm install --save @progress/kendo-ui@2019.3.1115-internal`.


## Known Issues 

* The Progress NPM registry was retired in favor of [npmjs.com](https://www.npmjs.com/). To start using the default registry, remove the two lines which contain `registry.npm.telerik.com` from your `.npmrc` file.
* The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as [WebPack]({% slug webpacksupport_integration_kendoui %}).
* After May 2017, the `kendo` legacy package that is available as a GitHub repository and is accessible through `git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git` will no longer be updated but will remain active.

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Widget DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Widgets as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operation System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Widget Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create Your Own Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Installing with NPM]({% slug troubleshoot_npm_installing %})
* [Hosting Kendo UI for jQuery in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI for jQuery with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI for jQuery with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI for jQuery Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
