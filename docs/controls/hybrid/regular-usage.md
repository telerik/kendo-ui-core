---
title: Using with Kendo UI Web
page_title: How to guide on using mobile widgets outside of a Kendo UI Mobile application container
---

Starting with the 2014 Q1 release, the Kendo UI Mobile widgets can be used alongside the Kendo UI Web widgets in a regular web page, *without an active mobile application instance*.
This approach is suitable if you use Kendo UI Mobile with third-party SPA frameworks like Angular or Backbone, or if you develop a mobile version of a web site which does not need native mobile app look.
The Kendo UI Web CSS files contain the necessary rules, so that unified look can be achieved.

> In addition to **kendo.common.css** and the skin stylesheet, the mobile widgets need one additional reference - **kendo.[skin].mobile.css** or **kendo.[skin].mobile.min.css**, where [skin] is your current Kendo UI Web skin name.
The stylesheets are available in the **Web/Complete bundles**. For instance, if the **Silver** Kendo UI Web skin should be used for styling Kendo UI Web and Mobile widgets, the following stylesheet references are needed:

#### Loading the Silver Web and Mobile skins:

    <link href="styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="styles/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <link href="styles/kendo.silver.mobile.min.css" rel="stylesheet" type="text/css" />

Additionally, these Web Mobile skins can be used with a normal Kendo UI Mobile Application, with a catch - they **can't be used** with the Kendo UI Mobile platform styling,
so the Kendo UI Mobile platform CSS (even the common styling) should **not** be loaded (everything needed is already included).

## Instantiating a mobile switch widget

    <input type="checkbox" id="my-switch" />

    <script>
        $("#my-switch").kendoMobileSwitch();
    </script>


## Limitations and Caveats

- As a mobile application instance is missing, its features (declarative widget initialization, view transitions, browser history binding, etc.) will not work.
- Unlike the application mode, this mode primary targets mobile web sites - thus the mobile OS skins (Android/iOS) are not supported.
- Certain listview features (pull to refresh, endless scrolling, press to load more, fixed headers) rely on the mobile scroller; the listview widget should be instantiated in a mobile scroller widget element.
- The drawer widget should have its [container configuration option](/api/mobile/drawer/#configuration-container) set. The drawer will not close automatically when navigation is performed.

