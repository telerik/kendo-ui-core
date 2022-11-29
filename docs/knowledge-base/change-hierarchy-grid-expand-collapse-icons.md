---
title: Update and Add Text to the Expand and Collapse Icons in the Hierarchy Grid
description: "An example on how to update and add text to the Expand and Collapse icons in a Kendo UI for jQuery hierarchical Grid."
type: how-to
page_title: Update and Add Text to Expand and Collapse Icons - Kendo UI Hierarchy Grid for jQuery
slug: update-hierarchy-grid-expand-collapse-icons
tags: jquery, grid, hierarchy, expand, collapse, icons, add, text, kendo grid
ticketid: 1586958
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

How can I change the **Expand** and **Collapse** icons in the Kendo UI for jQuery Hierarchy Grid and add text to the icons?

## Solution

To achieve the desired scenario:
 
1. Update the **Expand** and **Collapse** icons by using the following CSS rules. For the full list of the Kendo UI Web Font Icons, refer to the [list of Font icons](/styles-and-layout/sass-themes/font-icons#list-of-font-icons).

```
    <style>
      .k-i-expand:before {
        content: "\e11e";
      }
      .k-i-collapse:before {
        content: "\e121";
      }
    </style>
```


2. To add text to the icons, write custom logic in the [`dataBound`](/api/javascript/ui/grid/events/databound), [`detailExpand`](/api/javascript/ui/grid/events/detailexpand), and [`detailCollapse`](/api/javascript/ui/grid/events/detailcollapse) event handlers.


The following example demonstrates the full implementation of the suggested approach.

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        var element = $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 6,
            serverPaging: true,
            serverSorting: true
          },
          height: 600,
          sortable: true,
          pageable: true,
          detailInit: detailInit,
          dataBound: function() {
            this.tbody.find('.k-hierarchy-cell').each(function(_,x){
              x= $(x);
              x.prepend("<span class='expand'>Expand</span>")
            });
          },
          detailExpand: function(e) {
            this.tbody.find('.expand').each(function(_,x){
              x= $(x);
              x.text("Collapse");
              x.removeClass("expand").addClass("collapse");
            });
          },
          detailCollapse: function(e) {
            this.tbody.find('.collapse').each(function(_,x){
              x= $(x);
              x.text("Expand");
              x.removeClass("collapse").addClass("expand");
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
              field: "Country",
              width: "110px"
            },
            {
              field: "City",
              width: "110px"
            },
            {
              field: "Title",
              width: "110px",
            }
          ]
        });
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
    <style>
      /* Update Expand icon */
      .k-i-expand:before {
        content: "\e11e";
      }
      /* Update Collapse icon */
      .k-i-collapse:before {
        content: "\e121";
      }
      /* Set a width for the hierarchy column, otherwise the column you swap it with will be shrunk. */
      .k-grid .k-hierarchy-col {
        width: 60px;
      }
      /* Set inline display to the icon to have the text and the icon on the same line */
      .k-grid .k-hierarchy-cell>.k-icon{
        display: inline;
      }
    </style>
```
## See Also

* [Kendo UI for jQuery Grid API Reference](/api/javascript/ui/grid)
* [Kendo UI for jQuery Hierarchical Grid Demo](https://demos.telerik.com/kendo-ui/grid/hierarchy)
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})
