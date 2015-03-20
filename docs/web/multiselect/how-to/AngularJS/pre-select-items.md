---
title: Pre-select items on load
page_title: Pre-select items on load
description: Pre-select items on load
---

# Pre-select items on load

The example below demonstrates how to pre-select items in MultiSelect without loading the whole source

#### Example:

```html
    <div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <div style="padding:10px">
           <p>Pre-select items using static initial data:</p>
           <select
              kendo-multi-select
              k-data-source="countryNames"
              k-data-text-field="'ProductName'"
              k-data-value-field="'ProductID'"
              k-ng-model="products"
              k-options="selectOptions"
              k-rebind="selectOptions"
              k-value-primitive="true"></select>

           <br/>
           <p>Pre-select items using data loaded via ajax:</p>
           <select
              kendo-multi-select
              k-data-source="productDataSource"
              k-data-text-field="'ProductName'"
              k-data-value-field="'ProductID'"
              k-ng-model="products2"
              k-options="secondOptions"
              k-rebind="secondOptions"
              k-value-primitive="true"></select>
      </div>
    </div>
    <style scoped>
        .demo-section {
            width: 400px;
        }
        .demo-section p {
            padding: 5px 0;
        }
    </style>
</div>

<script>
  var kms;
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function ($scope,$http){
      $scope.countryNames = {
          type: "odata",
          pageSize: 10,
          serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
      };

      $scope.selectOptions = {
          autoBind: false,
          value: [
            { ProductName: "Not Loaded 1", ProductID: 1 },
            { ProductName: "Not Loaded 2", ProductID: 11 }
          ]
      };

      $scope.products = [1, 11];

      $scope.productDataSource = {
          type: "odata",
          pageSize: 10,
          serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
      };

      $scope.secondOptions = {
        autoBind: false,
        valuePrimitive: true
      };

      $scope.products2 = [];

      function LoadValues(valuesToSelect) {
        var filter = Enumerable.from(valuesToSelect)
                        .select(function(x) { return "(ProductID eq "+x+")" })
                        .toArray().join("or");

        var success = function(data, status, headers) {
            var values =  Enumerable.from(data.d)
                            .select(function(x) { return {ProductName: x.ProductName, ProductID: x.ProductID, } })
                            .toArray();

            $scope.secondOptions = {
              autoBind: false,
              valuePrimitive: true,
              value: values
            };
            $scope.products2 = valuesToSelect;
        };

        $scope.filter = filter;
        $http.get('http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products?$filter='+filter).success(success);
      }

      setTimeout(function() {
        LoadValues([3, 4]);
      });
  });
</script>
```
