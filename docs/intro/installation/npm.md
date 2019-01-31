---
title: NPM Packages
page_title: NPM Packages | Kendo UI Getting Started
description: "Install Kendo UI Core and Kendo UI Professional as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 3
---

# NPM Packages

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager.

This article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS.

For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

## Overview

Kendo UI maintains two NPM packages:

* [Kendo UI Core](#kendo-ui-core)
* [Kendo UI Professional](#kendo-ui-professional)

Official releases, service packs, and internal builds are published for each package.

> **Important**
> * The Kendo UI Professional NPM package is available only for commercial license holders. For more information, refer to the [list of Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).
> * The package is not accessible for trial user accounts.

## Kendo UI Core

The Kendo UI Core NPM Package is published as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/) and is accessible without credentials.

To install the Kendo UI Core NPM package, run `npm install --save kendo-ui-core`.

## Kendo UI Professional

The Kendo UI Professional NPM Package (@progress/kendo-ui) is available at the NPM registry.

> **Important**
>
> The Progress NPM registry was retired in favor of [npmjs.com](https://www.npmjs.com/). To start using the default registry, remove the two lines which contain `registry.npm.telerik.com` from your `.npmrc` file.

### Installation

To install the Kendo UI Professional NPM package, run `npm install --save @progress/kendo-ui`.

> **Important**
>
> The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as [WebPack]({% slug webpacksupport_integration_kendoui %}).

### Legacy Package

The `kendo` legacy package that is available as a GitHub repository and is accessible through `git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git` will not be updated after May 2017. The repository itself will remain active.

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI NPM packages.

### The jQuery Module Is Not Found

During the installation process, you might see the following error:

```
Error: Cannot find module 'jquery' from '/Users/bernhard/Documents/JavaScriptDevelopment/kendo-ui-npm-example/javascript-browserify'
```

The most probable cause of this issue is the usage of an old NPM version.

**Solution**

Use an NPM ^3.0.0 version.

## See Also

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
