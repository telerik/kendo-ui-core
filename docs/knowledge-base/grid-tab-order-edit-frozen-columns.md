---
title: Keep Tab Order on Edited Grid Row with Frozen Columns
description: An example on how to keep the focus on edited inputs when the frozen columns functionality of the Kendo UI Grid is enabled.
type: how-to
page_title: Tab through Editors When Columns Are Frozen | Kendo UI Grid for jQuery
slug: grid-tab-order-edit-frozen-columns
tags: grid, frozen, columns, tab, order, focus, input, buttons, tabbing, tabindex
ticketid: 1142004
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Made with version</td>
  <td>2020.3.1021</td>
 </tr>
</table>


## Description

How can I keep the focus when I tab through the edited Grid cells when the Grid has its frozen columns enabled?  

## Solution

The default order in which the browser focuses elements on the page cause the rendering of the frozen (locked) columns in a separate `table` element. When the `Tab` key is clicked, the browser moves the focus to the first focusable element in the next table and the buttons are focused first.

To keep the tab order:

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid.
1. Get the reference of all **Edit** and **Delete** buttons.
1. Increase the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attributes for the buttons.

```dojo
<div id="grid"></div>

<script>
    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            UnitPrice: { type: "number", validation: { required: true, min: 1 } },
                            Discontinued: { type: "boolean" },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            dataBound: function (e) {
                $(".k-grid-edit, .k-grid-delete").attr("tabindex", "1");
            },
            cancel: function (e) {
                setTimeout(function () {
                    $(".k-grid-edit, .k-grid-delete").attr("tabindex", "1");
                });
            },
            columns: [
                { width: "200px", field: "ProductName", title: "Product Name", locked: true, lockable: false },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
        });


    });
</script>
</div>
```
