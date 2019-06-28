---
title: Disable Resizing for Specific Columns
page_title: Disable Resize of Specific Columns | Kendo UI Grid for jQuery
description: "An example on how to disable column resizing for specific columns in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/disable-column-resize-for-specific-columns
slug: howto_disable_column_resizing_grid
tags: grid, disable, resizing, specific, columns
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I disable column resizing for specific columns in the Kendo UI Grid for jQuery?

## Solution

Column resizing is enabled or disabled for all Grid columns.

The following example demonstrates how to prevent resizing for specific columns.

```dojo
    <p>The <strong>bar</strong> column cannot be resized:</p>
    <div id="grid"></div>
    <script>
        $(function(){

            $("#grid").kendoGrid({
               dataSource: {
                   data: [
                    {foo: "foo 1", bar: "bar 1", baz: "baz 1"},
                    {foo: "foo 2", bar: "bar 2", baz: "baz 2"}
                   ]
               },
               resizable: true
            });

            var grid = $("#grid").data("kendoGrid");

            grid.resizable.bind("start", function(e) {
                if ($(e.currentTarget).data("th").data("field") == "bar") {
                  e.preventDefault();
                  setTimeout(function(){
                    grid.wrapper.removeClass("k-grid-column-resizing");
                    $(document.body).add(".k-grid th").css("cursor", "");
                  });
                }
            });

        });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
