---
title: Grid Open Filter Menu Upon Initialization
description: "Learn how to create open the filter menu of the Kendo UI Grid as soon as the component loads."
type: how-to
page_title: Grid Open Filter Menu Upon Initialization
slug: grid-open-filter-menu-on-init
tags: kendo, kendo-ui, grid, filter, menu, open, init, initialization
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I programmatically open the filter menu and focus its input when the Grid first loads?

## Solution

Use the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grid to open the filter menu as soon as the Grid has finished loading.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

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
          filterable: true,
          pageable: true,
          dataBound: function(e) {
            let grid = e.sender;

            if(initial) {
              initial = false;
              // Find the filter menu component using the name of the field.
              let titleFilterMenu = grid.thead.find("[data-field='Title']").data("kendoFilterMenu");
              titleFilterMenu.one("open", (e) => {
                // When the menu opens, focus the input.
                e.container.find("input").focus();
              });
              // Click on the filter icon to open the menu.
              titleFilterMenu.link.click();
            }
          },
          columns: [
            {
              title: "Name",
              width: 160,
              filterable: false,
              template: ({ FirstName, LastName }) => `${FirstName} ${LastName}`
            },
            {
              field: "Title",
              title: "Some Title",
              filterable: {
                ui: titleFilter,
                extra: false
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
    </script>
```