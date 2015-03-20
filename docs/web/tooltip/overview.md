---
title: Overview
---

# Tooltip Overview

A **Tooltip** displays popup hint for a given html element. Its content can be defined either as
static text or loaded dynamically via AJAX.

A **Tooltp** can be initialized either for a single element or for a container which child elements will represent tooltip targets.

## Getting Started

Create a tooltip for a single target:

### Create a simple HTML element

    <div id="target">
        Some Content
    </div>

### Initialize the Tooltip

    $(document).ready(function() {
        $("#target").kendoTooltip({ content: "Tooltip content" });
    });

Create a tooltip for multiple target within a container:

### Create a simple HTML element which will act as a container

    <div id="container">
        Some <a href="#" title="Some text">Content</a><br />
        Some <a href="#" title="Some other text">More</a> Content <br />
    </div>

### Initialize the Tooltip using a selector and specify the filter to match the target elements

    $(document).ready(function() {
        $("#container").kendoTooltip({ filter: "a[title]" });
    });

By default the Tooltip content will be extracted from the title attribute of the target element

## Configuring Tooltip Behaviors


A **Tooltip** provides many configuration options that can be easily set during initialization.
Among the properties that can be controlled:


*   Content
*   Position relative to the target (top, botton, center, left, right)
*   Event on which the tooltip will be shown
*   Auto hide behavior
*   Height/Width

### Create a Tooltip

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

## Loading Tooltip content via AJAX

A **Tooltip** provides built-in support for asynchronously loading content from a URL. This URL
should return a HTML fragment that can be loaded in a Tooltip content area.

### Load Tooltip content asynchronously

    <div id="target">Content Text</div>

### Initialize tooltip and configure content loading

    $(document).ready(function(){
        $("#target").kendoTooltip({
            content: { url: "html-content-snippet.html" }
        });
    });

## Accessing an Existing Tooltip


You can reference an existing **Tooltip** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing Tooltip instance

    var tooltip = $("#target").data("kendoTooltip");


