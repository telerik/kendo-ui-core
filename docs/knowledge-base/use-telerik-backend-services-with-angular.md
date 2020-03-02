---
title: Bind to Kinvey Backend Services
page_title: Bind to Telerik Backend Services | Kendo UI Grid for jQuery
description: "An example on how to use AngularJS directives to bind the Kendo UI Grid for jQuery to Telerik Backend Services."
previous_url: /controls/data-management/grid/how-to/AngularJS/use-telerik-backend-services-with-angular
slug: howto_bindto_telerik_backend_services_grid
tags: bind, grid, kinvey, backend, telerik, services, angularjs
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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
  <tr>
  <td>Preferred Framework</td>
  <td>AngularJS</td>
 </tr>
</table>

## Description

How can I use AngularJS directives to bind the Kendo UI Grid for jQuery to Telerik Backend Services?

## Solution

The following example demonstrates how to bind the [Grid](https://www.telerik.com/kendo-ui/grid) to the Kinvey Backend Services in an AngularJS application.

```dojo
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl" data-ng-init="init()">
        <!-- Use grid directive with scope options -->
        <kendo-grid options="gridOptions"></kendo-grid>
    </div>
</div>

<!-- Kinvey JS SDK (HTML, PhoneGap, etc.) -->
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/kinvey-html5-sdk.min.js"></script>

<!-- Kinvey Kendo UI Data Source -->
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/kendo.data.kinvey.min.js"></script>
<script>
    // configure API key
    Kinvey.init({
        appKey: 'kid_SJyRpx96G',
        appSecret: 'a88466f87e434ca4a1a0194e33d3168d'
    });

    angular.module("KendoDemos", ["kendo.directives"])
        .controller('MyCtrl', ["$scope", MyCtrl]);

    function MyCtrl($scope) {
        $scope.init = function() {
            if (!Kinvey.User.getActiveUser()) {
                var that = this;
                Kinvey.User.signup()
                    .then(function() {
                        that.dataSource.read();
                    })
                    .catch(function(error) {
                        alert(error.message);
                    });
            } else {
                this.dataSource.read();
            }
        };

        // declare dataSource bound to backend
        $scope.dataSource = new kendo.data.DataSource({
            type: "kinvey",
            transport: {
                typeName: "products"
            },
            schema: {
                model: {
                    id: "_id",
                    fields: {
                        UnitPrice: {
                            type: "number"
                        },
                        UnitsInStock: {
                            type: "number"
                        },
                        Discontinued: {
                            type: "boolean"
                        }
                    }
                }
            },
            pageSize: 20,
            serverSorting: true,
            serverPaging: true,
            error: function(err) {
                alert(JSON.stringify(err));
            }
        });

        $scope.gridOptions = {
            autoBind: false,
            dataSource: $scope.dataSource,
            height: 430,
            sortable: true,
            pageable: true,
            columns: [{
                field: "ProductName",
                title: "Product Name"
            }, {
                field: "UnitPrice",
                title: "Unit Price",
                width: 220
            }, {
                field: "UnitsInStock",
                title: "Units In Stock",
                width: 220
            }, {
                field: "Discontinued",
                title: "Discontinued",
                width: 220
            }]
        };
    }
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
s
