---
title: Visual Studio IntelliSense
page_title: Visual Studio IntelliSense | Kendo UI Third-Party Tools
description: "Learn how to reference the Kendo UI Visual Studio IntelliSense by using an additional vsdoc or IntelliSense JavaScript file."
previous_url: /vs-intellisense
slug: visualstudiointellisense_integration_kendoui
position: 6
---

# Visual Studio IntelliSense

Kendo UI provides Intelligent code completion for Visual Studio by using an additional `vsdoc` JavaScript file. The approach was initially described in Scott Guthrie's blog post [jQuery Intellisense in VS 2008](http://weblogs.asp.net/scottgu/archive/2008/11/21/jquery-intellisense-in-vs-2008.aspx). Kendo UI Visual Studio IntelliSense is integrated in Visual Studio 2008 SP1 or later versions and it also works with Visual Web Developer (free).

## Installation

Each bundle package contains a `vsdoc` directory, which contains a `vsdoc.js` and `intellisense.js` files. Visual Studio 2008 SP1 or later users should put the `vsdoc.js` file next to the `kendoui` bundle script, while Visual Studio 2012 users should use the `intellisense.js` file. Make sure its naming prefix matches the `kendoui` bundle name.

- Visual Studio 2008 SP1

![Solution Explorer](/images/vsdoc/solution-explorer.png)

- Visual Studio 2012

![Solution Explorer VS2012](/images/vsdoc/solution-explorer-vs2012.png)

## Features

### Widget Initialization Configuration Options

![jquery plugin](/images/vsdoc/jquery-plugin.png)

### Widget Accessors

![jquery plugin](/images/vsdoc/jquery-accessor.png)

### Widget Methods

![jquery plugin](/images/vsdoc/widget-method.png)

## Reference

There are two ways to reference the IntelliSense:

1. Reference the Kendo UI Visual Studio IntelliSense when the script is directly added to a page as shown above. The `kendo.all-vsdoc.js` and `kendo.all.min.intellisense.js` files are also available on the [Kendo UI CDN]({% slug kendoui_cdn_services_installation %}) in the same folder as the regular JavaScript files.
1. Reference the IntelliSense by using a reference hint from within an external JavaScript file as shown below:

![script reference](/images/vsdoc/js-reference.png)

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
