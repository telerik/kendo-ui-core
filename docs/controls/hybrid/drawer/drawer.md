---
title: Overview
page_title: Overview - Hybrid UI Drawer
description: "Initialize and use a Hybrid UI Drawer component in Kendo UI framework."
slug: overview_hybriddrawer
position: 1
component: drawer
---

# Drawer Overview

>Starting with the R2 2023 release, Kendo UI will no longer ship Hybrid UI components. This means that the R2 2023 will be the last release to include Kendo Hybrid in the Kendo UI package. See full announcement in [Kendo jQuery blog post](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#end-of-support-announcements). The last stable version that we recommend to use for Kendo Hybrid components is [R3 2022 SP1](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2022-sp1-(version-2022-3-1109)).
>
>[What's New in Kendo UI R2 2023](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#kendo-ui-for-jquery)

The [Hybrid UI Drawer widget](https://demos.telerik.com/kendo-ui/m/index#drawer/index) provides a slide to reveal the global mobile application toolbox or navigation.

## Getting Started

The Kendo UI mobile Application automatically initializes a mobile Drawer widget for every `div` element with the `role` data attribute set to `drawer` present in the mobile application DOM element (same level as the application views). The Drawer element may contain optional header and/or footer. A mobile scroller is automatically initialized around the contents of the element.

By default, the Drawer is revealed at the left side when swiping from left to right.  The position can be changed using the `position` configuration option&mdash;`left` or `right`. One application can have up to two Drawers&mdash;left and right one&mdash;active at the same time.

The Drawer automatically hides when the user swipes back or taps the remaining visible area of the view. The Drawer also hides automatically when the application navigates to another view.

> **Important**
>
> If the Drawer is used for navigation, the View transition should be turned off.

### Initialize the Drawer

The example below demonstrates a Drawer and a **Reveal** button.



    <div data-role="view">
        <a href="#foo" data-rel="drawer" data-role="button">Drawer</a>
    </div>

    <div data-role="drawer" id="foo">
        <div data-role="header">
            <div data-role="navbar">
                <span data-role="view-title">Hello World!</span>
            </div>
        </div>

        <ul data-role="listview">
            <li>Foo</li>
        </ul>

        <div data-role="footer">
           <div data-role="navbar">
               <a data-align="right" data-role="button">Details</a>
           </div>
        </div>
    </div>

The example below demonstrates a Drawer with view navigation links.



    <div data-role="view" id="foo">
        Foo
    </div>

    <div data-role="view" id="bar">
        Bar
    </div>

    <div data-role="drawer">
        <ul data-role="listview">
            <li><a href="#foo">Foo</a></li>
            <li><a href="#bar">Bar</a></li>
        </ul>
    </div>

## Customization

### Associate Drawer with Remote Views

The `views` array allows you to associate the Drawer with a list of view IDs on which the Drawer will appear.

> **Important**
>
> If the Drawer has to be linked with a remote View, include in the views array its relative path, and not the ID of the element.

The example below demonstrates a Drawer associated with a remote View.



    <!-- local view -->
    <div id="foo" data-role="view">
        <a href="bar.html" data-role="button">Load remote View</a>
    </div>

    <!-- remote view is listed with its relative path "bar.html", not its ID "bar" -->
    <div data-role="drawer" data-views='["bar.html"]'>
        <ul data-role="listview">
            <li><a href="#foo">Foo</a></li>
            <li><a href="bar.html">Bar</a></li>
        </ul>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

    <!-- HTML of the remote View -->
    <div id="bar" data-role="view">
        <p>I am remote view, my ID is "bar", but my relative path is "bar.html"</p>
        <p>Swipe to reveal the drawer</p>
    </div>

### Reveal Drawer

In addition to responding to user swipes, the Drawer widget can be opened when any mobile navigational widget, such as the ListView, Button, and TabStrip among others, is tapped. To do so, the navigational widget should have the `data-rel="drawer"` and `href` attribute pointing to the Drawer's element `id` set, prefixed with `#`, like an anchor.

The example below demonstrates a button revealing a Drawer.



    <div data-role="view">
        <a href="#foo" data-rel="drawer" data-role="button">Foo</a>
    </div>

    <div data-role="drawer" id="foo">
        ...
    </div>

## Nova Theme Features

### Nested ListView

**Figure 1: Nested ListView with different color schemes**

![Kendo UI for jQuery Drawer with Nested ListView](ListView-in-Drawer.png)

The ListView has different styling when placed in a Drawer.

### Nested TabStrip

**Figure 2: Nested vertical TabStrip**

![Kendo UI for jQuery Drawer with Nested Vertical TabStrip](TabStrip-in-Drawer.png)

To activate this feature, set the `km-vertical-tabstrip` class to the TabStrip placed in a Drawer, as demonstrated in the example below.



	<div data-role="drawer">
        <div data-role="tabstrip" class="km-vertical-tabstrip">
            <!-- ... -->
        </div>
    </div>

## See Also

* [Hybrid UI Drawer JavaScript API Reference](/api/javascript/mobile/ui/drawer)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
