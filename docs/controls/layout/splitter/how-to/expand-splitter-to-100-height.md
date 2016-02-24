---
title: Expand to 100% Height and Auto-Resize
page_title: Expand to 100% Height and Auto-Resize | Kendo UI Splitter
description: "Learn how to expand the Kendo UI Splitter to a 100% height and make it resize automatically."
slug: howto_expandto100heightandautoresize_splitter
---

# Expand to 100% Height and Auto-Resize

This article demonstrates how to make the Kendo UI Splitter expand vertically and resize together with the browser window, and also explains what the standard requirements in such scenarios are.

Web standards require that elements with percentage height have a parent element with an explicit height. The rule applies recursively until an element with a pixel height is reached, or until the `<html>` element is reached. If the requirement is not met, the computed height of the Splitter falls back to `auto` and the widget collapses, depending on its content.

Also, make sure you remove the border of the Splitter. Elements that are 100% high cannot have borders, margins, paddings, and sibling elements.

In a nested-Splitter scenario, the inner Splitters remove their borders automatically, given that each Splitter is a direct child of a parent pane.

## Automatic Resizing to 100% Height

In the first example below, the outer Splitter has no siblings and has a 100% height style applies. Its parent is the `<body>` element, so it receives a `height:100%` style. This in turn requires the `<html>` element to obtain the same style.

###### Example

```html
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

## Manual Resizing to Calculated Heights

If the dimensions of the Splitter do not depend directly on the browser viewport size, or if the Splitter has visible siblings, using a 100% height for it may not be applicable. In this case you will need to set the height of the Splitter [wrapper](/intro/widget-basics/wrapper-element) `<div>` manually and then call the widget's [`resize`](/web/splitter/overview#resizing-a-splitter-manually) method.

The example below demonstrates a Kendo UI Splitter with a calculated height.

###### Example

```html
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

Other articles on Kendo UI Splitter:

* [Splitter JavaScript API Reference](/api/javascript/ui/splitter)
* [How to Keep Pane Size in Percentages]({% slug howto_keeppanesizepercentages_splitter %})
