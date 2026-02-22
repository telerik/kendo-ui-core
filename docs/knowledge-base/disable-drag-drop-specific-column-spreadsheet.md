---
title: Disabling Drag and Drop for a Specific Column in Spreadsheet
description: Learn how to prevent drag and drop functionality for a specific column in the Kendo UI for jQuery Spreadsheet.
type: how-to
page_title: How to Disable Drag and Drop for Specific Columns in Kendo UI Spreadsheet
slug: disable-drag-drop-specific-column-spreadsheet
tags: kendo-ui, spreadsheet, drag-and-drop, disable-functionality
res_type: kb
components: ["spreadsheet"]
ticketid: 1671669
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI for jQuery® Spreadsheet</td>
</tr>
</tbody>
</table>

## Description

In some cases, you may want to restrict the drag and drop functionality for a specific column in the Kendo UI for jQuery Spreadsheet. This is to prevent users from accidentally or intentionally modifying data in columns that should remain static.

This knowledge base article also answers the following questions:
- How can I disable auto-fill for a particular column in the Spreadsheet?
- What approach should I take to prevent dragging of cells in a specified column?

## Solution

To disable drag and drop for a specific column in the Spreadsheet, handle the [changing](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/changing) event. Within the event handler, verify if the action is an auto-fill operation and if it originates from the column you wish to restrict. If both conditions are met, prevent the default behavior using `e.preventDefault()`. Below is an example that disables drag and drop for the second column (Column B).

```javascript
changing: function(e){
    var range = e.range._sheet._autoFillOrigin;
    // Check if the operation is auto-fill and if it originates from column B (index 1)
    if(e.changeType == 'autoFill' && range.bottomRight.col == 1 && range.topLeft.col == 1) {
        alert('Dragging column B is prevented');
        e.preventDefault();
    }              
},
```

Implement this logic in your application to effectively disable drag and drop for the specified column. Ensure to attach this event handler correctly to your Spreadsheet instance.

Explore a live example where dragging column B does not change the Spreadsheet's cell data: [Dojo example](https://dojo.telerik.com/kbqwNFgm).

## See Also

- [Spreadsheet Changing Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/changing)
- [Kendo UI for jQuery Spreadsheet Overview](https://docs.telerik.com/kendo-ui/controls/spreadsheet/overview)
