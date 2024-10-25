---
title: Apply Minimum Width When Resizing Grid Columns
page_title: Apply a Minimum Width during Column Resize - jQuery Data Grid
description: "Learn how to enforce a minimum column width during column resizing in the Kendo UI Data Grid for jQuery control."
previous_url: /controls/data-management/grid/how-to/Layout/apply-minimum-width-during-column-resize
slug: howto_apply_min_width_during_column_resize_grid
tags: grid, min, width, column, resize
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I apply a minimum width during column resize in the Kendo UI Grid?

## Solution

When the user starts resizing, a `start` event fires and some references are saved.

Then these references are used in the `resize` event, which is fired continuously during resizing. The new column width is periodically checked and if it decreases below the set minimum width, the minimum column width is enforced back. Since the Grid table(s) also receive a width style during resizing, it is overridden as well when needed. To enforce a maximum width, you can use a similar logic.

The following example demonstrates how to use the API for internal Grid column resizing to enforce a minimum column width during column resize.

```dojo
    <div id="grid"></div>
    <script>
        $(function(){

            $("#grid").kendoGrid({
               dataSource: {
                   data: [{foo: "item", bar: "number", baz: "one"}]
               },
               resizable: true
            });

            var minTableWidth;
            var minColumnWidth = 100;
            var th;
            var idx;
            var grid;

            $("#grid").data("kendoGrid").resizable.bind("start", function(e) {
               th = $(e.currentTarget).data("th");
               idx = th.index();
               grid = th.closest(".k-grid").data("kendoGrid");
            });

            $("#grid").data("kendoGrid").resizable.bind("resize", function(e) {
               if (th.width() >= minColumnWidth) {
                  minTableWidth = grid.tbody.closest("table").width();
               }

               if (th.width() < minColumnWidth) {
                  // the next line is ONLY needed if Grid scrolling is enabled
                  grid.thead.closest("table").width(minTableWidth).children("colgroup").find("col").eq(idx).width(minColumnWidth);

                  grid.tbody.closest("table").width(minTableWidth).children("colgroup").find("col").eq(idx).width(minColumnWidth);
               }
            });

        });
    </script>
```

The following example shows how to apply a minimum width when resizing a single Data Grid column.

```dojo
<div id="grid"></div>
    <script>
      $(function(){
        $("#grid").kendoGrid({
          dataSource: {
            data: [{foo: "item", bar: "number", baz: "one"}]
          },
          columns: [
            {field: "foo"},
            {field: "bar"},
            {field: "baz"}
          ],
          resizable: true
        });

        var minTableWidth;
        var minColumnWidth = 100;
        var fooTh;
        var idxOfRestrictedColumn;
        var grid;

        $("#grid").data("kendoGrid").resizable.bind("start", function(e) {
          fooTh = $("th[data-field='foo']");
          idxOfRestrictedColumn = fooTh.index();
          grid = fooTh.closest(".k-grid").data("kendoGrid");
        });

        $("#grid").data("kendoGrid").resizable.bind("resize", function(e) {
          var fooTh = $("th[data-field='foo']");
          if (idxOfRestrictedColumn === 0) {
            if (fooTh.width() >= minColumnWidth) {
              minTableWidth = grid.tbody.closest("table").width();
            }

            if (fooTh.width() < minColumnWidth) {
              // The next line is ONLY needed if the scrolling of the Grid is enabled.
              grid.thead.closest("table").width(minTableWidth).children("colgroup").find("col").eq(idxOfRestrictedColumn).width(minColumnWidth);
              grid.tbody.closest("table").width(minTableWidth).children("colgroup").find("col").eq(idxOfRestrictedColumn).width(minColumnWidth);
            }
          }

        });
      });
    </script>
```

The following example shows how to apply the width to a certain column if the window is smaller than the specified number by utilizing the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method.

```dojo
    <div id="grid"></div>
    <script>
      $(function(){
        $("#grid").kendoGrid({
          dataSource: {
            data: [{foo: "item", bar: "number", baz: "one"}]
          },
          columns: [
            {field: "foo"},
            {field: "bar"},
            {field: "baz"}
          ],
          resizable: true
        });
      });

      $(window).on("resize", function () {
        var minColumnWidth = 100;
        var grid = $("#grid").data("kendoGrid");
        var columns = grid.getOptions().columns;

        if ($(window).width() <= 716) {
          columns[0].width = minColumnWidth;
          grid.setOptions({
            columns: columns
          });
        }
        else {
          columns[0].width = "";
          grid.setOptions({
            columns: columns
          })
        };
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
* [Product Page of the jQuery Data Grid](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
