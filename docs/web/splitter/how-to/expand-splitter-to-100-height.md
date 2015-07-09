---
title: Expand Splitter to 100% Height
page_title: Expand Splitter to 100% Height and Make it Resize Automatically
description: Expand Splitter to 100% Height and Make it Resize Automatically
---

# Expand the Splitter to 100% Height and Make it Resize Automatically

The example below demonstrates how to expand the Splitter to 100% height and resize it together with the browser window.

When making the Splitter 100% high, one should keep in mind that web standards require elements with percentage height to have a parent element with an explicit height.
In this case the parent of the Splitter is the `body`, so it receives a `height:100%` style, which in turn results in the `html` element obtaining the style as well.
If the requirement is not met, the Splitter's computed height will fallback to `auto` and the widget may collapse completely, depending on its content.
In addition, the Splitter should have its border removed. 100% high elements cannot have borders, margins, paddings and sibling elements.
In a nested Splitters scenario, the inner Splitters remove their borders automatically, given that each Splitter is a direct child of a parent pane.

If the Splitter's dimensions do not depend directly on the browser viewport size, one may need to set the width and height of the Splitter `<div>` manually
and then call the widget's [`resize`](/web/splitter/overview#resizing-a-splitter-manually) method.

#### Example:

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
