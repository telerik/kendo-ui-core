---
title: Validating Populated Rows in Kendo UI for jQuery Spreadsheet
description: Learn how to validate Spreadsheet rows when at least one required cell is populated, ensuring that all required cells in the row are filled.
type: how-to
page_title: Apply Validation for Populated Rows in Kendo UI for jQuery Spreadsheet
slug: validating-populated-rows-kendo-jquery-spreadsheet
tags: kendo ui for jquery, spreadsheet, validation, custom validation, formulas, countblank, counta
ticketid: 1711870
res_type: kb
components: ["spreadsheet"]
---

## Environment

| Product | Version |
| --- | --- |
| Progress® Kendo UI® Spreadsheet for jQuery | 2026.3.811 |

## Description

I want to validate rows in the [Kendo UI for jQuery Spreadsheet](/api/ui/spreadsheet) that are considered populated, where at least one required cell in a row has a value. If any required cell is filled, all other required cells in the row must also be filled.

This KB also answers the following questions:

- How can I use custom validation in Kendo UI for jQuery Spreadsheet?
- How can I validate a Spreadsheet row that contains formula cells?
- How can I enforce an all-or-nothing rule for Spreadsheet row validation?

## Solution

Use a custom validation formula that considers a row valid when it is either completely empty or has no blank required cells. Apply the validation after initializing the Spreadsheet and target only the input columns that participate in the rule.

The following example validates rows 2 through 200 across columns A through D. Empty or fully populated rows pass. Partially populated rows display the `Incomplete Row` warning. To test the rule, enter a value in `A2`, then complete `B2:D2`. Set `type` to `"reject"` to block incomplete rows.

```dojo
<div id="spreadsheet" style="width: 100%;"></div>

<script>
$(function () {
  var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
    excel: { proxyURL: "https://demos.telerik.com/service/v2/core/export" },
    pdf: { proxyURL: "https://demos.telerik.com/service/v2/core/export" },
    sheets: [
      {
        name: "Data Sheet",
        columns: [{ width: 100 }, { width: 200 }, { width: 150 }, { width: 150 }]
      }
    ]
  }).data("kendoSpreadsheet");

  var sheet = spreadsheet.activeSheet();
  var firstDataRow = 2;
  var lastDataRow = 200;
  var requiredColumns = ["A", "B", "C", "D"];

  for (var row = firstDataRow; row <= lastDataRow; row++) {
    var range = "$" + requiredColumns[0] + "$" + row + ":$" + requiredColumns[requiredColumns.length - 1] + "$" + row;
    var formula = "OR(COUNTA(" + range + ")=0, COUNTBLANK(" + range + ")=0)";
    var firstCell = requiredColumns[0] + row;
    var lastCell = requiredColumns[requiredColumns.length - 1] + row;

    sheet.range(firstCell + ":" + lastCell).validation({
      dataType: "custom",
      comparerType: "custom",
      from: formula,
      allowNulls: true,
      type: "warning",
      showButton: false,
      titleTemplate: "Incomplete Row",
      messageTemplate: "If any cell in this row is filled, all required input cells must be filled."
    });
  }
});
</script>
```

The formula `OR(COUNTA($A$2:$D$2)=0, COUNTBLANK($A$2:$D$2)=0)` considers the row valid when `COUNTA` finds no populated cells or `COUNTBLANK` finds no blank cells. The absolute references keep the formula tied to the current row while the validation is applied to each row.

To customize the validation, update `requiredColumns` with the input columns that must be completed. Use `type: "reject"` instead of `type: "warning"` to block invalid edits, and update `messageTemplate` to change the warning text. Exclude formula or result columns from `requiredColumns` when they should not be entered by the user.

When loading data from JSON or XLSX after initialization, apply the validation rules after the data is loaded so that the populated rows use the same validation configuration.

## See Also

- [Spreadsheet Validation Documentation](/api/ui/spreadsheet)
- [Kendo UI for jQuery Spreadsheet Overview](/controls/spreadsheet/overview)
- [Spreadsheet Validation Demo](https://demos.telerik.com/kendo-ui/spreadsheet/validation)
