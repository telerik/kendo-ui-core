---
title: Restricting Decimal Places in Kendo UI for jQuery Grid
description: Learn how to limit decimal places in numeric input, handle rounding, and allow negative and null values in the Kendo UI for jQuery Grid.
type: how-to
page_title: How to Limit Decimal Places and Allow Specific Values in Grid Numeric Columns
slug: restrict-decimals-allow-values-kendo-ui-grid-jquery
tags: kendo-ui, grid, jquery, decimal, rounding, negative-values, null-values
res_type: kb
ticketid: 1679520
---

## Description

When working with numeric inputs in the Kendo UI for jQuery Grid, you might encounter several requirements such as restricting the number of decimal places, handling rounding, and allowing negative or null values. Addressing these needs ensures data integrity and user input accuracy in your application.

This knowledge base article also answers the following questions:
- How can I limit the number of decimal places in a numeric input?
- How do I round numeric input to a specific number of decimal places without trailing zeros?
- How can I allow negative and null values in numeric columns of the Grid?

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Solution

To address the described requirements, follow these steps:

### Restricting Decimal Places and Handling Rounding

1. Use the `NumericTextBox` as the editor for your numeric column.
2. Set the `decimals` option to limit the number of decimal places.
3. Use the `restrictDecimals` option to enforce the decimal limit.
4. Implement custom logic in the `change` event handler to handle rounding and maintain the desired decimal precision.

```javascript
columns: [
    { field: "UnitPrice",
      title: "Unit Price",
      format: "{0:n5}",
      editor: "NumericTextBox",
      editorOptions: { 
        format: "n5",
        decimals: 5,
        restrictDecimals: true,
        change: function(e) {
          let tr = e.sender.element.closest("tr")
          let dataitem = $("#grid").data("kendoGrid").dataItem(tr);
          dataitem.set("UnitPrice", Math.round(e.sender.value() * 100000) / 100000);
        }
      },
      width: 200 },
]
```

### Allowing Negative and Null Values

1. Ensure the model validation does not restrict negative values.
2. Modify the editor's configuration to not implicitly disallow null values.
3. Update the `change` event handler to accommodate null or blank values alongside the numeric input.

Example model validation configuration allowing negative values:

```javascript
UnitPrice: { type: "number", validation: { required: true, min: -Infinity } },
```

Handling null or blank values in the `change` event:

```javascript
change: function(e) {
  let tr = e.sender.element.closest("tr")
  let dataitem = $("#grid").data("kendoGrid").dataItem(tr);
  let inputValue = e.sender.value();
  if(inputValue === null || inputValue === '') {
    dataitem.set("UnitPrice", null);
  } else {
    dataitem.set("UnitPrice", Math.round(inputValue * 100000) / 100000);
  }
}
```

For a complete implementation, refer to the below example.

```dojo
<div id="grid"></div>

      <script>
        $(document).ready(function () {
          var desiredValue,
            paste = false;
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: crudServiceBaseUrl + "/Products",
                  dataType: "jsonp",
                },
                update: {
                  url: crudServiceBaseUrl + "/Products/Update",
                  dataType: "jsonp",
                },
                destroy: {
                  url: crudServiceBaseUrl + "/Products/Destroy",
                  dataType: "jsonp",
                },
                create: {
                  url: crudServiceBaseUrl + "/Products/Create",
                  dataType: "jsonp",
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                  }
                },
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true } },
                    UnitPrice: {
                      type: "number",
                      validation: { required: false },
                    },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: {
                      type: "number",
                      validation: { min: 0, required: true },
                    },
                  },
                },
              },
            });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:n5}",
                editor: "NumericTextBox",
                editorOptions: {
                  format: "n5",
                  decimals: 6,
                  restrictDecimals: true,
                  change: function (e) {
                    let tr = e.sender.element.closest("tr");
                    let dataitem = $("#grid").data("kendoGrid").dataItem(tr);
                    if (desiredValue) {
                      dataitem.set("UnitPrice", desiredValue);
                    }
                    if (!desiredValue) {
                      if (e.sender.value() == null) {
                        dataitem.set("UnitPrice", null);
                      } else {
                        dataitem.set(
                          "UnitPrice",
                          Math.round(e.sender.value() * 100000) / 100000,
                        );
                      }
                    }
                  },
                },
                width: 200,
              },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 },
            ],
            editable: true,
            edit: function (e) {
              e.container
                .find("input[title='Unit Price']")
                .on("paste", function (ev) {
                  paste = true;
                  let numerictTB = e.container
                    .find("input[name='UnitPrice']")
                    .data("kendoNumericTextBox");
                  let pastedData = (
                    ev.originalEvent.clipboardData || window.clipboardData
                  ).getData("text");
                  desiredValue = Number(pastedData).toFixed(5);
                  numerictTB.value(desiredValue);
                  console.log("desiredValue", desiredValue);
                  numerictTB.trigger("change");
                });
            }
          });
        });
      </script>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [API Reference of the Grid Component](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [API Reference of NumericTextBox Component](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
