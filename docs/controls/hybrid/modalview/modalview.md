---
title: Overview
page_title: Overview | Hybrid UI ModalView
description: "Initialize and use the Hybrid UI ModalView widget in the Kendo UI framework."
slug: overview_hybridmodalview
position: 1
---

# ModalView Overview

The [Hybrid UI ModalView widget](http://demos.telerik.com/kendo-ui/m/index#modalview/index) is used to present a self-contained functionality in the context of the current task.

> **Important**
>
> As of Kendo UI Q3 2013 release, the ModalView supports autosizing when its content changes and when no height is set. Unfortunately, this was not implemented at the expense of the possibility to set the ModalView size in a CSS stylesheet. As a workaround, use the ModalView width and height options or set them through inline CSS instead.

## Getting Started

The Kendo UI mobile Application automatically initializes a mobile ModalView component for every `div` element with the `role` data attribute set to `modalview` and present in the mobile application DOM element&mdash;same level as the application views. The ModalView element may contain optional header and footer. A mobile scroller is automatically initialized around the contents of the element.

The example below demonstrates a ModalView with a header and a footer.

###### Example

    <div data-role="view">
        <a href="#foo" data-rel="modalview" data-role="button">Foo</a>
    </div>

    <div data-role="modalview" id="foo">
        <div data-role="header">
            <div data-role="navbar">
                <span data-role="view-title">Hello World!</span>
                <a data-align="right" data-role="button">Close</a>
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

## Actions with ModalViews

The widget can be opened when any mobile navigational widget, such as the ListView, Button, TabStrip, etc., is tapped. To do so, the navigational widget should have the `data-rel="modalview"` and `href` attributes pointing to the element `id` set of the ModalView, prefixed with `#`, like an anchor.

### Open ModalViews

The example below demonstrates how to create a button that opens a ModalView.

###### Example

    <div data-role="view">
        <a href="#foo" data-rel="modalview" data-role="button">Foo</a>
    </div>

    <div data-role="modalview" id="foo">
        ...
    </div>

### Close ModalViews

The example below demonstrates how to create a button that closes a ModalView.

###### Example

    <div data-role="view">
        <a href="#foo" data-rel="modalview" data-role="button">Foo</a>
    </div>

    <div data-role="modalview" id="foo">
        <div data-role="header">
            <div data-role="navbar">
                <a data-align="right" data-click="closeModalView" data-role="button">Close</a>
            </div>
        </div>
        Foo
    </div>

    <script>
        function closeModalView(e) {
            // find the closest modal view, relative to the button element.
            var modalView = e.sender.element.closest("[data-role=modalview]").data("kendoMobileModalView");
            modalView.close();
        }
    </script>

## See Also

Other articles and how-to examples on the Hybrid UI components and on the ModalView:

* [Hybrid UI ModalView JavaScript API Reference](/api/javascript/mobile/ui/modalview)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
