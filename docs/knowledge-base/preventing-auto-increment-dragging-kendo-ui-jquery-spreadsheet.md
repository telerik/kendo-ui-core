---
title: Disabling Auto-Increment Behavior in Kendo UI for jQuery Spreadsheet
description: Learn how to disable the auto-increment behavior in Kendo UI for jQuery Spreadsheet and copy the same values while dragging.
type: how-to
page_title: Preventing Auto-Increment on Dragging in Kendo UI for jQuery Spreadsheet
meta_title: Preventing Auto-Increment on Dragging in Kendo UI for jQuery Spreadsheet
slug: preventing-auto-increment-dragging-kendo-ui-jquery-spreadsheet
tags: spreadsheet, kendo ui for jquery, autofill, changing event, custom implementation
res_type: kb
components: ["spreadsheet"]
ticketid: 1700019
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Spreadsheet</td>
</tr>
<tr>
<td> Version </td>
<td>2025.4.1111</td>
</tr>
</tbody>
</table>

## Description

When dragging and dropping cell values in the [Kendo UI for jQuery Spreadsheet](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview), numeric fields or text fields ending with numbers automatically increment by default. To meet a business requirement where the same text or value is copied without auto-increment during drag-and-copy (AutoFill), this article details an event override for the default behavior.

This knowledge base article also answers the following questions:
- How to prevent auto-increment in Kendo UI for jQuery Spreadsheet drag-and-drop?
- How to copy values without incrementing numbers in Spreadsheet AutoFill?
- How to override AutoFill behavior in Kendo UI for jQuery Spreadsheet?

## Solution

To disable the auto-increment behavior during drag-and-copy in Kendo UI for jQuery Spreadsheet, use the [`changing`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet/events/changing) event to override the default AutoFill logic. Follow these steps:

1. Attach a listener to the [`changing`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet/events/changing) event of the Spreadsheet widget.
2. Detect if the change type is "autoFill".
3. Prevent the default AutoFill behavior using `e.preventDefault()`.
4. Copy the original values to the target [`range`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/spreadsheet/range) without incrementing.

Use the following code snippet:

```javascript
$("#spreadsheet").kendoSpreadsheet({
    change: function(e) {
        // Check if this is an autofill operation
        if (e.changeType === "autoFill") {
            const spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            const sheet = spreadsheet.activeSheet();

            // Get the current selection (source range being dragged)
            const selection = sheet.selection();
            let sourceSelectionValues = null;

            if (selection) {
                sourceSelectionValues = selection.values();
            }

            // Get the target range (where filling occurs)
            const targetRange = e.range;
            const targetValues = targetRange.values();
            const rowCount = targetValues.length;
            const colCount = targetValues[0].length;

            // Prevent default autofill behavior
            e.preventDefault();

            // Repeat the source values exactly
            if (sourceSelectionValues) {
                const lastSourceRow =
                    sourceSelectionValues[sourceSelectionValues.length - 1];
                const newValues = [];
                for (let i = 0; i < rowCount; i++) {
                    const row = [];
                    for (let j = 0; j < colCount; j++) {
                        row.push(lastSourceRow[j % lastSourceRow.length]);
                    }
                    newValues.push(row);
                }
                targetRange.values(newValues);
            }
        }
    }
});
```

Optionally, customize the drag hint text:

```javascript
$("#spreadsheet").kendoSpreadsheet({
    render: function(e) {
        var dragHint = $(".k-auto-fill-br-hint");
        if (dragHint.length > 0) {
            var text = e.sender.activeSheet().selection().values()[0].join(' ');
            $(".k-auto-fill-br-hint .k-tooltip").text(text);
        }
    }
});
```

The full implementation is demonstrated in the example below:

```dojo
<div id="spreadsheet" style="width: 100%"></div>
    <script type="text/javascript" charset="utf-8">
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            rows: [
              {
                cells: [
                  { value: "serial number" },
                  { value: "quantity" },
                  { value: "Code" },
                ],
              },
              {
                cells: [{ value: 1 }, { value: 5 }, { value: "Task 1" }, { value: "1 Text" } ],
              },
            ],
          },
        ],
        render: function (e) {
          var draghint = $(".k-auto-fill-br-hint");
          if (draghint.length > 0) {
            // change the text of a drag hit if it is displayed
            var text = e.sender.activeSheet().selection().values()[0].join(" ");
            $(".k-auto-fill-br-hint .k-tooltip").text(text);
          }
        },
        changing: function (e) {
          // Check if this is an autofill operation
          if (e.changeType === "autoFill") {
            const spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            const sheet = spreadsheet.activeSheet();

            // Get the current selection (the source range being dragged)
            const selection = sheet.selection();
            let sourceSelectionValues = null;

            if (selection) {
              sourceSelectionValues = selection.values();
            }

            // Get the target range (where we're filling to)
            const targetRange = e.range;

            // Get target range dimensions from the values array instead of methods
            const targetValues = targetRange.values();
            const rowCount = targetValues.length;
            const colCount =
              targetValues.length > 0 ? targetValues[0].length : 0;

            // Prevent the default autofill behavior
            e.preventDefault();

            // Apply custom logic: repeat the source values without incrementing
            if (sourceSelectionValues && sourceSelectionValues.length > 0) {
              const sourceColCount = sourceSelectionValues[0]
                ? sourceSelectionValues[0].length
                : 1;

              // Use the last row of the source selection for repeating
              const lastSourceRow =
                sourceSelectionValues[sourceSelectionValues.length - 1];

              // Create new values array with repeated source values
              const newValues = [];
              for (let i = 0; i < rowCount; i++) {
                const row = [];
                for (let j = 0; j < colCount; j++) {
                  // Repeat the source values exactly (no increment)
                  row.push(lastSourceRow[j % sourceColCount]);
                }
                newValues.push(row);
              }
              // Set the values on the target range
              targetRange.values(newValues);
            }
          }
        },
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Spreadsheet Overview](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
- [Spreadsheet API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
- [Spreadsheet Range API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/spreadsheet/range)
