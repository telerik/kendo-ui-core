---
title: Increase Width to Potentially Show Full Column Values
description: An example on how to increase the width of the filter menu in the Kendo UI Grid for ASP.NET MVC.
type: how-to
page_title: Increase the Width of the Filter Menu | Kendo UI Grid for jQuery
slug: increase-the-width-of-the-filter-menu
previous_url: /knowledge-base/how-to-increase-the-width-of-the-filter-menu
tags: grid, filter, width
ticketid: 1133304
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Version 61.0.3163.79 (Official Build) (64-bit)</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
</table>


## Description

How can I make the filter menu of the Grid wider?

## Solution

Use CSS rules to expand the width of the container and the elements that are located inside it. To avoid the impact of the selector on the other page elements, you might need to modify it.

```
.k-animation-container>form {
  width: 300px;
}
.k-filter-menu .k-datepicker, .k-filter-menu .k-datetimepicker, .k-filter-menu .k-dropdown, .k-filter-menu .k-numerictextbox, .k-filter-menu .k-textbox, .k-filter-menu .k-timepicker {
  width: 100%;
}
.k-filter-menu span.k-filter-and {
  width: 100%;
}
```

On the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event, you can also set the width of the container per menu.  

```dojo
<div id="grid"></div>

<style>
      .k-filter-menu .k-datepicker, .k-filter-menu .k-datetimepicker, .k-filter-menu .k-dropdown, .k-filter-menu .k-numerictextbox, .k-filter-menu .k-textbox, .k-filter-menu .k-timepicker {
        width: 100%;
      }
      .k-filter-menu span.k-filter-and {
        width: 100%;
      }      
</style>

<script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            filterMenuInit:function(e){
              $(e.container).css("width", "300px")
            },
            pageable: true,
            columns: [{
              field:"OrderID",
              filterable: false
            },
                      "Freight",
                      {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                      }, {
                        field: "ShipName",
                        title: "Ship Name"
                      }, {
                        field: "ShipCity",
                        title: "Ship City"
                      }
                     ]
          });
        });
</script>
```
