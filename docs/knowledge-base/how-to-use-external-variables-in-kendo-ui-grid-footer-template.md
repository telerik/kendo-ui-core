---
title: Accessing External Variables in Kendo UI Grid Footer Template
description: Learn how to use variables from external methods in the footerTemplate of the Kendo UI Grid for jQuery.
type: how-to
page_title: Using External Method Variables in Kendo UI Grid FooterTemplate
slug: how-to-use-external-variables-in-kendo-ui-grid-footer-template
tags: kendo-ui, grid, footer-template, external-variables, jquery
res_type: kb
ticketid: 1661610
---

## Environment

| Product | Version |
| --- | --- |
| Kendo UI for jQuery Grid | 2024.1.319 |

## Description

I am employing the Kendo UI Grid for jQuery to display data and need to utilize a variable from an external method in the Grid footer. The challenge involves integrating a variable returned from a method outside the grid into the footerTemplate for dynamic calculations and display.

This KB article also answers the following questions:
- How can I use an external variable in a Kendo Grid footerTemplate?
- What is the method to include dynamic content in the footer of a Kendo UI Grid?
- Can I access a variable from outside the Kendo Grid in its footerTemplate?

## Solution

To use a variable from an external method in the [`footerTemplate`](/api/javascript/ui/grid/configuration/columns.footertemplate) of a Kendo UI Grid, you need to ensure that the variable is accessible in the scope where the Grid is defined. You can then reference this variable directly within the `footerTemplate`.

1. **Ensure global or higher scope availability**: The variable you wish to use must be accessible in the scope where the Grid is initialized. If it is returned from an external method, store it in a variable that's accessible in the Grid's scope.

2. **Reference the variable in `footerTemplate`**: Directly use the variable within the `footerTemplate` definition. Since the `footerTemplate` is a function, it can access any variables in its closure.

Below is an example:

```dojo
    <div id="grid"></div>
    <script>      
      let additional = 'Some additional text'
      
      function customCalculation(dataItem){        
        return dataItem.min * 5
      }
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age",
           footerTemplate: function({age}) {            
             return 'Min: ' + age.min + ' Max: ' + age.max + '---> ' + additional + ' -- custom: ' + customCalculation(age)
           },
          }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ],
          aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
          ]
        }
      });
    </script>
```

## Notes

- Ensure the external method and the variable storing its result are defined before initializing the Kendo UI Grid to avoid reference errors.


## See Also

- [Official Documentation for Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Kendo UI Grid footerTemplate Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate)
