---
title: Items
page_title: jQuery Sortable Documentation | Items
description: "Get started with the jQuery Sortable by Kendo UI and manage the items of the widget."
slug: items_kendoui_sortable
position: 3
---

# Items

The Sortable provides options for controlling the behavior of its items.

* The `filter` option specifies which items inside the Sortable container will be sortable. Items which do not match the `filter` selector will neither be draggable nor reordered when the user drags a sortable item over them.
* The `disabled` option specifies which items inside the Sortable container cannot be dragged. Items which match the `disabled` selector cannot be dragged but will reorder when the user drags a sortable item over them.

The following example demonstrates how to disable all items at runtime.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <button id="btnDisable">Disable</button>

    <script>
        $("#sortable").kendoSortable({
            disabled: ".disabled"
        });

        $("#btnDisable").click(function() {
            $("#sortable").children().addClass("disabled");
        });
    </script>
```

## See Also

* [Filtering and Disabling Items in the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/filter-disable)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
