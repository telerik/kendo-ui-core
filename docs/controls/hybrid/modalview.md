---
title: ModalView
page_title: Documentation for Kendo UI ModalView mobile widget
description: How to initialize and use a mobile ModalView component in Kendo UI Mobile framework. Quick steps that help you open the ModalView with any mobile navigation widget.
---

# ModalView

The Kendo ModalView is used to present self-contained functionality in the context of the current task.

> **Important:** As of Q3 2013 the ModalView supports autosizing when its content changes and when no height is set. Unfortunately we were able to implement this at the expense of the possibility to set the ModalView
size in a CSS stylesheet. As a workaround please use the ModalView width and height options or set them through inline CSS instead.

## Getting Started

The Kendo mobile Application will automatically initialize a mobile ModalView widget for every `div` element with `role` data attribute set to `modalview` present in the **mobile application DOM element** (same level as the application views).
The ModalView element may contain optional header and/or footer. A mobile scroller is automatically initialized around the contents of the element.

### ModalView with header and footer

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

## Opening a ModalView

The widget can be open when any mobile navigational widget (listview, button, tabstrip, etc.) is tapped.
To do so, the navigational widget should have `data-rel="modalview"` and `href` attribute pointing to the ModalView's element `id` set (prefixed with `#`, like an anchor).

### Button which opens a ModalView

    <div data-role="view">
        <a href="#foo" data-rel="modalview" data-role="button">Foo</a>
    </div>

    <div data-role="modalview" id="foo">
        ...
    </div>

### Button which closes a ModalView

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

