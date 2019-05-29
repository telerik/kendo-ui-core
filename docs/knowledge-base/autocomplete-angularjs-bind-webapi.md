---
title: Bind AutoComplete for AngularJS with WebAPI
page_title: Implement WebAPI Binding in AngularJS | Kendo UI AutoComplete for jQuery
description: An example on how to bind the Kendo UI AutoComplete for AngularJS with WebAPI.
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
  <td>Progress Kendo UI AutoComplete</td>
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


## Description

How can I bind a Kendo UI AutoComplete to the WebAPI in an AngularJS scenario?

## Solution

Set the `dataSource` type to `webapi` and the `transport` `read` URL to the method in your controller.

```dojo
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
