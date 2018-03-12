---
title: Electron
page_title: Electron | Kendo UI Third-Party Tools
description: "Learn how to use the Kendo UI widgets in an Electron application."
slug: electron_integration_kendoui
position: 12
---

# Electron

[Electron](https://electronjs.org/) is a framework for creating native applications with web technologies like JavaScript, HTML, and CSS.

## Adding CSS and JavaScript References

To use Kendo UI in your Electron projects, include the required JavaScript and CSS files.

### Using Local Files

Due to the Node.js integration of Electron, some extra symbols were inserted into the DOM&mdash;`module`, `exports`, and `require`. To include the scripts, use the `require` symbol.

##### Example

    <link href="lib/css/kendo.common.min.css" rel="stylesheet">
    <link href="lib/css/kendo.rtl.min.css" rel="stylesheet">
    <link href="lib/css/kendo.default.min.css" rel="stylesheet">
    <link href="lib/css/kendo.mobile.all.min.css" rel="stylesheet">

    <script>window.$ = window.jQuery = require('./lib/js/jquery.min.js');</script>
    <script>require('./lib/js/kendo.all.min.js')</script>

### Using CDN Services

Before you include the jQuery library, unset `module`.

##### Example

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.rtl.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.mobile.all.min.css">

    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script></head>
    <script>if (window.module) module = window.module;</script>

## Basic Usage

The following example assumes that the Kendo UI scripts and stylesheets were added to the document.

##### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        dataSource: {
            data: [
                { name: "Jane Doe", age: 30 },
                { name: "John Doe", age: 33 }
            ]
        }
    });
    </script>

## Sample Application

<a href="https://github.com/telerik/kendo-electron-dashboard" target="_blank"><img src="/images/northwind.png"></a>

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
* [Kinvey]({% slug kinveysupport_integration_kendoui %})
