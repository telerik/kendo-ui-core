---
title: Disable Resizing for Specific Columns
page_title: Disable Resizing for Specific Columns | Kendo UI Grid
description: "Learn how to disable column resizing for specific columns when working with the Kendo UI Grid widget."
slug: howto_disable_column_resizing_grid
---

# Disable Resizing for Specific Columns

Normally, column resizing is enabled or disabled for all Kendo UI Grid columns.

The example below demonstrates how to prevent resizing for specific columns.

###### Example

```html
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

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
