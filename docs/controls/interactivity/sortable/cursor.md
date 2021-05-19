---
title: Cursor
page_title: jQuery Sortable Documentation | Cursor
description: "Get started with the jQuery Sortable by Kendo UI and manage the cursor of the widget."
slug: cursor_kendoui_sortable
position: 4
---

# Cursor

The `cursor` configuration option determines the type of cursor that will be displayed while the user drags a sortable item.

For the full list of built-in cursor types, refer to [quirksmode.org](http://quirksmode.org/css/user-interface/cursor.html).

> Avoid using a custom cursor in Internet Explorer. Due to the browser specifics in custom icon rendering, using a custom cursor may lead to performance issues.

The following example demonstrates how to change the cursor type to `"move"`.

```
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cursor: "move"
        });
    </script>
```

The `cursor` option changes the cursor style only for the time while the item is dragged. If you want to change the cursor type on `hover`, use CSS.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cursor: "url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default"
        });
    </script>

    <style>
        #sortable li {
            cursor: url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default;
        }
    </style>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
