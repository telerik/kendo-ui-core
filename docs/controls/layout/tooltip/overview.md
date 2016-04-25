---
title: Overview
page_title: Overview | Kendo UI Tooltip
description: "Learn how to initialize the Kendo UI Tooltip widget and configure its behaviors."
slug: overview_kendoui_tooltip_widget
position: 1
---

# Tooltip Overview

The [Kendo UI Tooltip widget](http://demos.telerik.com/kendo-ui/tooltip/index) displays a popup hint for a given `html` element. Its content can be defined either as static text, or loaded dynamically via AJAX.

## Getting Started

### Initialize the Tooltip

The Tooltip can be initialized:

* For a single element
* For a container, where child elements are going to represent Tooltip targets


#### Initialize Tooltip for Single Elements

The example below demonstrates how to create a Tooltip for a single target and initialize it.

###### Example

    <div id="target">
        Some Content
    </div>

    $(document).ready(function() {
        $("#target").kendoTooltip({ content: "Tooltip content" });
    });

#### Initialize Tooltip for Containers

The example below demonstrates how to create a Tooltip for multiple targets within a container, initialize it using a jQuery selector and specfy the filter to match the target elements. By default, the Tooltip content is extracted from the `title` attribute of the target element.

###### Example

    <div id="container">
        Some <a href="#" title="Some text">Content</a><br />
        Some <a href="#" title="Some other text">More</a> Content <br />
    </div>  

    $(document).ready(function() {
        $("#container").kendoTooltip({ filter: "a[title]" });
    });

### Show over Disabled Elements

The Kendo UI Tooltip relies on the `mouseenter` and `mouseleave` events to work. By design, disabled elements do not fire events. If working with disabled elements is a strict requirement, a possible workaround is to initialize the Tooltip widget over a parent of the disabled element. Note that there must be some empty space between the disabled element and the boundaries of its parent, so that the `mouseenter` event is fired.

###### Example

```html
<style>
.parent {
    display: inline-block;
    border: 1px solid;
    margin: 2em;
    padding: 0.2em;
}
</style>

<div id="example">

  <span id="btn1-parent" class="parent" style="border-color:#f00;">
    <button id="btn1" class="k-button" disabled="disabled">No tooltip</button>
  </span>

  <span id="btn2-parent" class="parent" style="border-color:#0c0;">
    <button id="btn2" class="k-button" disabled="disabled">Tooltip works</button>
  </span>

</div>

<script>
  $(function() {
    $("#btn1, #btn2-parent").kendoTooltip({
      content: "Hello!",
      position: "right"
    });
  });
</script>
```

## Configuration

### Defaults

Kendo UI Tooltip provides default configuration options that can be set during initialization. Some of the properties that can be overriden and controlled are:

*   Content
*   Position relative to the target (top, botton, center, left, right)
*   Event on which the Tooltip si going to be displayed
*   Auto-hide behavior
*   Height/Width

The example below demonstrates how to intiialize a Tooltip and configure its main propertues.

###### Example

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

### Load Content with AJAX

A Kendo UI Tooltip widget provides built-in support for asynchronously loading content from a URL. This URL is expected to return an HTML fragment that can be loaded in a Tooltip content area. If the content passed to the Tooltip includes scripts, they are going to be executed.

The example below demonstrates how to asynchronously load content to the Tooltip.

###### Example

    <div id="target">Content Text</div>

    $(document).ready(function(){
        $("#target").kendoTooltip({
            content: { url: "html-content-snippet.html" }
        });
    });

## Reference

### Existing Instances

Refer to an existing Tooltip instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Tooltip API](/api/javascript/ui/tooltip) to control its behavior.

The example below demonstrates how to access an existing Tooltip instance.

###### Example

    var tooltip = $("#target").data("kendoTooltip");

## See Also

Other articles on Kendo UI Tooltip:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Tooltip Widget](/aspnet-mvc/helpers/tooltip/overview)
* [Overview of the Tooltip JSP Tag]({% slug overview_tooltip_uiforjsp %})
* [Overview of the Tooltip PHP Class](/php/widgets/tooltip/overview)
* [How to Calculate Tooltip Content Width]({% slug howto_calculatetooltipcontentlength_tooltip %})
* [How to Show Only If Text Exceeds Certain Length]({% slug howto_showonlyiftextexceedscertainlength_tooltip %})
* [How to Show Only If Text Overflows with Ellipsis]({% slug howto_showonlyiftextoverflowswithellipsis_tooltip %})
* [Tooltip JavaScript API Reference](/api/javascript/ui/tooltip)
