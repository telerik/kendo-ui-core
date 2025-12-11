---
title: Display FilterMenu upon Grid Initialization
page_title: Display FilterMenu upon Grid Initialization - Kendo UI for jQuery Grid
description: "Learn how to display FilterMenu upon the initialization of the Kendo UI Grid for jQuery."
slug: display-filtermenu-upon-grid-initialization
tags: grid, filtermenu, initialization
type: how-to
ticketid: 1596996
res_type: kb
components: ["grid", "menu"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® FilterMenu for jQuery</td>
 </tr>
</table>

## Description

How can I display FilterMenu for a certain column upon the initialization of the Grid?

## Solution

- In the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grid, find the FilterMenu component by using the name of the corresponding field. 

```js
let titleFilterMenu = grid.thead.find("[data-field='Title']").data("kendoFilterMenu");
```

- Focus the `input` of the container in the `open` event of the FilterMenu component.
```js
titleFilterMenu.one("open", (e) => {
    e.container.find("input").focus();
});
```
- Open the FilterMenu by clicking on its filter icon.

```js
titleFilterMenu.link.click();
```

The following example demonstrates the full implementation of the suggested approach:

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example">
      <div id="grid"></div>

      <script>
        let initial = true;
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              data: createRandomData(50),
              schema: {
                model: {
                  fields: {
                    City: { type: "string" },
                    Title: { type: "string" },
                    BirthDate: { type: "date" }
                  }
                }
              },
              pageSize: 15
            },
            height: 550,
            scrollable: true,
            filterable: {
              extra: false,
              operators: {
                string: {
                  startswith: "Starts with",
                  eq: "Is equal to",
                  neq: "Is not equal to"
                }
              }
            },
            pageable: true,
            dataBound: function(e) {
              let grid = e.sender;
              
			  if(initial) {
                initial = false;
                let titleFilterMenu = grid.thead.find("[data-field='Title']").data("kendoFilterMenu");
                titleFilterMenu.one("open", (e) => {
                  e.container.find("input").focus();
                });
                titleFilterMenu.link.click();
              }
            },
            columns: [
              {
                title: "Name",
                width: 160,
                filterable: false,
                template: "#=FirstName# #=LastName#"
              },
              {
                field: "City",
                width: 130,
                filterable: {
                  ui: cityFilter
                }
              },
              {
                field: "Title",
                title: "Some Title",
                filterable: {
                  ui: titleFilter
                }
              },
              {
                field: "BirthDate",
                title: "Birth Date",
                format: "{0:MM/dd/yyyy HH:mm tt}",
                filterable: {
                  ui: "datetimepicker"
                }
              }
            ]
          });
        });

        function titleFilter(element) {
          element.kendoAutoComplete({
            dataSource: titles
          });
        }

        function cityFilter(element) {
          element.kendoDropDownList({
            dataSource: cities,
            optionLabel: "--Select Value--"
          });
        }

      </script>
    </div>
```

## See Also
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [JavaScript API Reference of the FilterMenu](/api/javascript/ui/filtermenu)