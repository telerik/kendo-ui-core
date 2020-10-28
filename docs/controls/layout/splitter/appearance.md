---
title: Appearance
page_title: jQuery Splitter Documentation | Appearance
description: "Get started with the jQuery Splitter by Kendo UI and control its appearance."
slug: appearance_kendoui_splitter
position: 4
---

# Appearance

The Splitter provides options for [nesting its layouts](#nesting-layouts), implementing [automatic](#auto-resizing) and [manual](#resizing-manually) resizing, and [allowing elements to overflow panes](#allowing-elements-to-overflow-panes).

> The Splitter relies on JavaScript size calculations to construct its layout while Flexbox relies on pure CSS. The two techniques are difficult to combine and the Splitter is not designed to work with Flexbox but rather to spare the need to use Flexbox in general. To avoid CSS conflicts, do not apply Flexbox styles to the Splitter elements.

## Nesting Layouts

To render complex layouts, you can nest layouts in the Splitter.

> Avoid using the same `<div>` element for a Splitter pane and for a nested Splitter. Nested Splitters are sized automatically to match the height of the parent pane if the nested Splitter has 100% width and height styles. Instead, use a nested Splitter which is a direct child of the parent Splitter pane.

    <div id="horizontalSplitter">
        <div><p>Left Side Pane Content</p></div>
        <div>
            <div id="verticalSplitter">
                <div><p>Right Side, Top Pane Content</p></div>
                <div><p>Right Side, Bottom Pane Content</p></div>
            </div>
        </div>
    </div>

The following example demonstrates how to initialize two Splitters with different orientation.

    $("#horizontalSplitter").kendoSplitter();
    $("#verticalSplitter").kendoSplitter({ orientation: "vertical" });

## Auto-Resizing

To render an auto-resizable Splitter, refer to the article on [setting the height to 100% and auto-resize the Splitter]({% slug howto_expandto100heightandautoresize_splitter %}).

## Resizing Manually

> Avoid the manual resizing of the Splitter panes. Use the [`size()`](/api/web/splitter#methods-size) method instead.

You can manually resize the `<div>` element of the Splitter by applying a new width or height style through JavaScript. Then, execute the `resize()` method, so that the widget readjusts its layout and pane sizes.

    var splitterElement = $("#SplitterID"),
        splitterObject = splitterElement.data("kendoSplitter");

    splitterElement.css({width: "800px", height: "600px" });
    splitterObject.resize();

    // For versions 2013 Q2 SP1 and earlier, use this instead:
    // splitterObject.trigger("resize");

If the Splitter layout needs readjusting but the dimensions of its `<div>` wrapper have not changed, execute the `resize` method with a parameter. This approach is useful when the Splitter is initialized in an invisible container and when the dimensions and position of its panes are not calculated correctly.

    splitterObject.resize(true);

## Allowing Elements to Overflow Panes

The panes of the Splitter are either scrollable (with an `overflow:auto` style) or they clip overflowing content (with an `overflow:hidden` style). As a result, nothing is displayed outside the pane boundaries. This approach may be problematic in scenarios that include Menus and other non-detached popups which are rendered inside the pane. Also, most Kendo UI widgets, except for the Menu, use detached popups which means that their content can be set within a Splitter pane.

To work around this issue, disable the scrolling and clipping of the pane content by enforcing an `overflow:visible` style to the `<div>` pane of the Splitter. Also, raise the stacking context of the pane by applying a positive `z-index` style. If you have several nested Splitters, each pane which represents an ancestor of the Menu requires the specified `overflow` and `z-index` styles. These styles can also be applied inline instead of externally.  

    // HTML
    <div id="splitter1">
        <div id="pane1">
            <ul id="menu1">
                <li>root menu item
                    <ul>
                        <!-- child menu items -->
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    // CSS
    #pane1
    {
        overflow: visible;
        z-index: 2;
    }

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
