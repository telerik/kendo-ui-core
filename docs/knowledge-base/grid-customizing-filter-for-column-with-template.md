---
title: Customizing Filter for Column with Template in the Grid to Match the Template Data
description: Learn how to customize the filter for a column with a template in a Kendo UI Grid to match the template data.
type: how-to
page_title: Customizing Filter for Column with Template
slug: grid-customizing-filter-for-column-with-template
tags: kendo ui, grid, filter, template
res_type: kb
---

## Environment

| Property | Value |
|---|---|
| Product | Grid for Progress® Kendo UI® |
| Version | 2023.3.1114 |

## Description

I want to customize the filter for a column in my Kendo UI Grid that uses a template. Currently, when I enter a value in the column filter, it only matches the original data and not the data displayed by the template. For example, if I enter 1800 in the filter, it doesn't match the value displayed as 180000 in the template. How can I customize the filter to find values based on the template?

## Solution

The filters are applied to the dataSource of the Grid, not the Grid itself. The Grid's column templates are used only to change the appearance of the data and have no direct relation to the filter. When a value is entered in the input, it will filter the original data loaded in the Grid, not the one displayed by the template.

To customize the filter to find values based on the template, you can create a custom filter using the [columns.filterable.ui](/api/javascript/ui/grid/configuration/columns.filterable.ui) option.

Here is an example of how to create a custom filter for a column with a template:

```javascript
function customFilter(element) {
    element.kendoDropDownList({
        dataSource: $('#grid').data('kendoGrid').dataSource.data(),
        dataTextField: "UnitPrice",
        dataValueField: "UnitPrice",
        template: function(data){                
            return data.UnitPrice*100
        },
        valueTemplate: function(data){
            return data.UnitPrice*100
        },
        optionLabel: "--Select Value--"
    });
}
```

You can refer to the [Filter Menu Customization Demo](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization) for a working example.

By using this custom filter, the values displayed in the filter will be modified based on the template, allowing you to find values based on the modified data.

```dojo
 <script src="../content/shared/js/products.js"></script>

    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
              input: true,
              numeric: false
            },
            columns: [
              "ProductName",
              { 
                field: "UnitPrice", 
                title: "Unit Price", 
                template: (data) => {
                  return data["UnitPrice"] * 100
                }, 
                width: "130px",
                filterable: {
                  ui: cityFilter
                }
              },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          });
          var items = $('#grid').data('kendoGrid').dataSource.data()



          function cityFilter(element) {
            element.kendoDropDownList({
              dataSource: $('#grid').data('kendoGrid').dataSource.data(),
              dataTextField: "UnitPrice",
              dataValueField: "UnitPrice",
              template: function(data){                
                return data.UnitPrice*100
              },
              valueTemplate: function(data){
                return data.UnitPrice*100
              },
              optionLabel: "--Select Value--"
            });
          }
        });
      </script>
    </div>
```

