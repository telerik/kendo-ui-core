---
title: Overview
page_title: Overview - Hybrid UI View
description: "Use the hybrid mobile Kendo UI View component, mark header and footer elements, and view parameters of navigational components and DOM elements."
slug: overview_hybridview
position: 1
component: view
---

# View Overview

>Starting with the R2 2023 release, Kendo UI will no longer ship Hybrid UI components. This means that the R2 2023 will be the last release to include Kendo Hybrid in the Kendo UI package. See full announcement in [Kendo jQuery blog post](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#end-of-support-announcements). The last stable version that we recommend to use for Kendo Hybrid components is [R3 2022 SP1](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2022-sp1-(version-2022-3-1109)).
>
>[What's New in Kendo UI R2 2023](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#kendo-ui-for-jquery)

The [Hybrid UI View component](https://demos.telerik.com/kendo-ui/m/index#mobile-view/index) represents a screen in the kendo mobile Application. The Application automatically instantiates a mobile View for each element with a `role` data attribute set to `view`.

## Getting Started

### Initialize the View

The example below demonstrates how to initialize the View component.



    <div data-role="view">Hello world!</div>

## Features

### Headers and Footers

By default, the mobile View content stretches to fit the application element. Also, the mobile View may also have a header and a footer. To mark the header and footer elements, add block elements, such as `div`, `header`, and `footer` among others, with the `data-role="header"` and `data-role="footer"` attribute.

The example below demonstrates a mobile View with a header and a footer.



    <div data-role="view">
        <div data-role="header">Header</div>
        Hello world!
        <div data-role="footer">Footer</div>
    </div>

> **Important**
>
> Because of the OS UI design conventions, the header and the footer switch positions when an Android device is detected. Usually the footer hosts a mobile TabStrip component, which is located at the bottom of the screen on iOS, and at the top of the screen in Android applications.

### Parameters

Navigational components can pass additional URL parameters when navigating to Views. The parameters are accessible in the  view `show` event handlers.

The example below demonstrates a button with additional URL parameters.



    <a data-role="button" href="#foo?bar=baz">Link to FOO <strong>View</strong> with bar parameter set to baz</a>

    <div data-role="view" id="foo" data-show="fooShow"></div>

    <script>
        function fooShow(e) {
             e.view.params // {bar: "baz"}
        }
    </script>

### DOM Elements

Each mobile View instance exposes the following fields:

* `header`&mdash;The View, or the applied mobile layout, header DOM element.
* `footer`&mdash;The View, or the applied mobile layout, footer DOM element.
* `content`&mdash;The View content DOM element.
* `scrollerContent`&mdash;The View mobile Scroller container DOM element. Recommended if the mobile View contents need to be manipulated or replaced.

## See Also

* [Hybrid UI View JavaScript API Reference](/api/javascript/mobile/ui/view)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
