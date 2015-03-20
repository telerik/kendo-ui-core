---
title: Apply minimum width during column resize
page_title: Apply minimum width during column resize
description: Kendo Grid example that demonstrates how to apply minimum column width during column resize.
---

# Apply minimum width during column resize

The code snippet below demonstrates how to use the internal Grid column resizing API to enforce a minimum column width during column resize.
When the user starts resizing, a "start" event is fired and some references are saved. Then they are used in the "resize" event, which is fired continuously during resizing. 
The new column width is periodically checked and if decreases below the set minimum width, the minimum column width is enforced back.
Since the Grid table(s) also receive a width style during resizing, it is overridden as well, when needed. A similar logic can be used to enforce a maximum width.

#### Example

```html
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
