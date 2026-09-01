---
title: Moving Child Grid Icon While Keeping Sorting Functional
description: Learn how to move the child grid icon to a different column in the Kendo UI for jQuery Grid while maintaining sorting functionality.
type: how-to
page_title: Moving Child Grid Icon to a Different Column in Kendo UI for jQuery Grid
meta_title: Moving Child Grid Icon  to a Different Column in Kendo UI for jQuery Grid
slug: moving-child-grid-icon-sorting
tags: grid,kendo-ui-for-jquery,child-grid,sorting,hierarchy-column
res_type: kb
ticketid: 1718259
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td>
Grid for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td>
2026.3.811
</td>
</tr>
</tbody>
</table>

## Description
I want to move the child grid icon to a different column in the [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview) while ensuring that the sorting functionality for other columns remains unaffected.

This knowledge base article also answers the following questions:
- How to relocate the child grid icon in Kendo UI Grid and enable sorting?
- How to add a custom expand button for the child grid in Kendo UI Grid?
- How to maintain sorting functionality in Kendo UI Grid after moving the hierarchy column?

## Solution
To move the child grid icon to a different column while keeping sorting functional, follow these steps:

1. **Hide the built-in hierarchy column**  
   Use CSS to hide Kendo UI's default hierarchy column. This will prevent it from being displayed while allowing the remaining columns to shift left naturally.

   ```css
   .k-grid .k-hierarchy-col,
   .k-grid .k-hierarchy-cell {
     display: none;
   }
   ```

2. **Add a custom column for the expand button**  
   Define a new column where you want the expand button to appear. Use a custom template for the button.

   ```javascript
   {
     title: "Tandem",
     width: "80px",
     sortable: false,
     filterable: false,
     template: '<button type="button" class="custom-expand" aria-label="Show tandem rows">' +
               kendo.ui.icon("chevron-right") + '</button>'
   }
   ```

3. **Wire the custom button to the Grid's API**  
   In the [`dataBound`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/databound) event, add a click handler for the custom expand button. Use the Kendo UI Grid's `expandRow` and `collapseRow` methods to toggle the detail rows.

   ```javascript
   dataBound: function(ev) {
     var grid = ev.sender;
     grid.tbody.find(".custom-expand").off("click").on("click", function () {
       var row = $(this).closest("tr");
       var detailRow = row.next(".k-detail-row");
       if (detailRow.length && detailRow.is(":visible")) {
         grid.collapseRow(row);
       } else {
         grid.expandRow(row);
       }
     });
   }
   ```

This approach ensures that you can position the expand icon where you want it while retaining the sorting functionality for other columns.

Below is a runnable example:

```dojo
 <style>
      .k-grid .k-hierarchy-col,
      .k-grid .k-hierarchy-cell {
        display: none;
      }

      .custom-expand {
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 4px 8px;
      }

      .custom-expand:hover {
        color: #1769aa;
      }
    </style>

    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          var element = $("#grid").kendoGrid({
            dataSource: {
              type: "odata-v4",
              transport: {
                read: "https://demos.telerik.com/service/v2/odata/Employees"
              },
              pageSize: 6,
              serverPaging: true,
              serverSorting: true
            },
            height: 600,
            sortable: true,
            pageable: true,
            detailInit: detailInit,
            dataBound: function(ev) {
              var grid = ev.sender;

              grid.tbody.find(".custom-expand").off("click").on("click", function() {
                var button = $(this);
                var row = button.closest("tr");
                var detailRow = row.next(".k-detail-row");

                if (detailRow.length && detailRow.is(":visible")) {
                  grid.collapseRow(row);
                } else {
                  grid.expandRow(row);
                }
              });
            },
            columns: [
              {
                field: "FirstName",
                title: "First Name",
                width: "110px"
              },
              {
                field: "LastName",
                title: "Last Name",
                width: "110px"
              },
              {
                title: "Tandem",
                width: "80px",
                sortable: false,
                filterable: false,
                template: '<button type="button" class="custom-expand" aria-label="Show tandem rows">' + kendo.ui.icon("chevron-right") + '</button>'
              },
              {
                field: "Country",
                width: "110px"
              },
              {
                field: "City",
                width: "110px"
              },
              {
                field: "Title",
                width: "50px",
              }
            ]
          });

        });

        function detailInit(e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata-v4",
              transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 10,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: "110px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address", width: "110px" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }
      </script>
    </div>
```

## See Also
- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Grid Hierarchy Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/hierarchy)
- [Kendo UI for jQuery Grid API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid)
