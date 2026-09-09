---
title: Customizing Drag Handle Appearance in Kendo UI for jQuery Grid
description: Learn how to use the reorderable feature in Kendo UI for jQuery Grid to drag and drop individual rows while customizing the drag handle's appearance.
type: how-to
page_title: Customize the Drag Handle in Kendo UI for jQuery Grid with Custom Drag Handle
meta_title: Customize the Drag Handle in Kendo UI for jQuery Grid 
slug: customizing-drag-handle-kendo-grid
tags: kendo-ui-for-jquery, grid, drag-and-drop, reorderable, selectable, drag-handle
res_type: kb
ticketid: 1716232
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Drag and Drop for Kendo UI for jQuery, <br/>
Grid for Kendo UI for jQuery
</td>
</tr>
<tr>
<td>Version</td>
<td>2026.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to customize the appearance of the drag handle so it displays specific data instead of the default three stripes icon.

This knowledge base article also answers the following questions:
- How can I customize the drag handle in Kendo UI for jQuery?

## Solution

To customize the drag handle appearance in the Kendo UI for jQuery Grid, use the [`dataBound`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/grid/events/databound) event to replace the default content of the `.k-drag-cell` element.

1. Use the `dataBound` event of the Grid to access the drag handle elements.
2. Replace the default content of the `.k-drag-cell` element with custom content.

Here is an example:

```javascript
 dataBound: function () {
          $(".k-drag-cell")
            .empty()
            .append('<span>Custom</span><span class="custom"></span>');
          kendo.ui.icon($(".custom"), { icon: "star" });
        },
```

Here you will find a runnable example:
```dojo
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{ draggable: true, width: 100 }, { field: "name" }],
        reorderable: {
          rows: true,
          columns: true,
        },
        dataBound: function () {
          $(".k-drag-cell")
            .empty()
            .append('<span>Custom</span><span class="custom"></span>');
          kendo.ui.icon($(".custom"), { icon: "star" });
        },
        dataSource: [
          { id: 1, name: "Jane" },
          { id: 2, name: "John" },
          { id: 3, name: "Michael" },
          { id: 4, name: "Peter" },
        ],
      });
    </script>
```

In this example:
- The `dataBound` event handler modifies the `.k-drag-cell` to display custom content such as text or data.
- Replace `'Custom Data'` in the code above with the desired content or data.

## See Also

- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) 
- [Kendo UI for jQuery Grid API](/api/ui/grid) 
