---
title: Update Calculated Cell Value on the Fly
description: An example on how to update the calculated cell on the fly in a Kendo UI Grid.
type: how-to
page_title: Update Calculated Cell Value on the Fly | Kendo UI Grid
slug: grid-calculate-value-on-the-fly
tags: grid, calculated, cell, value, dynamically, calculate, update, result
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

How can I update the value of the calculated field as the users make changes?

## Solution

1. Handle the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event of the Grid. In the event handler, get a reference to the editors for the respective fields.
1. In the `change` event of the editors, get the new value and use it to calculate the result.

```dojo
<div id="grid"></div>

<script>
$(document).ready(function () {

    sampleData = [
    {  id: 1,
        ProductName: "Diesel",
        grossSellUnitPrice: 100,
        quantity: 2,
        grossSellAmount: 200

    },
    {  id: 2,
        ProductName: "Ad Blue",
        grossSellUnitPrice: 200,
        quantity: 2,
        grossSellAmount: 400
    },
    {  id: 3,
        ProductName: "Bio Diesel",
        grossSellUnitPrice: 300,
        quantity: 1,
        grossSellAmount: 300
    }
    ],
    dataSource = new kendo.data.DataSource({
    data: sampleData,
    schema: {
        model: {
        id: "Productid",
        fields: {
            Productid: { type: "number"},
            ProductName: { validation: { required: true } },
            grossSellUnitPrice: { type: "number", validation: { required: true, min: 1}},
            quantity: 			{type: "number", validation: {required: true}},
            grossSellAmount: 	{type: "number", editable:"false"}
        }
        }
    },
    pageSize: 10
    });

    $("#grid").kendoGrid({
    dataSource: dataSource,
    pageable: true,
    save: function(data) {
        if (data.model.grossSellUnitPrice && data.model.quantity) {
        data.model.set("grossSellAmount", data.model.grossSellUnitPrice * data.model.quantity);
        }
    },
    edit: function(e) {
        if (!e.model.isNew()) {
        var priceEditor = e.container.find("input[name=grossSellUnitPrice]").data("kendoNumericTextBox");
        var quantityEditor = e.container.find("input[name=quantity]").data("kendoNumericTextBox");

        priceEditor.bind("change", function(e) {
            var price = this.value();
            var quantity = quantityEditor.value();

            var totalSpan = this.element.closest("tr").find(".totalSpan");
            totalSpan.html(price * quantity);

        });

        quantityEditor.bind("change", function(e) {
            var price = priceEditor.value();
            var quantity = this.value();


            var totalSpan = this.element.closest("tr").find(".totalSpan");
            totalSpan.html(price * quantity);
        });
        }
    },
    toolbar: ["create"],
    columns: [
        "ProductName",
        { field: "grossSellUnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
        { field: "quantity"},
        { field: "grossSellAmount",
        editor: function(cont, options) {
            $("<span class='totalSpan'>" + options.model.grossSellAmount + " &euro;</span>").appendTo(cont);
        }
        },

        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
    editable: "inline"
    });
});

</script>
```
