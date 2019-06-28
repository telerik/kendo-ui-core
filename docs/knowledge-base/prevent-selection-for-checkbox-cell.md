---
title: Prevent Selection for Checkbox Cells
page_title:  Prevent Selection for Checkbox Cells | Kendo UI Grid for jQuery
description: "An example on how to prevent selection for checkbox cells in the Kendo UI Grid for jQuery. "
previous_url: /controls/data-management/grid/how-to/Selection/prevent-selection-for-checkbox-cell
slug: howto_prevent_selection_checkbox_cells_grid
tags: prevent, selection, grid, checkbox, cells
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I prevent selection for checkbox cells in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to prevent the cell-selection functionality for a checkbox or any cell.

```dojo
    <div id="grid"></div>
    <script>
      $(function() {

        var grid = $("#grid").kendoGrid({
          dataSource: {
            data: [{foo:1}, {foo:2}]
          },
          columns: [
            {
              template: '<input type="checkbox" />'
            },
            "foo"
          ],
          selectable: "multiple cell"
        }).on(kendo.support.pointers ? "pointerup" : "mouseup", ".k-grid-content tr > td:first-child", function () {

          grid.selectable.one("select", function(e) {
            e.preventDefault();
          });

        }).data("kendoGrid");
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
