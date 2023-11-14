---
title: Display Different Filter Editors Depending on Operators
page_title: Display Different Editors Depending on Operators - Kendo UI for jQuery Filter
description: "Learn how to display different editors depending on the operator in the Kendo UI Filter for jQuery."
slug: filter-different-editor-depending-on-operators
tags: filter, editor, operator
component: filter
type: how-to
ticketid: 1616662
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Filter for jQuery</td>
 </tr>
</table>

## Description

How can I have different editors appear depending on the current operator of the Filter? 

## Solution

1. Bind the [`change`](/api/javascript/ui/filter/events/change) event to the `filterModel` of the component and identify the exact `Filter expression` from its items. 
1. Find the `editor` of the expression, empty it and then append a new `input` element. 
1. Check for the current operator of the `Filter expression` and initialize the corresponding component for the editor in the input element you appended.  

The following example demonstrates how to achieve the desired scenario:

```dojo
    <script src="../content/shared/js/products.js"></script>
    <div id="example">
      <div id="filter"></div>
      <br />
      <br />
      <br />

      <script>
        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages" } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1 } }
                }
              }
            }
          });

          $("#filter").kendoFilter({
            dataSource: dataSource,
            expressionPreview: true,
            fields: [
              { name: "ProductName", label: "Product Name" },
              { name: "CategoryID", type: "number", label: "Category", defaultValue: 1, editorTemplate: categoryDropDownEditor },
              { name: "UnitPrice", type: "number", label: "Unit Price", editorTemplate: unitPriceEditor },
              { name: "UnitsInStock", type: "number", label: "Units In Stock" },
              { name: "QuantityPerUnit", label: "Quantity Per Unit" },
            ]
          });

          $("#filter").data("kendoFilter").filterModel.bind("change", function(e) {
            if(!e.items) {
              return;
            }

            let model = e.items[0];
            if(model.field == "ProductName") {

              setTimeout(function(){
                var editorContainer = $("[id='"+model.uid+"']").find(".k-toolbar-item.k-filter-value"); 
                editorContainer.empty();
                let input = $("<input />")
                .appendTo(editorContainer);

                if(model.operator == "eq" || model.operator == "neq") {
                  input.kendoDropDownList({
                    optionLabel: "Select value...",
                    dataSource: ["1", "2"],
                    value: model.value,
                    change: function(e) {
                      model.set("value", e.sender.value());
                    }
                  });

                } else {
                  input.kendoTextBox({
                    value: model.value,
                    change: function(e) {
                      model.set("value", e.sender.value());
                    }
                  });
                }
              })

            }
          })
        });

        function unitPriceEditor(container, options) {
          $('<input data-bind="value: value" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox();
        }

        function categoryDropDownEditor(container, options) {
          $('<input data-bind="value: value" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            }
          });
        }
      </script>
    </div>
```

## See Also
* [JavaScript API Reference of the Filter](/api/javascript/ui/filter)
