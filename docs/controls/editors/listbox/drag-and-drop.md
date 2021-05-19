---
title: Dragging and Dropping
page_title: jQuery ListBox Documentation | Dragging and Dropping
description: "Get started with the jQuery ListBox by Kendo UI and enable the dragging and dropping of its items."
slug: dragdrop_kendoui_listbox_widget
position: 4
---

# Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set its [`draggable`](/api/javascript/ui/listbox/configuration/draggable) property to `true`.

You can also customize the drag-and-drop behavior of the widget by using its `draggable.placeholder` and `draggable.hint` options.

> The ListBox does not support dragging and dropping for multiple selected items.

```dojo

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            draggable: {
                hint: function(element) {
                    return $("<span></span>")
                        .text(element.text())
                        .css("color", "#FF0000");
                },
                placeholder: function(element) {
                    return element.clone().css({
                        "opacity": 0.3,
                        "border": "1px dashed #000000"
                    });
                }
            },
            dataSource: [
                { name: "John", id: 1 },
                { name: "Jane", id: 2 },
                { name: "Jim", id: 3 },
                { name: "Tim", id: 4 },
                { name: "Mary", id: 5 }
            ],
            dataTextField: "name",
            dataValueField: "id"
        });
    </script>
```

## See Also

* [Dragging and Dropping in the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/drag-and-drop)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
