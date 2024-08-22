---
title: Adding Multiple Footers to Kendo UI Grid Without Grouping
description: Learn how to implement multiple footers in a Kendo UI Grid without using grouping.
type: how-to
page_title: How to Add Multiple Footers in Kendo UI Grid Without Using Grouping
slug: how-to-add-multiple-footers-kendo-ui-grid
tags: grid, footer, kendo ui, multiple footers, customization
res_type: kb
ticketid: 1661610
---

## Environment

| Product | Kendo UI for jQuery Grid |
| --- | --- |
| Version | 2024.1.319 |

## Description

I want to add multiple footer rows to the Kendo UI [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) without using grouping. How can I achieve multiple footers in the Grid to display custom calculations or summaries for columns?

This KB article also answers the following questions:
- How to customize the footer in Kendo UI Grid?
- Can the Kendo UI Grid have multiple footer rows without grouping?

## Solution

To add multiple footer rows to a Kendo UI Grid without employing grouping, utilize the footer template to divide the content into separate `div` elements. By doing so, you can simulate multiple footers. Here is a step-by-step guide:

1. **Define the Grid Column with Custom Footer Template**: In the Grid column definition, use the [`footerTemplate`](/api/javascript/ui/grid/configuration/columns.footertemplate) to introduce multiple `div` elements for displaying various calculations or summaries.

    ```javascript
    { 
        field: "age",
        footerTemplate: function({age}) {            
            return '<div class="custom">Min: ' + age.min + '</div>' +
                   '<div class="custom">Max: ' + age.max + '</div>' +
                   '<div class="custom">Custom Calculation: ' + customCalculation(age) + '</div>';
        },
    }
    ```

2. **Add Custom CSS for Styling**: Apply custom CSS to style the `div` elements similar to Grid cells. This enhances the visual coherence of the footer rows with the rest of the Grid.

    ```css
    <style>
        .custom{
            border: 1px solid gray;
            border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08));
        }
        
        .k-footer-template .k-table-td{
            padding: 0px;
        }
    </style>
    ```

Below you will find a runnable example:

```dojo
    <style>
      .custom{
        border: 1px solid gray;
        border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08));
      }

      .k-footer-template .k-table-td{
        padding: 0px 
      }
    </style>
    <div id="grid"></div>
    <script>      
      let additional = 'Some custom calculation'

      function customCalculation(dataItem){        
        return dataItem.min * 5
      }

      $("#grid").kendoGrid({
        columns: [
          { field: "name",
           footerTemplate: function({age}) {            
             return '<div class="custom">Min: </div><div class="custom"> Max: </div><div class="custom"> ' + ' Custom: ' + '</div>'
           },
          },
          { field: "age",
           footerTemplate: function({age}) {            
             return '<div class="custom">' + age.min + '</div><div class="custom">' + age.max + '</div><div class="custom"> ' + additional + ' : ' + customCalculation(age) + '</div>'
           },
          }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Alex", age: 20 },
            { name: "Peter", age: 43 },
            { name: "Robert", age: 18 },
            { name: "Alice", age: 28 }
          ],
          aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
          ]
        }
      });
    </script>
```



## See Also

- [Kendo UI Grid Footer Template Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
