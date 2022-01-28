---
title: Edit Rows in Detail Template
description: An example on how to edit the records in the relevant detail rows of the Kendo UI Grid.
type: how-to
page_title: Use Detail Template to Edit Master Rows | Kendo UI Grid for jQuery
slug: grid-detail-template-edit-master-rows
tags: grid, detail, template, editing
ticketid: 1139115
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I edit the master rows in the relevant detail rows of the Kendo UI Grid? How can I prevent the Grid from collapsing when I edit an item in a detail row?

## Possible Workarounds

To work around the default behavior, fake the editing process in the [`detailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) event handler.

1. Select all inputs in the `detailCell` element.
1. Attach a [`change`](https://api.jquery.com/change/) event handler to every input.
1. In the `change` event handler:
	1. Update the [`text`](https://api.jquery.com/text/) of the relevant master row cell.
	1. [`Prepend`](https://api.jquery.com/prepend/) a `k-dirty` span to the same cell.
	1. Change the value of the field in the `dataItem`.
	1. Set the `dirty` property of the `dataItem` to true.

```dojo
<script id="detail-template" type="text/x-kendo-template">
    <div>
        productName: <input name="productName" class="k-textbox" value="#: productName #" />
    </div>
    <div>
        category: <input name="category" class="k-textbox" value="#: category #" />
    </div>
</script>

<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "productName",
                editable: function(e) {
                    return false
                }
            },
            {
                field: "category",
                editable: function(e) {
                    return false
                }
            }
        ],
        editable: true,
        toolbar: ["save"],
        dataSource: {
            data: [{
                    ProductID: 0,
                    productName: "Tea",
                    category: "Beverages"
                },
                {
                    ProductID: 1,
                    productName: "Coffee",
                    category: "Beverages"
                },
                {
                    ProductID: 2,
                    productName: "Ham",
                    category: "Food"
                },
                {
                    ProductID: 3,
                    productName: "Bread",
                    category: "Food"
                }
            ],
            schema: {
                model: {
                    id: "ProductID",
                }
            }
        },
        detailTemplate: kendo.template($("#detail-template").html()),
        detailInit: function(e) {
            e.detailCell.find("input").on("change", function(e) {
                var value = e.target.value;
                var field = e.target.name;
                var dRow = $(e.target.closest("tr"))
                var mRow = dRow.prev(".k-master-row")
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(mRow);
                var tds = $(mRow).find("[role='gridcell']");
                var td;

                if (field === "productName") {
                    td = tds.first();
                } else {
                    td = tds.last();
                }

                td.text(value);
                td.prepend("<span class='k-dirty'></span>");

                dataItem[field] = value;
                dataItem.dirty = true;
            })
        }
    });
</script>
```
