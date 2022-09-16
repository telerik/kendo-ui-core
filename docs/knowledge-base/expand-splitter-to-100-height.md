---
title: Expand the Splitter to 100% Height and Auto-Resize
page_title: Expand the Splitter to 100% Height and Auto-Resize
description: "Learn how to expand the Kendo UI Splitter to a 100% height and make it resize automatically."
previous_url: /kendo-ui-mvc/controls/layout/splitter/how-to/expand-splitter-to-100-height, /controls/layout/splitter/how-to/expand-splitter-to-100-height
slug: howto_expandto100heightandautoresize_splitter
tags: telerik, kendo, jquery, splitter, expand, to, 100%, percent, height, auto, resize  
component: splitter
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Splitter for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I expand the Kendo UI Splitter to a 100% height and make it resize automatically?

## Solution

You can vertically expand and resize the Splitter together with the browser window.

Web standards require elements with a height set in percentage to have a parent element with an explicit height. The rule applies recursively until an element with a pixel height is reached or until the `<html>` element is reached. If the requirement is not met, the computed height of the Splitter falls back to `auto` and the widget collapses, depending on its content.

You have to also remove the border of the Splitter. Elements that are 100% high cannot have borders, margins, paddings, and sibling elements. In a nested Splitter, the inner Splitters remove their borders automatically given that each Splitter is a direct child of a parent pane.

### Automatic Resizing to 100% Height

In the following example, the outer Splitter has no siblings and has a 100% height style applied. Its parent is the `<body>` element, so it receives a `height:100%` style. This in turn requires the `<html>` element to obtain the same style.

```dojo
<style>
    html,
    body
    {
        height:100%;
        margin:0;
        padding:0;
        overflow:hidden;
    }

    #vertical,
    #horizontal
    {
        height:100%;
    }

    #vertical
    {
        border-width: 0;
    }
</style>

<div id="vertical">
    <div>
        <p>
            Outer splitter : top pane (resizable and collapsible)
        </p>
    </div>
    <div>
        <div id="horizontal">
            <div>
                <p>
                    Inner splitter :: left pane
                </p>
            </div>
            <div>
                    Inner splitter :: center pane
            </div>
            <div>
                <p>
                    Inner splitter :: right pane
                </p>
            </div>
        </div>
    </div>
    <div>
        <p>
            Outer splitter : bottom pane (non-resizable, non-collapsible)
        </p>
    </div>
</div>

<script>
    $(function() {
        $("#vertical").kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: true, size: "60px" },
                { collapsible: false },
                { collapsible: false, resizable: false, size: "15%" }
            ]
        });

        $("#horizontal").kendoSplitter({
            panes: [
                { collapsible: true, size: "100px" },
                { collapsible: false },
                { collapsible: true, size: "20%" }
            ]
        });
    });
</script>
```

### Manual Resizing to Calculated Heights

If the dimensions of the Splitter do not depend directly on the browser viewport size or if the Splitter has visible siblings, using a 100% height for it may not be applicable. In this case, you will need to manually set the height of the [wrapper](/intro/widget-basics/wrapper-element) `<div>` and then call the [`resize`](/web/splitter/overview#resizing-a-splitter-manually) method of the widget.

The following example demonstrates a Kendo UI Splitter with a calculated height.

```dojo
<style>
    html,
    body
    {
        height:100%;
        margin:0;
        padding:0;
        overflow:hidden;
    }

    #horizontal
    {
        height:100%;
    }

    #vertical
    {
        border-width: 0;
    }

    #header,
    #footer {
        height: 50px;
        background: #fed;
    }
</style>

<div id="header">Page header</div>

<div id="vertical">
    <div>
        <p>
            Outer splitter : top pane (resizable and collapsible)
        </p>
    </div>
    <div>
        <div id="horizontal">
            <div>
                <p>
                    Inner splitter :: left pane
                </p>
            </div>
            <div>
                    Inner splitter :: center pane
            </div>
            <div>
                <p>
                    Inner splitter :: right pane
                </p>
            </div>
        </div>
    </div>
    <div>
        <p>
            Outer splitter : bottom pane (non-resizable, non-collapsible)
        </p>
    </div>
</div>

<div id="footer">Page footer</div>

<script>
    $(function() {
        $("#vertical").kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: true, size: "60px" },
                { collapsible: false },
                { collapsible: false, resizable: false, size: "15%" }
            ]
        });

        var outerSplitter = $("#vertical").data("kendoSplitter");
        var browserWindow = $(window);
        var headerFooterHeight = $("#header").height() + $("#footer").height();

        function resizeSplitter() {
            outerSplitter.wrapper.height(browserWindow.height() - headerFooterHeight);
            outerSplitter.resize();
        }

        resizeSplitter();
        browserWindow.resize(resizeSplitter);

        $("#horizontal").kendoSplitter({
            panes: [
                { collapsible: true, size: "100px" },
                { collapsible: false },
                { collapsible: true, size: "20%" }
            ]
        });
    });
</script>
```

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
