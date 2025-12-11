---
title: Accessing Computed Cell Values in Formula Cells Using Kendo UI for jQuery Spreadsheet
description: Learn how to access the computed value of formula cells in Kendo UI for jQuery Spreadsheet, including batch operations and recalculation methods.
type: how-to
page_title: Retrieving Formula Results in Kendo UI for jQuery Spreadsheet
meta_title: Retrieving Formula Results in Kendo UI for jQuery Spreadsheet
slug: accessing-computed-cell-values-kendo-ui-jquery-spreadsheet
tags: spreadsheet,kendo ui for jquery,batch,recalc,formula
res_type: kb
components: ["spreadsheet"]
ticketid: 1696208
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Spreadsheet for Kendo UI for jQuery
</td>
</tr>
<tr>
<td>Version</td>
<td>2025.3.1002</td>
</tr>
</tbody>
</table>

## Description

I want to retrieve the computed value of a cell containing a formula in Kendo UI for jQuery Spreadsheet. For example, a formula cell that calculates the sum of a column may return `null` when attempting to access its value. This occurs because the Spreadsheet does not calculate formulas immediately or during certain operations, like `sheet.batch()`.

This knowledge base article also answers the following questions:
- How to get the computed value of formula cells in Kendo UI Spreadsheet?
- Why does [`.value()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/spreadsheet/range/methods/value) return null for formula cells in Kendo UI Spreadsheet?
- How to access cell values after batch operations in Kendo UI Spreadsheet?

## Solution

To retrieve the computed value of a formula cell, follow these steps:

1. If using a batch operation, pass `{ recalc: true }` as an option to ensure formulas are recalculated after the batch completes.
2. Access the cell value only after the batch operation has finished. Formula recalculation occurs after the batch, not during it.

### Example of Accessing Computed Values After Batch

```javascript
sheet.batch(function() {
    // Perform changes in the Spreadsheet
}, { recalc: true });

// Access the computed value after the batch completes
var computedValue = sheet.range("U10").value();
console.log(computedValue); // Logs the computed value
```

### Important Notes
- Accessing formula values inside `sheet.batch()` will always return the value before recalculation.
- Use the Spreadsheet's `change` event to trigger logic after recalculation if needed.
- To access values from formulas on non-active sheets, activate the relevant sheet first.

### About `.recalc()` and `.refresh()`
- `.recalc()` is not a public API method and should not be used.
- `.refresh()` redraws the UI but does not trigger formula recalculation.

### Script Loading Issues

Ensure proper script loading to avoid errors:
1. Do not use `type="module"` for Kendo UI files. Use:
   ```html
   <script src="lib/kendo-telerik/js/kendo.all.min.js"></script>
   ```
2. Load `telerik-license.js` after all Kendo UI scripts.

## See Also

- [Spreadsheet Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Spreadsheet Batch Method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/batch)
- [Forum Discussion on Batch Recalculation](https://www.telerik.com/forums/spreadsheet-sheet-batch-option)
