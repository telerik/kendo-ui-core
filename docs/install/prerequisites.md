---
title: JavaScript Prerequisites
page_title: Kendo UI JavaScript prerequisites - jQuery and AngularJS
description: "Overview of the JavaScript libraries which Kendo UI depends on"
position: 1
---

# Kendo UI JavaScript prerequisites

## jQuery

The Kendo UI library is based on [jQuery](http://jquery.com/). All Kendo UI bundles include the corresponding minified jQuery library in the `js` directory.

> In order for the Kendo UI scripts to work as expected, a reference to the jQuery library should be included in the document before them.

### Supported jQuery versions

The current official version of Kendo UI requires **jQuery 1.9.1**. There are occasions in which a new jQuery version is released, which introduces breaking changes and is not compatible with existing Kendo UI versions.
In such cases we recommend using the previous jQuery version until the next official Kendo UI release that resolves the problems. We normally do not change the jQuery version that is shipped
with Kendo UI service packs. We can do this for major releases.

The following list provides jQuery compatibility information about the major Kendo UI releases and their corresponding service packs:

* Kendo UI 2014.3.1119 (Q3 2014) - jQuery 1.9.1 (also works with 1.10.x and 2.0.x)
* Kendo UI 2014.2.716 (Q2 2014) - jQuery 1.9.1 (also works with 1.10.x and 2.0.x)
* Kendo UI 2014.1.318 (Q1 2014) - jQuery 1.9.1 (also works with 1.10.x and 2.0.x)
* Kendo UI 2013.3.1119 (Q3 2013) - jQuery 1.9.1 (also works with 1.10.x and 2.0.x)
* Kendo UI 2013.2.716 (Q2 2013) - jQuery 1.9.1
* Kendo UI 2013.1.319 (Q1 2013) - jQuery 1.9.1
* Kendo UI 2012.3.1114 (Q3 2012) - jQuery 1.8.2
* Kendo UI 2012.2.710 (Q2 2012) - jQuery 1.7.1
* Kendo UI 2012.1.322 (Q1 2012) - jQuery 1.7.1
* Kendo UI 2011.3.1129 (Q3 2011) - jQuery 1.7.1

### What to do when an older jQuery version is required

There may be cases when a legacy web application requires an older jQuery version, but Kendo UI does not work with it.
The recommended approach in such scenarios is to use a **new** jQuery version together with
**[jquery-migrate](https://github.com/jquery/jquery-migrate/)**, which will provide the required backwards compatibility of the new jQuery with the old legacy Javascript code.

## AngularJS

Since the Q2 2014 release, Kendo UI includes [AngularJS](http://angularjs.org/) directives. The directives will be activated if the AngularJS library is present.
Just like jQuery, the Kendo UI bundles include the corresponding AngularJS minified library in the `js` directory.

> Unlike jQuery, AngularJS is *not required* for Kendo UI to function correctly.

### Supported AngularJS versions

* Kendo UI 2014.3.1119 (Q3 2014) - AngularJS 1.3.0
* Kendo UI 2014.2.716 (Q2 2014) - AngularJS 1.2.16 (upgraded to 1.2.21 in subsequent internal builds)

## Excel export

The [Excel export feature](http://docs.telerik.com/kendo-ui/framework/excel/introduction), available since Q3 2014, depends upon the [JsZip library](https://stuk.github.io/jszip/).

> The JsZip library is *not required* if you do not configure the widgets to support Excel exporting.

## Script tag placement

There is a general recommendation to place `script` tags before the closing `body` tag, so that the scripts are loaded and executed after the HTML markup. Usually, the Kendo UI widget
initialization statements are executed in the `document.ready` event via a jQuery handler. This means that jQuery **must be registered** before any Kendo UI widget initialization statements. When using
the client-side Kendo UI widgets you can control the initialization statements' placement, so the jQuery script file can be registered at the bottom of the document.

The Kendo UI widgets' **server wrappers** are self-initialized, which means that each initialization script is rendered **right after the widget's HTML markup**.
In this case the Kendo UI scripts can still be registered at the end of the document, but the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.
