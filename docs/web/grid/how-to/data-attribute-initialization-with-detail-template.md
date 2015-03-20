---
title: Data attribute initialization with detail template
page_title: Data attribute initialization with detail template
description: Data attribute initialization with detail template
---

# Data attribute initialization with detail template

The following runnable sample demonstrates how to initialize a Kendo UI Grid using data attributes and include a detail template

#### Example:

```html
     <div id="grid" 
         data-role="grid"
         data-sortable="true"
         data-pageable="true"
         data-height="450"
         data-detail-init="viewModel.detailInit"
         data-columns='[{"field": "FirstName"}, {"field": "LastName"}, {"field": "Country"}, {"field": "City"}, {"field": "Title"}]'
         data-bind="source: dataSource, events: { dataBound: dataBound }"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
        },
        pageSize: 6,
        serverPaging: true,
        serverSorting: true
      });

      var viewModel = kendo.observable({
        dataSource: dataSource,
        detailInit: function (e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize:6,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: 70 },
              { field: "ShipCountry", title:"Ship Country", width: 100 },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: 200 }
            ]
          });
        },
        dataBound: function(e) {
          e.sender.expandRow(e.sender.tbody.find("tr.k-master-row").first());
        }
      });
      kendo.bind($(document.body), viewModel);
    </script>
```