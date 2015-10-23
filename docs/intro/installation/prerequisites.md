---
title: JavaScript Prerequisites
page_title: JavaScript Prerequisites
description: "Overview of JavaScript prerequisites for installing Kendo UI widgets and frameworks."
previous_url: /install/prerequisites, /javascript-dependencies, /intro/prerequisites
position: 5
---

# JavaScript Prerequisites

## jQuery

The Kendo UI library is based on [jQuery](http://jquery.com/). All Kendo UI bundles include the corresponding minified jQuery library in the `js` directory.

> **Important**  
> In order for the Kendo UI scripts to work as expected, make sure you include a reference to the jQuery library in the document before the scripts.

### Supported jQuery Versions

The current official version of Kendo UI requires jQuery 1.9.1. There are occasions when a new jQuery version is released. This new version usually introduces breaking changes and is not compatible with the existing Kendo UI versions. In such cases we recommend using the previous jQuery version until the next official Kendo UI version, which resolves the problem, is released. We do not normally change the jQuery version that is shipped with the Kendo UI service packs, but we do update it in major releases.

The following list provides jQuery compatibility information about the major Kendo UI releases and their corresponding service packs:

| Major Releases												| jQuery Version| Comments|
| :---															| :---			| :---	  |
| [Kendo UI 2015.2.624 (Q2 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2015)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2015.1.318 (Q1 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q1-2015)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.3.1119 (Q3 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.2.716 (Q2 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2014)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.1.318 (Q1 2014)](/install/changes-and-backward-compatibility)	|1.9.1| Also compatible with 1.10.x and 2.0.x|
| [Kendo UI 2013.3.1119 (Q3 2013)](/install/changes-and-backward-compatibility)	|1.9.1| Also compatible with 1.10.x and 2.0.x|
| [Kendo UI 2013.2.716 (Q2 2013)](/install/changes-and-backward-compatibility)	|1.9.1| - |
| [Kendo UI 2013.1.319 (Q1 2013)](/install/changes-and-backward-compatibility)	|1.9.1| - |
| [Kendo UI 2012.3.1114 (Q3 2012)](/install/changes-and-backward-compatibility)	|1.8.2| - |
| [Kendo UI 2012.2.710 (Q2 2012)](/install/changes-and-backward-compatibility)	|1.7.1| - |
| [Kendo UI 2012.1.322 (Q1 2012)](/install/changes-and-backward-compatibility)	|1.7.1| - |
| [Kendo UI 2011.3.1129 (Q3 2011)](/install/changes-and-backward-compatibility)	|1.7.1| - |

### What to Do If a Previous jQuery Version Is Required

Occasionally, a legacy web application might require an older jQuery version with which Kendo UI components are not compatible. In these cases you can use a recent jQuery version together with [jQuery Migrate](https://github.com/jquery/jquery-migrate/). The plug-in will restore the jQuery features that have been depreciated and will provide for the required backward compatibility.

## AngularJS

From Q2 2014 release onward, Kendo UI widgets support [AngularJS](https://angularjs.org/) integration. To activate the AngularJS directives, you need to install the AngularJS library. Just like jQuery, its minified format is located is in the `js` directory of the Kendo UI bundle you have downloaded.

> **Important**  
> Unlike jQuery, Kendo UI distributions do not need AngularJS in order to function correctly.

### Supported AngularJS Versions

| Major Releases												 | AngularJS Version| Comments|
| :---															 | :---				| :---	  |
| [Kendo UI 2015.2.624 (Q2 2015)](/install/changes-and-backward-compatibility)		|1.3.16|- |
| [Kendo UI 2015.1.318 (Q1 2015)](/install/changes-and-backward-compatibility)		|1.3.0 |- |
| [Kendo UI 2014.3.1119 (Q3 2014)](/install/changes-and-backward-compatibility)		|1.3.0 |- |
| [Kendo UI 2014.2.716 (Q2 2014)](/install/changes-and-backward-compatibility)		|1.2.16|Upgraded to 1.2.21 in subsequent internal builds|

## JSZip Library

The [JSZip library](https://stuk.github.io/jszip/) is a necessary prerequisite if you want to configure your widgets so as to support the [Excel export feature](http://docs.telerik.com/kendo-ui/framework/excel/introduction). The Excel export feature was first included in the [Kendo UI 2014.3.1119 (Q3 2014) release](/install/changes-and-backward-compatibility). However, you will not need the JSZip library if you do not need the Excel export feature to be supported.

## The `script` Tag Placement

Generally, we recommend that you place `script` tags before the closing `body` tag, so that the scripts are loaded and executed after the HTML markup. Usually, the Kendo UI widget initialization statements are executed in the `document.ready` event via a jQuery handler. This means that jQuery must be registered before any Kendo UI widget initialization statements. When using the client-side Kendo UI widgets, you can control the placement of the initialization statements, so that the jQuery script file can be registered at the bottom of the document.

The server-wrappers for the Kendo UI widgets are self-initialized, which means that each initialization script is rendered right after the HTML markup of the widget. In this case the Kendo UI scripts can still be registered at the end of the document, but the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.
