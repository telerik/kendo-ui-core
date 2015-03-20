---
title: Scroller
page_title: Documentation for Kendo UI Mobile Scroller widget 
description: How to achieve touch-friendly scrolling of the contents of a given DOM element by using Kendo UI Mobile Scroller Widget.
---

# Scroller

The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.

## Getting Started

Each mobile View initializes a scroller for its content element. In addition to that, a scroller will be initialized for every element with a
`role` data attribute set to `scroller`.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.


For the scroller to work, its element should have fixed dimensions (width and/or height) set.

### Initialize mobile Scroller using a role data attribute.

    <div data-role="scroller">
        Foo
    </div>

### Initialize mobile Scroller using jQuery plugin syntax

    <div id="scroller"></div>

    <script>
        var scroller = $("#scroller").kendoMobileScroller();
    </script>

### Obtain the current mobile view scroller

    <div data-role="view" data-init="getScroller">
        Foo
    </div>

    <script>
        function getScroller(e) {
            var scroller = e.view.scroller;
        }
    </script>

### Scroller Properties

The mobile Scroller widget exposes the following fields:

*   **scrollElement** - the inner Scroller element that holds the scrolling content. Use this field if you wish to change the element contents after the Scroller is initialized on it.
*   **scrollTop** - the number of pixels that are hidden from view above the scrollable area.
*   **scrollLeft** - the number of pixels that are hidden from view to the left of the scrollable area.
