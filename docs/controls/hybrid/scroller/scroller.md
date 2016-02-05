---
title: Overview
page_title: Overview | Hybrid UI Scroller
description: "Achieve a touch-friendly scrolling functionality of the contents of a given DOM element by using the hybrid Kendo UI Scroller widget."
slug: overview_hybridscroller
position: 1
---

# Scroller Overview

The [Hybrid UI Scroller widget](http://demos.telerik.com/kendo-ui/m/index#scroller/index) enables touch-friendly kinetic scrolling for the contents of a given DOM element.

## Getting Started

Each mobile View initializes a scroller for its content element. In addition to that, a scroller is initialized for every element with a `role` data-attribute set to `scroller`. Alternatively, a scroller can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler.

### Intialize from Markup

For the scroller to work, its element should have fixed dimensions&mdash;width and/or height&mdash;set.

The example below demonstrates how to initialize the Hybrid UI Scroller by using the role data-attribute.

###### Example

    <div data-role="scroller">
        Foo
    </div>

### Initialize Using jQuery

The example below demonstrates how to initialize the Hybrid UI Scroller by using jQuery plugin syntax.s

###### Example

    <div id="scroller"></div>

    <script>
        var scroller = $("#scroller").kendoMobileScroller();
    </script>

### Obtain Current View Scrollers

The example below demonstrates how to obtain the current mobile view scroller.

###### Example

    <div data-role="view" data-init="getScroller">
        Foo
    </div>

    <script>
        function getScroller(e) {
            var scroller = e.view.scroller;
        }
    </script>

## Properties

The Hybrid UI Scroller widget exposes the following fields:

*   `scrollElement`&mdash;The inner Scroller element that holds the scrolling content. Use this field if you wish to change the element contents after the Scroller is initialized on it.
*   `scrollTop`&mdash;The number of pixels that are hidden from view above the scrollable area.
*   `scrollLeft`&mdash;The number of pixels that are hidden from view to the left of the scrollable area.

## See Also

Other articles and how-to examples on the Hybrid UI components and on the Scroller:

* [Hybrid UI Scroller JavaScript API Reference](/api/javascript/mobile/ui/scroller)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
