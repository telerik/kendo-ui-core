---
title: Integration with Kendo UI for the Web
page_title: Integration with Kendo UI for the Web | Kendo UI Hybrid Components
description: "Use Kendo UI hybrid mobile components outside the Kendo UI mobile application container."
previous_url: /controls/hybrid/regular-usage
slug: integrationkendouiweb_hybridkendoui
position: 1
---

# Integration with Kendo UI for the Web

As of the Kendo UI Q1 2014 release, the [Kendo UI hybrid for mobile devices](http://demos.telerik.com/kendo-ui/m/index) can be used alongside the Kendo UI widgets for the web in a regular web page, without an active mobile application instance.

## Basic Usage

This approach is suitable if you use Kendo UI hybrid UI with third-party Single-Page Application (SPA) frameworks like Angular or Backbone, or if you develop a mobile version of a web site which does not need native mobile app look. The Kendo UI Web CSS files contain the necessary rules, so that a unified look can be achieved.

> **Important**
>
> In addition to `kendo.common.css` and the skin stylesheet, the hybrid mobile widgets need one additional reference&mdash;`kendo.[skin].mobile.css` or `kendo.[skin].mobile.min.css`, where `[skin]` is your current Kendo UI web skin name. The stylesheets are available in the `Web/Complete bundles`. For instance, if the `Silver` Kendo UI web skin should be used for styling Kendo UI web and hybrid widgets, the stylesheet references shown in the example below are needed.

###### Example

    <link href="styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="styles/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <link href="styles/kendo.silver.mobile.min.css" rel="stylesheet" type="text/css" />

Additionally, these web mobile skins can be used with a normal hybrid mobile Kendo UI Application. Note that cannot be used with the Kendo UI mobile platform styling, so the Kendo UI mobile platform CSS&mdash;even the common styling&mdash;should not be loaded (everything needed is already included).

## Getting Started

### Instantiate the Hybrid Mobile Switch

The example below demonstrates how to instantiate a hybrid mobile Switch widget.

###### Example

    <input type="checkbox" id="my-switch" />

    <script>
        $("#my-switch").kendoMobileSwitch();
    </script>

## Known Limitations

- As a mobile application instance is missing, its features&mdash;declarative widget initialization, view transitions, and browser history binding among others&mdash;do not work.
- Unlike the application mode, this mode primarily targets mobile web sites. Thus the mobile OS skins&mdash;Android/iOS&mdash;are not supported.
- Certain Listview features&mdash;pull to refresh, endless scrolling, press to load more, fixed headers&mdash;rely on the mobile Scroller. The ListView widget should be instantiated in a mobile Scroller widget element.
- The mobile Drawer widget should have its [`container` configuration option](/api/javascript/mobile/ui/drawer#configuration-container) set. The Drawer is not going to close automatically when navigation is performed.

## See also

Other articles on the integration of Kendo UI hybrid components:

* [MVVM Integration]({% slug mvvmintegration_hybridkendoui %})
* [AngularJS Support for the Hybrid UI]({% slug angularjssupport_hybridkendoui %})
* [Build Applications with AngularJS and the Hybrid UI]({% slug buildappswithangular_tutorial_hybridkendoui %})
