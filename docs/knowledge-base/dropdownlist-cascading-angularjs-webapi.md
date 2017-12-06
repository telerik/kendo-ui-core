---
title: Cascading DropDownLists Using Transport Binding with AngularJS and WebAPI
description: An example on how to implement cascading dropdownlists, with transport binding with webapi with angularjs
type: how-to
page_title: Implement Cascading DropDownLists with AngularJS, Using Transport Binding and WebAPI | Kendo DropDownList
slug: dropdownlist-cascading-angularjs-webapi
position: 0
tags: kendo, kendoui, dropdownlist, cascading, webapi, transport, datasource, angularjs
ticketid: 1142461
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for Progress® Kendo UI®</td>
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
  <td>Lastest</td>
 </tr>
</table>


## Description

How can I have cascading DropDownLists configured with transport data binding. I need to implement this with WebAPI and I use AnguarJS

## Solution

In order to achieve the desired functionality, you should have the child dropdownlist configured to be aware of his parent widget and from which fields it should cascade. This should be achieved, by setting the **k-cascade-from** and **k-cascade-from-field**.

The example below, demonstrates full implementation of the scenario:

```html

<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <input kendo-drop-down-list
               id="dropdownlist1"
               options="dropDownOptions"
               k-data-text-field="'Name'"
               k-data-value-field="'Id'"/>

        <input kendo-drop-down-list
               id="dropdownlist1"
               k-data-text-field="'Name'"
               k-data-value-field="'Id'"
               k-cascade-from="'dropdownlist1'"
               k-cascade-from-field="'ProductType'"
               options="subDropDownOptions"/>
    </div>
</div>
<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
          .controller("MyCtrl", function($scope){
              $scope.dropDownOptions = {
                  optionLabel: "select",
                  dataSource: {
                      type: "webapi",
                      serverFiltering: true,
                      transport: {
                          read: {
                              url: "api/products/get"
                          }
                      },
                      schema: {
                          data: "Data",
                          total: "Total",
                          errors: "Errors"
                      }
                  }
              };
              $scope.subDropDownOptions = {
                    dataSource: {
                        type: "webapi",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: "api/products/getchild"
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

---------Controller Implementatoin-------------
 public class ProductsController : ApiController
    {
        [Route("api/Products/Get")]
        [HttpGet]
        public DataSourceResult Get([ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            var products = new List<ProductType>
                {
                    new ProductType { Name = "Product 1", Id = 1 },
                    new ProductType{ Name = "Product 2", Id = 2},
                    new ProductType { Name = "Product 3", Id = 3 }
                };

            return products.ToDataSourceResult(request);
        }

        [Route("api/Products/GetChild")]
        [HttpGet]
        public DataSourceResult GetChild([ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {

            var products = new List<Product>
                {
                    new Product { Name = "Sub of Type 1 -1", Id = 1, ProductType= 1},
                    new Product { Name = "Sub of Type 1 -2", Id = 2 , ProductType= 1},
                    new Product { Name = "Sub of Type 1 -3", Id = 3 , ProductType= 1},
                    new Product { Name = "Sub of Type 2 -1", Id = 4, ProductType= 2},
                    new Product { Name = "Sub of Type 2 -2", Id = 5 , ProductType= 2},
                    new Product { Name = "Sub of Type 2 -3", Id = 6 , ProductType= 2},
                    new Product { Name = "Sub of Type 3 -1", Id = 7, ProductType= 3},
                    new Product { Name = "Sub of Type 3 -2", Id = 8 , ProductType= 3},
                    new Product { Name = "Sub of Type 3 -3", Id = 9 , ProductType= 3},
                };

            return products.ToDataSourceResult(request);
        }

    }

```
