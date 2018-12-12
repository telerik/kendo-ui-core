---
title: Cascading DropDownLists by Using Transport Binding with AngularJS and WebAPI
description: An example on how to implement cascading dropdownlists, with transport binding with webapi with angularjs
type: how-to
page_title: Implement Cascading DropDownLists with AngularJS by Using Transport Binding and WebAPI | Kendo DropDownList
slug: dropdownlist-cascading-angularjs-webapi
tags: kendo, kendoui, dropdownlist, cascading, webapi, transport, datasource, angularjs
ticketid: 1142461
res_type: kb

---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
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

How can I implement cascading DropDownLists, which are configured with the `transport` data binding, together with WebAPI in an AnguarJS application?

## Solution

Configure the child DropDownList by setting the `k-cascade-from` and `k-cascade-from-field`. As a result, it "becomes aware" of its parent DropDownList from whose fields it will cascade.

```dojo

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

---------Controller Implementation-------------
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
