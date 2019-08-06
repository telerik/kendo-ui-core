---
title: Resize the Grid by Dragging and Apply the New Size
page_title: Resize via Drag Handle | Kendo UI Grid for jQuery
description: "An example on how to resize the widget via drag handle and apply the new size."
previous_url: /controls/data-management/grid/how-to/Layout/resize-grid-with-handle
slug: howto_resize_by_dragging_and_apply_the_new_size_grid
tags: resize, grid, via, drag, dragging, handle, apply, new, size
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

How can I resize the Kendo UI Grid with the drag handle and apply the new size?

## Solution

The following example demonstrates how to resize the Kendo UI Grid by dragging its bottom-right corner.

The handler will be shown only at the bottom-right corner of the Grid after hover.

```dojo
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
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
