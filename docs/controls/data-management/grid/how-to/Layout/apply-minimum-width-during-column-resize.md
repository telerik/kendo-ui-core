---
title: Apply Minimum Width during Column Resize
page_title:  Apply Minimum Width during Column Resize | Kendo UI Grid
description: "Learn how to access an editor control in the edit event handler of the Kendo UI Grid widget."
slug: howto_apply_min_width_during_column_resize_grid
---

# Apply Minimum Width during Column Resize

When the user starts resizing, a `start` event is fired and some references are saved. Then they are used in the `resize` event, which is fired continuously during resizing. The new column width is periodically checked and if it decreases below the set minimum width, the minimum column width is enforced back. Since the Grid table(s) also receive a width style during resizing, it is overridden as well, when needed. A similar logic can be used to enforce a maximum width.

The example below demonstrates how to use the internal Grid column resizing API to enforce a minimum column width during column resize.

###### Example

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

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
