---
title: Selection
page_title: jQuery ListBox Documentation | Selection
description: "Get started with the jQuery ListBox by Kendo UI and use its single or multiple selection modes."
slug: selection_kendoui_listbox_widget
position: 3
---

# Selection

By default, the ListBox has its single selection mode enabled.

To configure the widget into its multiple selection mode, add `selectable: "multiple"` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Kendo UI ListBox together or reordered as a set among other items.

You can enable the reordering of the selected items by using any of the following approaches:

* The `moveUp` and `moveDown` command buttons of the toolbar.
* The drag-and-drop functionality if the widget is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combination.

> The ListBox does not support dragging and dropping for multiple selected items.

```dojo

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            selectable: "multiple",
            dataSource: [
                { name: "John", id: 1 },
                { name: "Jane", id: 2 },
                { name: "Jim", id: 3 },
                { name: "Tim", id: 4 },
                { name: "Mary", id: 5 }
            ],
            dataTextField: "name",
            dataValueField: "id",
            toolbar: {
              tools: [ "moveUp", "moveDown", "remove" ]
            }
        });
    </script>
```

## See Also

* [Basic Usage of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/index)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
