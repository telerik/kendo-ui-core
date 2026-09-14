---
title: Using Selectable and Reorderable Simultaneously in Kendo UI for jQuery Grid
description: Learn how to implement selectable and reorderable simultaneously in Kendo UI for jQuery Grid to allow single-row and multi-row drag-and-drop functionality.
type: how-to
page_title: Achieving Simultaneous Selectable and Reorderable Rows in Kendo UI for jQuery Grid
meta_title: Selectable and Reorderable Rows in Kendo UI for jQuery Grid
slug: selectable-reorderable-rows-kendo-jquery-grid
tags: kendo-ui-for-jquery, grid, selectable, reorderable, drag-and-drop
res_type: kb
ticketid: 1716232
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>2026.2.520</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

I want to implement both [columns.selectable](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/grid/configuration/columns#columnsselectable) and [columns.draggable](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/grid/configuration/columns#columnsdraggable) functionality in Kendo UI for jQuery Grid. The goal is to allow dragging and dropping individual rows without requiring checkbox selection, while also enabling multi-row drag-and-drop using checkboxes.

This knowledge base article also answers the following questions:
- How can I drag and drop single rows without selecting in Kendo UI for jQuery Grid?
- How do I enable multi-row drag-and-drop with checkboxes in Kendo UI for jQuery Grid?
- Can selectable and reorderable functionalities work together in Kendo UI for jQuery Grid?

## Solution

To achieve both single-row and multi-row drag-and-drop functionality in Kendo UI for jQuery Grid, follow the steps below:

1. Add a checkbox column using a template for row selection. Refer to the [Grid Selection Checkbox](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/grid-selection-checkbox).

2. Enable the [`selectable: "multiple, row"`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/grid/configuration/selectable) option in the Grid configuration. This setting allows selecting multiple rows for drag-and-drop.

3. Enable the [`reorderable.rows`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/grid/configuration/reorderable#reorderablerows) feature for single-row drag-and-drop functionality.

You can find a working example of this setup below: 
```dojo
 <div id="grid"></div>
    <button id="showSelection">Show selected IDs</button>
    <script>
      $(document).ready(function () {
        //DataSource definition
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/Products",
              },
              update: {
                url: crudServiceBaseUrl + "/Products/Update",
                type: "POST",
                contentType: "application/json",
              },
              destroy: {
                url: crudServiceBaseUrl + "/Products/Destroy",
                type: "POST",
                contentType: "application/json",
              },
              create: {
                url: crudServiceBaseUrl + "/Products/Create",
                type: "POST",
                contentType: "application/json",
              },
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
                }
              },
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: {
                    editable: false,
                    nullable: true,
                  },
                  ProductName: {
                    validation: {
                      required: true,
                    },
                  },
                  UnitPrice: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1,
                    },
                  },
                  Discontinued: {
                    type: "boolean",
                  },
                  UnitsInStock: {
                    type: "number",
                    validation: {
                      min: 0,
                      required: true,
                    },
                  },
                },
              },
            },
          });

        //Grid definition
        var grid = $("#grid")
          .kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 430,
            //define dataBound event handler
            dataBound: onDataBound,
            reorderable: {
              rows: true,
              columns: true,
            },
            selectable: "multiple, row",
            toolbar: ["create"],
            columns: [
              { draggable: true },
              //define template column with checkbox and attach click event handler
              {
                template:
                  "<input type='checkbox' class='k-checkbox checkbox' />",
                width: 60,
                attributes: { class: "k-text-center" },
              },
              "ProductName",
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:c}",
                width: "100px",
              },
              {
                field: "UnitsInStock",
                title: "Units In Stock",
                width: "100px",
              },
              {
                field: "Discontinued",
                width: "100px",
              },
              {
                command: ["edit", "destroy"],
                title: "&nbsp;",
                width: "250px",
              },
            ],
            editable: "inline",
          })
          .data("kendoGrid");

        //bind click event to the checkbox
        grid.table.on("click", ".checkbox", selectRow);

        $("#showSelection").bind("click", function () {
          var checked = [];
          for (var i in checkedIds) {
            if (checkedIds[i]) {
              checked.push(i);
            }
          }

          alert(checked);
        });
      });

      var checkedIds = {};

      //on click of the checkbox:
      function selectRow() {
        var checked = this.checked,
          row = $(this).closest("tr"),
          grid = $("#grid").data("kendoGrid"),
          dataItem = grid.dataItem(row);

        checkedIds[dataItem.id] = checked;
        if (checked) {
          //-select the row
          row.addClass("k-selected");
        } else {
          //-remove selection
          row.removeClass("k-selected");
        }
      }

      //on dataBound event restore previous selected rows:
      function onDataBound(e) {
        var view = this.dataSource.view();
        for (var i = 0; i < view.length; i++) {
          if (checkedIds[view[i].id]) {
            this.tbody
              .find("tr[data-uid='" + view[i].uid + "']")
              .addClass("k-selected")
              .find(".checkbox")
              .attr("checked", "checked");
          }
        }
      }
    </script>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Grid Selection Checkbox KB](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/grid-selection-checkbox)
- [Grid Selection Checkbox](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/selection#checkbox-column-selection)
- [Kendo UI for jQuery Grid API Documentation](https://docs.telerik.com/kendo-ui/api/ui/grid)
