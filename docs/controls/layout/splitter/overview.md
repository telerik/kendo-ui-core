---
title: Overview
page_title: jQuery Splitter Documentation | Splitter Overview
description: "Get started with the jQuery Splitter by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_splitter_widget
position: 1
---

# Splitter Overview

The Splitter provides a dynamic layout of resizable and collapsible panes.

It converts the children of an HTML element into an interactive layout and adds resize and collapse handles depending on its configuration. The vertical and horizontal orientation of the Splitter can be combined to build complex layouts. The Splitter provides default configuration options such as a maximum and minimum pane size, resizable and collapsible or expandable pane behaviors, and horizontal and vertical orientation.

* [Demo page for the Splitter](https://demos.telerik.com/kendo-ui/splitter/index)

## Initializing the Splitter

The layout and structure of the Splitter are defined within the DOM as a `<div>` container with child elements.

The following example demonstrates how to create a Kendo UI Splitter with children that become panes in the resulting layout of the page. When the Splitter is initialized, a vertical split bar will be placed between the two `<div>` elements. This bar can be moved by users to the left and right to adjust the size of the panes.

    <div id="splitter">
        <div>Area 1</div>
        <div>Area 2</div>
    </div>

The following example demonstrates how to initialize the Splitter by using a jQuery selector.

> * Initialize the Splitter after the DOM is fully loaded and create it within a `$(document).ready()` statement.
> * The Splitter must be visible at the time of initialization. If it is nested in a hidden container, execute the [`resize`]({% slug appearance_kendoui_splitter %}#resizing-manually) method of the Splitter as soon as it becomes visible.

    $(document).ready(function() {
        $("#splitter").kendoSplitter();
    });

## Basic Configuration

You have to define the properties of a pane during initialization and to set them for each individual pane in a Splitter.

    $("#splitter").kendoSplitter({
        panes: [
            { collapsible: true, min: "100px", max: "300px" },
            { collapsible: true }
        ],
        orientation: "vertical"
    });

## Functionality and Features

* [Content operations]({% slug content_kendoui_splitter %})
* [Panes]({% slug panes_kendoui_splitter %})
* [Appearance]({% slug appearance_kendoui_splitter %})

## Referencing Existing Instances

To refer to an existing Splitter instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [Splitter API](/api/web/splitter) to control its behavior.

The following example demonstrates how to access an existing Splitter instance.

    var splitter = $("#splitter").data("kendoSplitter");

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
