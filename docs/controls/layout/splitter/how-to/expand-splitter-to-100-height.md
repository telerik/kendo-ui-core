---
title: Expand to 100% Height and Auto-Resize
page_title: Expand to 100% Height and Auto-Resize | Kendo UI Splitter Widget
description: "Learn how to expand the Kendo UI Splitter to a 100% height and make it resize automatically."
slug: howto_expandto100heightandautoresize_splitter
---

# Expand to 100% Height and Auto-Resize

When making the Splitter 100% high, keep in mind that web standards require elements with percentage height to have a parent element with an explicit height. In the case below, the parent of the Splitter is the `body`, so it receives a `height:100%` style, which in turn results in the `html` element obtaining the same style. If the requirement is not met, the computed height of the Splitter will fall back to `auto` and the widget may collapse completely, depending on its content. 

Also, make sure you remove the border of the Splitter. 100% high elements cannot have borders, margins, paddings, and sibling elements. 

In a nested-Splitter scenario, the inner Splitters remove their borders automatically, given that each Splitter is a direct child of a parent pane.

If the dimensions of the Splitter do not depend directly on the browser viewport size, you may need to set the width and height of the Splitter `<div>` manually and then call the widget's [`resize`](/web/splitter/overview#resizing-a-splitter-manually) method.

The example below demonstrates how to expand the Kendo UI Splitter to 100% height and resize it together with the browser window.

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
                { collapsible: false, resizable: false, size: "10%" }
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

## See Also 

Other articles on Kendo UI Splitter:

* [JavaScript API Reference](/api/javascript/ui/splitter)
* [How to Keep Pane Size in Percentages]({% slug howto_keeppanesizepercentages_splitter %})