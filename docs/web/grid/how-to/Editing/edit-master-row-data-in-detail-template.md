---
title: Hierarchy with editable detail grid
page_title: Hierarchy with editable detail grid
description: Hierarchy with editable detail grid
---

# Hierarchy with editable detail grid

The following runnable sample demonstrates how to edit records in a child grid.

#### Example: 

```html
  <div id="grid"></div>
  <script>
    var preventBinding = false,
    grid = $("#grid").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: {
            url: "http://demos.kendoui.com/service/Northwind.svc/Employees",
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