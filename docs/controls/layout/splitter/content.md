---
title: Content Operations
page_title: jQuery Splitter Documentation | Content Operations
description: "Get started with the jQuery Splitter by Kendo UI and load its content with AJAX."
slug: content_kendoui_splitter
position: 2
---

# Content Operations

You can use any valid technique for loading Splitter content.

However, the Splitter provides built-in support for asynchronously loading content from URLs. These URLs return HTML fragments that can be loaded in the pane of a Splitter. To load a whole page in an `iframe`, specify the complete URL, for example, https://www.telerik.com/.

The following example demonstrates how to load the Splitter content asynchronously.

    <div id="splitter">
        <div>Area 1 with Static Content</div>
        <div></div>
        <div></div>
    </div>

The following example demonstrates how to load content for one pane asynchronously and load a third pane in an `iframe`.

    $(document).ready(function() {
        $("#splitter").kendoSplitter({
            panes: [
                {},
                { contentUrl: "html-content-snippet.html" },
                { contentUrl: "https://www.telerik.com/" }
            ]
        });
    });

## See Also

* [Loading Content with AJAX in the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/ajax)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
