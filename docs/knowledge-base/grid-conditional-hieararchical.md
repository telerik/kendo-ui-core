---
title: Conditionally Hide Hierarchical Grids
description: An example on how to conditionally show a hierarchical Kendo UI Grid.
type: how-to
page_title: Conditionally Hide Hierarchical Grids | Kendo UI Grid for jQuery
slug: grid-conditional-hieararchical
tags: grid, hierarchy, hiararchical, conditonal, hide, show
ticketid: 1153473
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I show just a child Grid on certain elements in the hierarchical Grid?  

## Solution

1. Subscribe to the `dataBound` event of the Grid.
1. Loop through the rows to remove the expand arrow on the desired items by using the `remove` jQuery method.

```dojo
<div id="grid" /></div>

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
        var data = this.dataSource.data();

        $.each(data, function(i, row) {
          if (row.get("Title") == "Sales Representative") {
            $('tr[data-uid="' + row.uid + '"] ').find(".k-hierarchy-cell a").remove();;
          }
        });
      },
      columns: [{
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
          field: "Title"
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
        filter: {
          field: "EmployeeID",
          operator: "eq",
          value: e.data.EmployeeID
        }
      },
      scrollable: false,
      sortable: true,
      pageable: true,
      columns: [{
          field: "OrderID",
          width: "110px"
        },
        {
          field: "ShipCountry",
          title: "Ship Country",
          width: "110px"
        },
        {
          field: "ShipAddress",
          title: "Ship Address"
        },
        {
          field: "ShipName",
          title: "Ship Name",
          width: "300px"
        }
      ]
    });
  }
</script>
```

## See Also

* [API Reference of the dataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
* [API Reference of the jQuery remove Method](https://api.jquery.com/remove/)
