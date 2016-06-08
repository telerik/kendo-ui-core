---
title: JavaScript Prerequisites
page_title: JavaScript Prerequisites | Kendo UI Getting Started
description: "Learn about the JavaScript prerequisites for installing Kendo UI widgets and frameworks."
previous_url: /install/prerequisites, /javascript-dependencies, /intro/prerequisites
slug: javascript_prerequisites_kendoui_installation
position: 5
---

# JavaScript Prerequisites

## jQuery

The Kendo UI library is based on [jQuery](http://jquery.com/). All Kendo UI bundles include the corresponding minified jQuery library in the `js` directory.

> **Important**
>  
> In order for the Kendo UI scripts to work as expected, make sure you include a reference to the jQuery library in the document before the scripts.

### Supported jQuery Versions

The current official version of Kendo UI requires jQuery 1.12.3. There are cases when a new jQuery version is released. This new version usually introduces breaking changes and is not compatible with the existing Kendo UI versions. In such cases, it is recommended that you use the previous jQuery version until the next official Kendo UI version which resolves the problem is released. Normally, the jQuery version that is shipped with the Kendo UI service packs is not changed, but is updated in major releases.

The following list provides jQuery compatibility information about the major Kendo UI releases and their corresponding service packs:

| Major Releases												                                         | jQuery Version    | Comments  |
| :---															                                             | :---			         | :---	     |
| [Kendo UI 2016.2.504 (R2 2016)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q2-2016)	|1.12.3| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2016.1.112 (Q1 2016)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q1-2016)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2015.3.930 (Q3 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2015)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2015.2.624 (Q2 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2015)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2015.1.318 (Q1 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q1-2015)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.3.1119 (Q3 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.2.716 (Q2 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2014)	|1.9.1| Also compatible with 1.10.x and 2.1.x|
| [Kendo UI 2014.1.318 (Q1 2014)]({%slug breakingchanges2014_kendoui%}#kendo-ui-2014-q1)	                    |1.9.1| Also compatible with 1.10.x and 2.0.x|
| [Kendo UI 2013.3.1119 (Q3 2013)]({%slug breakingchanges2014_kendoui%}#kendo-ui-2014-q3)	                |1.9.1| Also compatible with 1.10.x and 2.0.x|
| [Kendo UI 2013.2.716 (Q2 2013)]({% slug breakingchanges2013_kendoui%}#kendo-ui-2013-q2)	                    |1.9.1| - |
| [Kendo UI 2013.1.319 (Q1 2013)]({% slug breakingchanges2013_kendoui %}#kendo-ui-2013-q1)	                    |1.9.1| - |
| [Kendo UI 2012.3.1114 (Q3 2012)]({% slug breakingchanges2012_kendoui %}#kendo-ui-2012-q3)	                |1.8.2| - |
| [Kendo UI 2012.2.710 (Q2 2012)]({% slug breakingchanges2012_kendoui %}#kendo-ui-2012-q2)	                    |1.7.1| - |
| [Kendo UI 2012.1.322 (Q1 2012)]({% slug breakingchanges2012_kendoui %}#kendo-ui-2012-q1-20121322)	        |1.7.1| - |
| [Kendo UI 2011.3.1129 (Q3 2011)]({% slug breakingchanges2012_kendoui %}#changes-from-2011-q3-sp1-201131407)  |1.7.1| - |

### Previous Versions Required

Occasionally, a legacy web application might require an older jQuery version with which Kendo UI components are not compatible. In such cases, use a recent jQuery version together with [jQuery `Migrate`](https://github.com/jquery/jquery-migrate/). The plug-in restores the jQuery features that have been depreciated and provides for the required backward compatibility.

## AngularJS

As of the Kendo UI 2014 Q2 release, Kendo UI widgets support [AngularJS](https://angularjs.org/) integration. To activate the AngularJS directives, install the AngularJS library. Just like jQuery, its minified format is located is in the `js` directory of the Kendo UI bundle you have downloaded.

> **Important**
>
> To function correctly and unlike jQuery, the Kendo UI distributions do not need AngularJS.

### Supported AngularJS Versions

| Major Releases												           | AngularJS Version     | Comments  |
| :---															               | :---			       	     | :---	     |
| [Kendo UI 2016.2.504 (R2 2016)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q2-2016) |1.4.0+|- |
| [Kendo UI 2016.1.112 (Q1 2016)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q1-2016) |1.4.0+|- |
| [Kendo UI 2015.3.930 (Q3 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2015)		      |1.4.0+|- |
| [Kendo UI 2015.2.624 (Q2 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2015)		      |1.3.16|- |
| [Kendo UI 2015.1.318 (Q1 2015)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q1-2015)		      |1.3.0 |- |
| [Kendo UI 2014.3.1119 (Q3 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014)		      |1.3.0 |- |
| [Kendo UI 2014.2.716 (Q2 2014)](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q2-2014)		      |1.2.16|Upgraded to 1.2.21 in subsequent internal builds|

> **Important**
>
> Using AngularJS 1.5 is not recommended because of this [known issue](http://docs.telerik.com/kendo-ui/AngularJS/Troubleshooting/common-issues#widgets-with-ng-model-directives-reflect-no-model-value).

## Other

### JSZip Library

The [JSZip library](https://stuk.github.io/jszip/) is a necessary prerequisite for configuring your widgets so as to support the [Excel export feature]({% slug introduction_excelexport_kendoui %}). The Excel export feature was first included in the [Kendo UI 2014.3.1119 (Q3 2014) release]({% slug breakingchanges2014_kendoui%}). However, you need the JSZip library only if you want to support the Excel export feature.

### Tag Placement: script

Generally, it is recommended that you place the `script` tags before the closing `body` tag, so that the scripts are loaded and executed after the HTML markup. Usually, the Kendo UI widget initialization statements are executed in the `document.ready` event through a jQuery handler. This means that jQuery must be registered _before_ any Kendo UI widget initialization statements. When using the client-side Kendo UI widgets, you can control the placement of the initialization statements, so that the jQuery script file can be registered at the bottom of the document.

The server-side wrappers for the Kendo UI widgets are self-initialized. This means that each initialization script is rendered right after the HTML markup of the widget. In this case, the Kendo UI scripts can still be registered at the end of the document, but the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
