---
title: Scrolling
page_title: jQuery ContextMenu Documentation | Scrolling
description: "Get started with the jQuery ContextMenu by Kendo UI and enable the scrolling functionality of the widget."
slug: scrolling_kendoui_contextmenu
position: 5
---

# Scrolling

By default, the items inside the ContextMenu do not scroll.

However, you can enable scrolling by setting the [`scrollable`](/kendo-ui/api/javascript/ui/contextmenu/configuration/scrollable) property of the ContextMenu to `true`. Once enabled, the ContextMenu displays buttons which scroll the items if they cannot fit the viewport height.

The following example demonstrates how to enable scrolling within the ContextMenu.

    <div id="target">Right Click to Open ContextMenu</div>
    <ul id="context-menu">
        <li>Item 1
        <ul>
            <li>Sub Item 1
            <ul>
                <li>Sub sub Item 1</li>
                <li>Sub sub Item 2</li>
                <li>Sub sub Item 3</li>
            </ul>
            </li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
        </ul>
        </li>
        <li>Item 2
        <ul>
            <li>Sub Item 1</li>
            <li>Sub Item 2</li>
            <li>Sub Item 3</li>
        </ul>
        </li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            scrollable: true
        });
    </script>

You can also customize the scrollable amount by setting a value (in pixels) to the [`distance`](/kendo-ui/api/javascript/ui/contextmenu/configuration/scrollable.distance) property. `distance` defaults to `50`.

    <div id="target">Right Click to open the ContextMenu</div>
    <ul id="context-menu">
        <li>Item 1
        <ul>
            <li>Sub Item 1
            <ul>
                <li>Sub sub Item 1</li>
                <li>Sub sub Item 2</li>
                <li>Sub sub Item 3</li>
            </ul>
            </li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
        </ul>
        </li>
        <li>Item 2
        <ul>
            <li>Sub Item 1</li>
            <li>Sub Item 2</li>
            <li>Sub Item 3</li>
        </ul>
        </li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            scrollable: {
                distance: 10
            }
        });
    </script>

## See Also

* [Basic Usage of the ContextMenu (Demo)](https://demos.telerik.com/kendo-ui/menu/context-menu)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
