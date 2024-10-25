---
title: Bind AngularJS AutoComplete with WebAPI
page_title: Implement WebAPI Binding in AngularJS - jQuery AutoComplete
description: Learn how to bind the Kendo UI for jQuery AutoComplete component in AngularJS with WebAPI.
type: how-to
slug: autocomplete-angularjs-bind-webapi
tags: kendoui, kendo, autocomplete, webapi, angularjs
ticketid: 1136078
res_type: kb
component: autocomplete
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® AutoComplete for jQuery</td>
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
  <td>61.0.3163.100</td>
 </tr>
</table>

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.

## Description

How can I bind a Kendo UI AutoComplete to the WebAPI in an AngularJS scenario?

## Solution

To achieve the desired scenario, set the `dataSource` type to `webapi` and the `transport` `read` URL to the method in your controller.

> The example loads Kendo UI 2023.3.1010 version.

```dojo
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>

<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <h4>Autocomplete</h4>
        <input kendo-auto-complete  
               k-data-text-field="'Name'"
               k-data-value-field="'Id'"
               options="autoCompleteOptions" style="width: 21%;" />

    </div>
</div><script>
  angular.module("KendoDemos", [ "kendo.directives" ])
          .controller("MyCtrl", function($scope){
              $scope.autoCompleteOptions = {
                  dataSource: {
                      type: "webapi",
                      serverFiltering: true,
                      transport: {
                          read: {
                              url: "/api/products"
                          }
                      },
                      schema: {
                          data: "Data",
                          total: "Total",
                          errors: "Errors"
                      }
                  }
              };

          })              
</script>

----------- Controller implementation
// GET api/values
  public DataSourceResult Get([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
  {            
      var products = new List<Product>
      {
          new Product { Name = "Product 1", Id = "1" },
          new Product { Name = "Product 2", Id = "2" },
          new Product { Name = "Product 3", Id = "3" }
      };

      return products.ToDataSourceResult(request);
  }
```

## See Also

* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
* [Product Page of the jQuery AutoComplete](https://www.telerik.com/kendo-jquery-ui/autocomplete)
* [jQuery AutoComplete Overview (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
