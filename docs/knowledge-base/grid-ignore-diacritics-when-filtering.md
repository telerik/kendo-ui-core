---
title: Ignore Diacritics when Filtering
description: "An example showcasing how to ignore the diacritics in the filter row AutoComplete component of the Grid."
type: how-to
page_title: Ignore Diacritics when Filtering - Kendo UI Hierarchy Grid for jQuery
slug: grid-ignore-diacritics-when-filtering
tags: jquery, grid, diacritic, diacritics, accented, character, ignore, filter, row, autocomplete
ticketid: 1585165
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

I want to enable my users to filter a Grid column that contains values with diacritic characters. For example, I want to be able to search the value `REÉR` by typing `ree` in the filter input. How can I ignore the diacritics and search for the values as if they are regular letters?

## Solution

1. Use the [`columns.filterable.cell.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable.cell#columnsfilterablecelltemplate) to initialize a custom Kendo AutoComplete component.
1. Attach a handler to the [`filtering`](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete/events/filtering) event of the custom AutoComplete.
1. Inside the filtering event, use a custom operator to convert the diacritic character to a regular one. For example, ``e`` instead of ``É``.

The following example demonstrates the full implementation of the above logic.

```dojo
    <h3>Type "ree" inside the filter cell and observe the result.</h3>
    <div id="countries"></div>

    <script>
      $(document).ready(function () {
        var data = [
          {name: "REÉR"},
          {name: "REÉÉ-F"}

        ];

        $("#countries").kendoGrid({
          dataSource: {
            data: data
          },
          columns: [
            {
              field: "name",
              filterable: {
                cell: {
                  template: function (args) {
                    args.element.kendoAutoComplete({
                      dataSource: args.dataSource,
                      dataTextField: "name",
                      dataValueField: "name",
                      valuePrimitive: true,
                      filtering: (e) => {
                        e.filter.operator = function(item, value) {
                          // Replace the diacritic character with a regular one.
                          item = item.replace("É", "e");

                          // Perform the comparison (startsWith) operation manually.
                          return item.toLowerCase().startsWith(value);
                        }
                      }
                    });
                  },
                }
              }
            }
          ],
          filterable: {
            mode: "row"
          }
        });
      });
    </script>
```