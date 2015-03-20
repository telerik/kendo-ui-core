---
title: Grid Bound to Telerik Backend Services in AngularJS
page_title: Grid Bound to Telerik Backend Services in AngularJS
description: Kendo Grid example that demontrates how to bind the Grid widget to the Telerik Backend Services in an AngularJS application.
---

# Binding an Kendo UI Grid to Telerik Backend Services in AngularJS

The example below demonstrates how to use AngularJS directives to declare a grid bound to the Telerik Backend Services.

#### Example:

```html
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl">
    <!-- Use grid directive with scope options -->
    <kendo-grid options="gridOptions"></kendo-grid>
  </div>
</div>

<!-- Include Backend Services script on page -->
<script src="https://bs-static.cdn.telerik.com/1.2.6/everlive.all.min.js"></script>
<script>
  // configure API key
  var everlive = new Everlive({
    apiKey: "3q4sHgIqESXbpvOp",
    scheme: "http"
  });

  angular.module("KendoDemos", [ "kendo.directives" ]);
  function MyCtrl($scope) {
    // declare dataSource bound to backend
    var dataSource = new kendo.data.DataSource({
      type: "everlive",
      transport: {
        // binding to the Order type in the backend
        typeName: "Order"
      },
      schema: {
        model: {
          id: "Id",
          fields: {
            // default fields for Backend Services types
            CreatedBy:  { type: "string" },
            CreatedAt:  { type: "date" },
            ModifiedAt: { type: "date" },

            // type fields
            Freight:    { type: "number" },
            OrderDate:  { type: "date" },
            ShipName:   { type: "string" },
            ShipCity:   { type: "string" }
          }
        }
      },
      serverPaging: true,
      pageSize: 20,

      serverSorting: true,
      sort: { field: 'OrderDate', dir: 'asc' }
    });

    $scope.gridOptions = {
      dataSource: dataSource,
      sortable: true,
      pageable: true,
      columns: [
        { field: "Freight", width: 100 },
        { field: "OrderDate", title: "Order Date", width: 120, format: "{0:MM/dd/yyyy}" },
        { field: "ShipName", title: "Ship Name" },
        { field: "ShipCity", title: "Ship City", width: 150 }
      ]
    };
  }
</script>
```
