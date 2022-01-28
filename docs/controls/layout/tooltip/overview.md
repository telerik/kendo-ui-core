---
title: Overview
page_title: jQuery Tooltip Documentation | Tooltip Overview
description: "Get started with the jQuery Tooltip by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_tooltip_widget
position: 1
---

# Tooltip Overview

The Tooltip displays a popup hint for a specific HTML element.

Its content can be defined either as static text or loaded dynamically with AJAX. The Tooltip provides default configuration options such as relatively positioning it to the target, events for displaying the widget, auto-hiding behavior, setting its height and width.

* [Demo page for the Tooltip](https://demos.telerik.com/kendo-ui/tooltip/index)

## Initializing the Tooltip

The Tooltip can be initialized for a single element or for a container where the Tooltip targets are represented by the child elements.

The following example demonstrates how to create a Tooltip for a single target and initialize it.

    <div id="target">
        Some Content
    </div>

    $(document).ready(function() {
        $("#target").kendoTooltip({ content: "Tooltip content" });
    });

The following example demonstrates how to create a Tooltip for multiple targets within a container, initialize it using a jQuery selector, and specify the filter to match the target elements. By default, the Tooltip content is extracted from the `title` attribute of the target element.

    <div id="container">
        Some <a href="#" title="Some text">Content</a><br />
        Some <a href="#" title="Some other text">More</a> Content <br />
    </div>  

    $(document).ready(function() {
        $("#container").kendoTooltip({ filter: "a[title]" });
    });

## Basic Configuration

The following example demonstrates how to initialize a Tooltip and configure its main properties.

    $("#container").kendoTooltip({
        position: "right",
        height: "300px",
        showOn: "click",
        autoHide: true,
        content: function() {
            return "custom text";
        },
        width: "500px"
    });

## Functionality and Features

* [Content operations]({% slug content_kendoui_tooltip %})
* [Rendering over disabled elements]({% slug disabledelements_kendoui_tooltip %})

## Referencing Existing Instances

To refer to an existing Tooltip instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [Tooltip API](/api/javascript/ui/tooltip) to control its behavior.

The following example demonstrates how to access an existing Tooltip instance.

    var tooltip = $("#target").data("kendoTooltip");

## See Also

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Using the API of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/api)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
