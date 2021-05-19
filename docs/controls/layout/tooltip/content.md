---
title: Content Operations
page_title: jQuery Tooltip Documentation | Content Operations
description: "Get started with the jQuery Tooltip by Kendo UI and load its content with AJAX."
slug: content_kendoui_tooltip
position: 2
---

# Content Operations

You can use any valid technique for loading Tooltip content.

However, the Splitter provides built-in support for asynchronously loading content from URLs. These URLs return HTML fragments that can be loaded in the content area of the Tooltip. If the content that is passed to the Tooltip includes scripts, they will be executed.

The following example demonstrates how to asynchronously load content to the Tooltip.

    <div id="target">Content Text</div>

    $(document).ready(function(){
        $("#target").kendoTooltip({
            content: { url: "html-content-snippet.html" }
        });
    });

## See Also

* [Loading Content with AJAX in the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/ajax)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
