---
title: Overview
page_title: Overview | Hybrid UI View
description: "Use the hybrid mobile Kendo UI View widget, mark header and footer elements, and view parameters of navigational widgets and DOM elements."
slug: overview_hybridview
position: 1
---

# View Overview

The [Hybrid UI View widget](http://demos.telerik.com/kendo-ui/m/index#mobile-view/index) represents a screen in the kendo mobile Application. The Application automatically instantiates a mobile View for each element with a `role` data attribute set to `view`.

## Getting Started

### Initialize the View

The example below demonstrates how to initialize the View component.

###### Example

    <div data-role="view">Hello world!</div>

## Features

### Headers and Footers

By default, the mobile View content stretches to fit the application element. Also, the mobile View may also have a header and a footer. To mark the header and footer elements, add block elements, such as `div`, `header`, and `footer` among others, with the `data-role="header"` and `data-role="footer"` attribute.

The example below demonstrates a mobile View with a header and a footer.

###### Example

    <div data-role="view">
        <div data-role="header">Header</div>
        Hello world!
        <div data-role="footer">Footer</div>
    </div>

> **Important**
>
> Because of the OS UI design conventions, the header and the footer switch positions when an Android device is detected. Usually the footer hosts a mobile Tabstrip widget, which is located at the bottom of the screen on iOS, and at the top of the screen in Android applications.

### Parameters

Navigational widgets can pass additional URL parameters when navigating to Views. The parameters are accessible in the  view `show` event handlers.

The example below demonstrates a button with additional URL parametres.

###### Example

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

Other articles and how-to examples on the Hybrid UI components and on the View:

* [Hybrid UI View JavaScript API Reference](/api/javascript/mobile/ui/view)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
