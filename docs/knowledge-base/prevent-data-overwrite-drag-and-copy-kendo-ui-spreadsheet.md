---
title: Preventing Accidental Data Overwrite with Drag-and-Copy in Kendo UI for jQuery Spreadsheet
description: Learn how to prevent accidental data overwrite in Kendo UI for jQuery Spreadsheet by implementing a safeguard for the Drag-and-Copy functionality.
type: how-to
page_title: Avoid Accidental Data Overwrite with Drag-and-Copy in Kendo UI Spreadsheet
meta_title: Avoid Accidental Data Overwrite with Drag-and-Copy in Kendo UI Spreadsheet
slug: prevent-data-overwrite-drag-and-copy-kendo-ui-spreadsheet
tags: kendo-ui-for-jquery, spreadsheet, changing-event, autofill, drag-and-copy, data-overwrite
res_type: kb
components: ["spreadsheet"]
ticketid: 1700019
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Spreadsheet </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.1.227 </td>
</tr>
</tbody>
</table>

## Description

I want to prevent accidental data overwrite in the Kendo UI for jQuery Spreadsheet when using the Drag-and-Copy (AutoFill) functionality. The feature poses a risk of unintentionally overwriting data in cells when users drag and copy by mistake. I am looking for a way to either stop data overwrite during drag-and-copy or prompt users to confirm before overwriting existing values.

This knowledge base article also answers the following questions:
- How can I show an alert when overwriting data in Kendo UI Spreadsheet?
- How do I prevent AutoFill from overwriting existing data?
- Can I use events to handle accidental data overwrite in Kendo UI Spreadsheet?

## Solution

To prevent accidental overwrites during drag-and-copy operations in Kendo UI for jQuery Spreadsheet, handle the [changing](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet/events/changing) event. Implement a confirmation dialog that prompts the user before proceeding with the operation.

### Steps

1. Attach an event handler to the [`changing`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet/events/changing) event of the Spreadsheet component.
2. In the event handler, check if the `changeType` is `"autoFill"`.
3. Display a confirmation dialog to the user.
4. Use `e.preventDefault()` to stop the operation if the user cancels.

### Code Example

```javascript
$("#spreadsheet").kendoSpreadsheet({
    change: function(e) {
        if (e.changeType === "autoFill") {
            if (!confirm("You are about to overwrite existing data. Continue?")) {
                e.preventDefault();
            }
        }
    }
});
```

This implementation prompts the user with a confirmation dialog whenever the Drag-and-Copy operation is triggered. If the user clicks "Cancel," the operation is blocked, preventing accidental data overwrite.

### Live Example

For a live demonstration, refer to the example below

```dojo
<div id="spreadsheet"></div>
<script>
  $("#spreadsheet").kendoSpreadsheet({
    sheets: [{
      rows: [{
        cells: [
          { value: "First"},
          { value: "Second"},
          { value: "Third"}
        ]
      }]
    }],
    changing: function(e) {    
    	if (e.changeType == "autoFill") {
    	  if (!confirm("You are about to overwrite existing data. Continue?")) {        
    	    e.preventDefault();
    	  }
    	}
  	}
  });
</script>
```

## See Also

- [Kendo UI for jQuery Spreadsheet Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Kendo UI for jQuery Spreadsheet API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet)
