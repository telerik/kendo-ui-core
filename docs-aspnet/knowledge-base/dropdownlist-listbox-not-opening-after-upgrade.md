---
title: Embedding DropDownList in ListBox - DropDownList Not Opening After Upgrade
description: Learn how to resolve the issue where a Kendo UI for jQuery DropDownList embedded in a ListBox does not open after upgrading to version 2026.3.811.
type: how-to
page_title: DropDownList in ListBox Not Opening on Interaction - Kendo UI for jQuery
meta_title: DropDownList in ListBox Not Opening on Interaction - Kendo UI for jQuery
slug: dropdownlist-listbox-not-opening-after-upgrade
tags: dropdownlist,listbox,kendo-ui-for-jquery,event-propagation
res_type: kb
ticketid: 1719086
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
DropDownList for Kendo UI for jQuery, <br/>
ListBox for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.3.811 </td>
</tr>
</tbody>
</table>

## Description

After upgrading, the Kendo UI for jQuery [DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist) embedded inside a Kendo UI for jQuery ListBox no longer opens on interaction. This issue occurs due to the ListBox's internal selection and drag-and-drop logic, which interferes with the interactive behavior of nested widgets, such as DropDownList.

This knowledge base article also answers the following questions:
- Why does DropDownList inside ListBox close immediately on interaction?
- How to make DropDownList work inside ListBox after upgrading?
- How to prevent ListBox event interference with nested widgets?

## Solution

To resolve the issue, prevent the ListBox from reacting to mouse events originating from the DropDownList. This can be achieved by stopping event propagation for interactions on the DropDownList elements.

1. Use the internal `_getList` method of the ListBox to access the DOM.
2. Attach a `click` event handler to the DropDownList elements.
3. Stop the propagation of the click event.

Here is the updated code snippet:

```javascript
listBox._getList().on("click", ".k-dropdownlist>*", function (e) {
    e.stopPropagation();
});
```

### Complete Example

Below is runnable sample with the workaround applied:

```dojo
<div id="example" role="application">
    <div class="demo-section wide">
        <div id="listbox"></div>
    </div>
    <script>
        $(document).ready(function () {
            var listbox =
            $("#listbox").kendoListBox({
                dataTextField: "text",
                dataValueField: "id",
                dataSource: [
                { id: "ddl-1", text: "ddl-1" },
                { id: "ddl-2", text: "ddl-2" },
                { id: "ddl-3", text: "ddl-3" },
                { id: "ddl-4", text: "ddl-4" }
                ],
                template: function(dataItem) {
                  return '<div id="' + dataItem.id + '"></div>';
                }
            }).data('kendoListBox');

            var data = listbox.dataSource.data();

            for(var i = 0; i < data.length; i++) {
                listbox.wrapper.find('#' + data[i].id).kendoDropDownList({
                  dataTextField: "text",
                  dataValueField: "value",
                  dataSource: createDataSource(data[i].id),
                  popup: {
                     appendTo: $("#example")
                  }
                });
            }

            function createDataSource(id) {
                var items = [];

                for(var i = 0; i < 5; i++) {
                  items.push({
                    text: id + '-' + i,
                    value: id + '-' + i
                  });
                }

                return items;
            }

          	  listbox._getList().on("click", ".k-dropdownlist>*", function (e) {
                        e.stopPropagation();
                    });
        });

    </script>
</div>
<style>
body {
position: relative;
width: 100%;
height: 100%;
}
    #example .demo-section {
        width: 780px;
overflow: auto;
    }

    #example .k-listbox {
        width: 326px;
        height: 350px;
overflow: auto;
    }
</style>
```

## See Also

- [DropDownList Overview](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
- [ListBox Overview](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)
```
