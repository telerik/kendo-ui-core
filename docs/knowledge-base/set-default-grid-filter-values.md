---
title: Setting the Default Numeric Filter Value in the Grid Filter Menu
description: "Learn how to set the default filter number values of the Kendo UI Grid filter menu."
type: how-to
page_title: Set the Default Filter Values - Kendo UI Grid for jQuery
slug: default-grid-filter-values
tags: grid, default filter, values, filter menu, kendo grid
ticketid: 1583924
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>


## Description

The Grid filter menu shows an empty number value for the NumericTextBox inputs.

How can I set a predefined filter value for the NumericTextBox inputs?

## Solution

1. In the [`filterMenuOpen`](/api/javascript/ui/grid/events/filtermenuopen) event handler, get the instances of the NumericTextBox inputs.
1. Update their values with the [`value`](/api/javascript/ui/numerictextbox/methods/value) method and trigger the [`change`](/api/javascript/ui/numerictextbox/events/change) event.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { field: "id"}
        ],
        filterable: true,
        columnMenu: true,
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30, id: 1 },
            { name: "Anne Smith", age: 35, id: 2 },
            { name: "John Snow", age: 24, id: 3 }
          ],
          schema: {
            model: {
              fields: {
                age: { type: "number" },
                id: { type: "number" }
              }
            }
          }
        },
        columnMenuOpen: function (e) {
          if (e.field == "age") {
            var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
            firstValueDropDown.select(3);
            firstValueDropDown.trigger("change");
            var numericOne = $(e.container.find("[data-role=numerictextbox]")[0]).data("kendoNumericTextBox");
            numericOne.value(24);
            numericOne.trigger("change");
            
            var numericTwo = $(e.container.find("[data-role=numerictextbox]")[1]).data("kendoNumericTextBox");
            numericTwo.value(24);
            numericTwo.trigger("change");

          }
          else if (e.field == "id") {
            var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
            firstValueDropDown.select(3);
            firstValueDropDown.trigger("change");

            var numericId = $(e.container.find("[data-role=numerictextbox]")[0]).data("kendoNumericTextBox");
            numericId.value(1);
            numericId.trigger("change");
          }
        }
      });
    </script>
```
## See Also

* [Kendo UI Grid API Reference](/api/javascript/ui/grid)
* [Kendo UI NumericTextBox API Reference](/api/javascript/ui/numerictextbox)
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
