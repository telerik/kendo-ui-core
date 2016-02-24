---
title: Overview
page_title: Overview | Kendo UI Splitter
description: "Learn how to initialize the Kendo UI Splitter widget and achieve complex layouts."
slug: overview_kendoui_splitter_widget
position: 1
---

# Splitter Overview

The [Kendo UI Splitter widget](http://demos.telerik.com/kendo-ui/splitter/index) provides a dynamic layout of resizable and collapsible panes. It converts the children of an HTML element into an interactive layout, adding resize and collapse handles depending on its configuration. The vertical and horizontal orientation of a Kendo UI Splitter can be combined to build complex layouts.

## Getting Started

### Create the Splitter

The layout and structure of a Kendo UI Splitter are defined within the DOM as a `<div>` container with child elements.

The example below demonstrates how to create a Kendo UI Splitter with children that become panes in the resulting layout of the page. When the Splitter is initialized, a vertical split bar will be placed between the two `<div>` elements. This bar can be moved by users to the left and right to adjust the size of the panes.

###### Example

    <div id="splitter">
        <div>Area 1</div>
        <div>Area 2</div>
    </div>


### Initialize the Splitter

> **Important**  
> * The Splitter should be initialized after the DOM is fully loaded, so make sure you create it within a `$(document).ready()` statement.
> * The widget must be visible at the time of initialization. If it is nested in a hidden container, then execute the Splitter's [`resize`](#resize-manually) method as soon as it becomes visible.

The example below demonstrates how to initialize the Splitter using a jQuery selector.

###### Example

    $(document).ready(function() {
        $("#splitter").kendoSplitter();
    });

## Configuration

### Defaults

Kendo UI Splitter provides default configuration options that can be set during initialization. Some of the properties that can be overriden and controlled are:

*   Maximum and minimum pane sizes
*   Resizable and collapsible/expandable pane behaviors
*   Horizontal and vertical orientation

The properties of a pane must be specified during initialization and set for each individual pane in a Splitter.

The example below demonstrates how to initialize a Splitter and the properties of its panes.

###### Example

    $("#splitter").kendoSplitter({
        panes: [
            { collapsible: true, min: "100px", max: "300px" },
            { collapsible: true }
        ],
        orientation: "vertical"
    });

### Load Content with AJAX

While any valid technique for loading content via AJAX may be used, Kendo UI Splitter provides built-in support for asynchronously loading content from URLs. These URLs return HTML fragments that can be loaded in the pane of a Splitter. If you want to load a whole page in an `iframe`, specify the complete URL, e.g. http://telerik.com/.

#### Load Content Asynchronously

###### Example

    <div id="splitter">
        <div>Area 1 with Static Content</div>
        <div></div>
        <div></div>
    </div>

#### Load Third Pane in iframe

The example below demonstrates how to load content for one pane asynchronously and load a third pane in an `iframe`.

###### Example

    $(document).ready(function() {
        $("#splitter").kendoSplitter({
            panes: [
                {},
                { contentUrl: "html-content-snippet.html" },
                { contentUrl: "http://telerik.com/" }
            ]
        });
    });

### Change Pane Settings after Initialization

The pane settings (`collapsible` and `resizable`) of the Splitter can be changed via Javascript after the widget has been initialized. Note that the `resize()` method of the Splitter causes the pane sizes to be recalculated, and the split bars to be rendered with the current widget settings.

###### Example

    $("#SplitterID").kendoSplitter({
        panes: [
            { collapsible: false, resizable: false, size: 100 },
            { }
        ]
    });

    var splitterObject = $("#SplitterID").data("kendoSplitter");

    splitterObject.options.panes[0].collapsible = true;
    splitterObject.options.panes[0].resizable = true;
    splitterObject.resize(true);

## Display

### Nest Layouts

The Splitter supports nested layouts to achieve complex layouts.

#### Create Nested Splitter Layouts

###### Example

    <div id="horizontalSplitter">
        <div><p>Left Side Pane Content</p></div>
        <div>
            <div id="verticalSplitter">
                <div><p>Right Side, Top Pane Content</p></div>
                <div><p>Right Side, Bottom Pane Content</p></div>
            </div>
        </div>
    </div>

#### Initialize Two Splitters with Different Orientations

###### Example

    $("#horizontalSplitter").kendoSplitter();
    $("#verticalSplitter").kendoSplitter({ orientation: "vertical" });

> **Important**  
>
> Using the same `<div>` element for a Splitter pane and for a nested Splitter is not recommended. Nested Splitters are sized automatically to match the parent pane's height if the nested Splitter has 100% width and height styles. Using a nested Splitter which is a direct child of the parent Splitter's pane is recommended instead.

### Set a 100% Height and Auto-Resize

To configure the height of the Splitter to 100% and make it resize automatically, refer to [this how-to example](/web/splitter/how-to/expand-splitter-to-100-height).

### Resize Manually

The Splitter `<div>` can be resized manually by applying a new width or height style through Javascript. Afterwards, execute the [`resize()`](/using-kendo-in-responsive-web-pages) method, so that the widget readjusts its layout and pane sizes.

###### Example

    var splitterElement = $("#SplitterID"),
        splitterObject = splitterElement.data("kendoSplitter");

    splitterElement.css({width: "800px", height: "600px" });
    splitterObject.resize();

    // for versions 2013 Q2 SP1 and older use this instead:
    //splitterObject.trigger("resize");

If the Splitter layout needs readjusting, but the dimensions of its `<div>` wrapper have not changed, execute the `resize` method with a parameter in order to take effect. This is useful when the Splitter has been initialized in an invisible container and its panes' dimensions and position have not been calculated correctly.

    splitterObject.resize(true);

Note that changing the pane sizes manually is not recommended. Use the [`size()`](/api/web/splitter#methods-size) method instead.

### Allow Elements to Overflow Panes

The panes of the Splitter are either scrollable&mdash;have an `overflow:auto` style, or they clip overflowing content&mdash;have an `overflow:hidden` style. In either case, nothing is allowed to be displayed outside the pane boundaries. This can be problematic in scenarios, which include Menus and other non-detached popups, which are rendered inside the pane. Note that most Kendo UI widgets, except for the Menu, use detached popups, meaning that there is no problem with their content set within a Splitter pane.

The solution to this issue is to disable pane-content scrolling and clipping by enforcing an `overflow:visible` style to the Splitter `<div>` pane. In addition, the stacking context of the pane must be raised by applying a positive `z-index` style.

###### Example

    //HTML
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

    //CSS
    #pane1
    {
        overflow: visible;
        z-index: 2;
    }

If there are several nested Splitters, then each pane, which is an ancestor of the Menu, requires the specified `overflow` and `z-index` styles. These styles can also be applied inline instead of externally.   

## Third-Party Integration

### Integration with Flexbox

The Splitter relies on JavaScript size calculations to construct its layout, while Flexbox relies on pure CSS. The two techniques are difficult to combine, so the Splitter is not designed to work with Flexbox. Actually, one of its purposes is to spare the need to use Flexbox in general. To avoid CSS conflicts, do not apply Flexbox styles to the Splitter elements.

## Reference

### Existing Instances

Refer to an existing Splitter instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Splitter API](/api/web/splitter) to control its behavior.

The example below demonstrates how to access an existing Splitter instance.

###### Example

    var splitter = $("#splitter").data("kendoSplitter");

## See Also

Other articles on Kendo UI Splitter:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Splitter Widget](/aspnet-mvc/helpers/splitter/overview)
* [Overview of the Splitter JSP Tag]({% slug overview_splitter_uiforjsp %})
* [Overview of the Splitter PHP Class](/php/widgets/splitter/overview)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in `localStorage`]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [Splitter JavaScript API Reference](/api/javascript/ui/splitter)
