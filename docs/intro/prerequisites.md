---
title: Kendo UI JavaScript Prerequisites
page_title: Kendo UI JavaScript prerequisites
description: "Overview of the JavaScript libraries which Kendo UI depends on"
previous_url: /install/prerequisites
position: 2
---

# Kendo UI JavaScript Prerequisites

In this section you will find basic requirements regarding JavaScript that you are going to need in order to start exploring the full set of Kendo UI functionalities on your devices:  

* [jQuery](http://docs.telerik.com/kendo-ui/install/prerequisites#jquery)
* [AngularJS](http://docs.telerik.com/kendo-ui/install/prerequisites#angularjs)
* [JSZip Library](http://docs.telerik.com/kendo-ui/install/prerequisites#jszip-library) 
* [The `script` Tag Placement](http://docs.telerik.com/kendo-ui/install/prerequisites#the-script-tag-placement)

## jQuery

The Kendo UI library is based on [jQuery](http://jquery.com/). All Kendo UI bundles include the corresponding minified jQuery library in the `js` directory.

> In order for the Kendo UI scripts to work as expected, make sure you include a reference to the jQuery library in the document before the scripts.

### Supported jQuery Versions

The current official version of Kendo UI requires jQuery 1.9.1. There are occasions when a new jQuery version is released. This new version usually introduces breaking changes and is not compatible with the existing Kendo UI versions. In such cases we recommend using the previous jQuery version until the next official Kendo UI version, which resolves the problem, is released. We do not normally change the jQuery version that is shipped with the Kendo UI service packs, but we do update it in major releases.

The following list provides jQuery compatibility information about the major Kendo UI releases and their corresponding service packs:

| Major Releases				| jQuery Version	| Comments								|
| :---------------------------- | :---------------: | :-----------------------------------: |  
| Kendo UI 2015.2.624 (Q2 2015)	| 1.9.1				| Also compatible with 1.10.x and 2.1.x	|
| Kendo UI 2015.1.318 (Q1 2015)	| 1.9.1				| Also compatible with 1.10.x and 2.1.x	|
| Kendo UI 2014.3.1119 (Q3 2014)| 1.9.1				| Also compatible with 1.10.x and 2.1.x	|
| Kendo UI 2014.2.716 (Q2 2014)	| 1.9.1				| Also compatible with 1.10.x and 2.1.x	|
| Kendo UI 2014.1.318 (Q1 2014)	| 1.9.1				| Also compatible with 1.10.x and 2.0.x	|
| Kendo UI 2013.3.1119 (Q3 2013)| 1.9.1				| Also compatible with 1.10.x and 2.0.x	|
| Kendo UI 2013.2.716 (Q2 2013)	| 1.9.1				| -										|
| Kendo UI 2013.1.319 (Q1 2013)	| 1.9.1				| -										|
| Kendo UI 2012.3.1114 (Q3 2012)| 1.8.2				| -										|
| Kendo UI 2012.2.710 (Q2 2012)	| 1.7.1				| -										|
| Kendo UI 2012.1.322 (Q1 2012)	| 1.7.1				| -										|
| Kendo UI 2011.3.1129 (Q3 2011)| 1.7.1				| -										|

### What to Do When a Previous jQuery Version Is Required

There may occur cases when a legacy web application requires a previous jQuery version, but Kendo UI is not compatible with it. The recommended approach in such scenarios is to use a new jQuery version together with [jQuery Migrate](https://github.com/jquery/jquery-migrate/), which will provide the required backward compatibility of the new jQuery with the old legacy JavaScript code.

## AngularJS

Since the Q2 2014 release, Kendo UI includes [AngularJS](http://angularjs.org/) directives. The directives will be activated if the AngularJS library is present. Just like jQuery, the Kendo UI bundles include the corresponding AngularJS minified library in the `js` directory.

> Unlike jQuery, AngularJS is not required for Kendo UI to function correctly.

### Supported AngularJS versions


| Major Releases				| AngularJS Version	| Comments									|
| :---------------------------- | :---------------: | :---------------------------------------: |  
| Kendo UI 2015.2.624 (Q2 2015)	| 1.3.16			| -											|
| Kendo UI 2015.1.318 (Q1 2015)	| 1.3.0				| -											|
| Kendo UI 2014.3.1119 (Q3 2014)| 1.3.0				| -											|
| Kendo UI 2014.2.716 (Q2 2014)	| 1.2.16			| Upgraded to 1.2.21 in subsequent internal builds |

## JSZip Library

The [JSZip library](https://stuk.github.io/jszip/) is a necessary prerequisite if you want to configure your widgets in such a way as to support the [Excel export feature](http://docs.telerik.com/kendo-ui/framework/excel/introduction). The Excel export feature was released for the first time with Kendo UI 2014.3.1119 (Q3 2014). However, you will not need the JSZip library if you do not need the Excel export feature to be supported.

## The `script` Tag Placement

There is a general recommendation to place `script` tags before the closing `body` tag, so that the scripts are loaded and executed after the HTML markup. Usually, the Kendo UI widget
initialization statements are executed in the `document.ready` event via a jQuery handler. This means that jQuery must be registered before any Kendo UI widget initialization statements. When using the client-side Kendo UI widgets, you can control the placement of the initialization statements, so that the jQuery script file can be registered at the bottom of the document.

The server-wrappers for the Kendo UI widgets are self-initialized, which means that each initialization script is rendered right after the HTML markup of the widget. In this case the Kendo UI scripts can still be registered at the end of the document, but the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.
