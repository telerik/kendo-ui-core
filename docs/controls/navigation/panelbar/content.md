---
title: Content Operations
page_title: jQuery PanelBar Documentation | Content Operations
description: "Get started with the jQuery PanelBar by Kendo UI and nest the item content or load the content of the widget with AJAX."
slug: content_kendoui_panelbar
position: 5
---

# Content Operations

The PanelBar provides options for nesting the content of its items and to load its content with AJAX.

## Nesting Item Content

PanelBar items may contain nested content, including markup, within a `<div>` element. The text content that is located outside the nested content is used as a title of the item.

    <ul id="panelbar">
        <li>Item with no content</li>
        <li>Item with content
            <div>This is nested content of a PanelBar item.</div>
        </li>
    </ul>

    <script>
        $(document).ready(function() {
            $("#panelbar").kendoPanelBar();
        });
    </script>

## Loading Content with AJAX

The PanelBar provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the PanelBar item content area. Content `<div>` elements have to be empty for the AJAX content loading to work.

When the PanelBar loads remote content with AJAX, the server response is cached in-memory so that the subsequent expand or collapse actions do not trigger subsequent AJAX requests.

The following example demonstrates how to load a PanelBar item content asynchronously with AJAX.

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
            </ul>
        </li>
        <li>Item 2</li>
        <li>
            Item with Dynamic Content
            <div></div>
        </li>
    </ul>

    <script>
        $("#panelbar").kendoPanelBar({
            contentUrls:[
                null,
                null,
                "html-content-snippet.html"
            ]
        });
    </script>

## See Also

* [Loading Content with AJAX in the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/ajax)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
