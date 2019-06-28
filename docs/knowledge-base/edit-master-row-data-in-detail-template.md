---
title: Edit Records in Child Grids
page_title: Edit Records in Child Grids | Kendo UI Grid for jQuery
description: "An example on how to edit records in hierarchical Kendo UI Grid widgets for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/edit-master-row-data-in-detail-template
slug: howto_edit_recordsin_children_grid
tags: grid, edit, records, child, hierarchy
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I edit records in hierarchical Kendo UI Grid widgets for jQuery?

## Solution

The following example demonstrates how to edit records in a child Grid.

```dojo
  <div id="grid"></div>
  <script>
    var preventBinding = false,
    grid = $("#grid").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
            data: { $expand: "Orders" }
          }
        },
        schema: {
          model: {
            id: "EmployeeID"
          }
        },
        change: function (e) {
          if (e.field && e.field.indexOf("Orders.results") >= 0) {
            preventBinding = true;
          }
        },
        pageSize: 6,
        serverPaging: true,
        serverSorting: true
      },
      dataBinding: function (e) {
        if (preventBinding) {
          e.preventDefault();
        }
        preventBinding = false;
      },
      height: 430,
      sortable: true,
      pageable: true,
      detailInit: detailInit,
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
          field: "Title"
        }
      ]
    }).data("kendoGrid");

function detailInit(e) {
  var findByID = function (id) {
    return e.data.Orders.results.find(function(item){
      return item.OrderID == id;
    });
  };

  $("<div/>").appendTo(e.detailCell).kendoGrid({
    dataSource: {
      transport: {
        read: function (options) {
          options.success(e.data.Orders.results.toJSON());
        },
        update: function (options) {
          var data = options.data,
              parentItem = findByID(data.OrderID);
          for (var field in data) {
            if(!(field.indexOf("_") === 0)){
              parentItem[field] = data[field];
            }
          }

          e.data.dirty = true;
          options.success();
        },
        destroy: function (options) {
          var parentItem = findByID(options.data.OrderID);
          preventBinding = true;

          e.data.Orders.results.remove(parentItem);

          options.success();
        },
      },
      pageSize: 10,
      schema: {
        model: {
          id: "OrderID",
          fields: {
            OrderID: { editable: false },
            EmployeeID: { editable: false }
          }
        }
      }
    },
    scrollable: false,
    sortable: true,
    pageable: true,
    editable: "inline",
    columns: [
      { field: "OrderID", width: "70px" },
      { field: "ShipCountry", title: "Ship Country", width: "110px" },
      { field: "ShipAddress", title: "Ship Address" },
      { field: "ShipName", title: "Ship Name", width: "200px" },
      { command: ["edit", "destroy"], title: "&nbsp;" }
    ]
  });
}
  </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
