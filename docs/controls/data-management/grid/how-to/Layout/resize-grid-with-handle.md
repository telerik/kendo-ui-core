---
title: Resize the Grid by Dragging and Apply the New Size
page_title: Resize the Grid by Dragging and Apply the New Size | Kendo UI Grid
description: "Learn how to resize the Kendo UI Grid widget and to apply the new size."
slug: howto_resize_by_dragging_and_apply_the_new_size_grid
---

# Resize the Grid by Dragging and Apply the New Size

The example below demonstrates how to resize the Kendo UI Grid by dragging its bottom-right corner.

###### Example

```html
    <style>
        html {
            font: 13px sans-serif;
        }
      .grid-wrap {
        position: relative;
        padding-bottom: 2px;
      }
      .grid-wrap .k-overlay {
        position: absolute;
        opacity: 0;
        z-index: 1;
      }
      .grid-wrap .k-resize-se {
        position: absolute;
        z-index: 2;
        bottom: 6px;
        right: 6px;
      }
      .grid-wrap > .k-grid {
        height: 300px;
      }
    </style>
    <p>Drag the handle at the bottom-right Grid corner to resize the widget and apply a new page size.</p>
    <div class="grid-wrap">
      <div id="grid1" class="kendogrid"></div>
    </div>

  <script>

    var minGridWidth = 150;
    var minGridHeight = 100;

    function averageRowHeight(table) {
        var rowCount = table.find("tr").length;
        if (rowCount > 0) {
            return table.height() / table.find("tr").length;
        } else {
            var columnCount = table.find("col").length;
            table.children("tbody").append("<tr><td colspan='" + columnCount + "'>&nbsp;</td></tr>");
            return table.height();
        }
    }

    function changePageSize(grid) {
        grid.dataSource.pageSize( Math.floor(grid.wrapper.children(".k-grid-content").height() / averageRowHeight(grid.tbody.parent())) );    
    }

    $(function(){
        var options = {
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            ShipCity: { type: "string" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            autoBind: false,
            pageable: {
                numeric: false,
                previousNext: false
            },
            columns: [{
                    field:"OrderID",
                    filterable: false
                },
                "Freight",
                {
                    field: "OrderDate",
                    title: "Order Date",
                    format: "{0:MM/dd/yyyy}"
                }, {
                    field: "ShipName",
                    title: "Ship Name"
                }, {
                    field: "ShipCity",
                    title: "Ship City"
                }
            ]
        };

        $("#grid1").kendoGrid(options);

        changePageSize($("#grid1").data("kendoGrid"));

        var wrappers = $(".grid-wrap");
        wrappers.each(function(idx, element){
            var wrapper = $(element);
            // add resize handle
            var resizeHandle = $("<span class='k-icon k-resize-se' />").appendTo(wrapper);

            resizeHandle.kendoDraggable({
              dragstart: function(e) {
                // overlay iframe to prevent event gap
                wrapper.append("<div class='k-overlay' />");
                // cache some offsets for later use
                this.top = wrapper.offset().top - this.element.height();
                this.left = wrapper.offset().left - this.element.width();
                var win = $(window);
                this.scrollTop = win.scrollTop();
                this.scrollLeft = win.scrollLeft();
              },
              drag: function(e) {
                // update Grid height
                var gridElement = wrapper.children(".k-grid");
                gridElement.height(Math.max(minGridHeight, (e.clientY || e.originalEvent.clientY) - this.top + this.scrollTop));
                wrapper.width(Math.max(minGridWidth, (e.clientX || e.originalEvent.clientX) - this.left + this.scrollLeft));
                gridElement.data("kendoGrid").resize();
              },
              dragend: function(e) {
                // remove overlay
                wrapper.children(".k-overlay").remove();
                changePageSize(wrapper.children(".k-grid").data("kendoGrid"));
              }
            });
        });

    });

  </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
