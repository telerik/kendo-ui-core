---
title: Use Web API with Server-Side Operations
page_title: Web API with Server-Side Operations - Kendo UI Grid for jQuery
description: "Learn how to implement the server-side data operations of paging, sorting, and filtering with WebAPI and the jQuery Grid by Kendo UI."
previous_url: /controls/data-management/grid/how-to/web-api-server-operations, /controls/data-management/grid/how-to/binding/web-api-server-operations
slug: howto_use_webapi_withserverside_operations_grid
tags: use, webapi, grid, serverside, data, operations, paging, sorting, filtering, crud, edit, editing, editable
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
</table>

## Description

How can I implement the server-side data operations of paging, sorting, and filtering with WebAPI and the Data Grid?

## Solution

Kendo UI does not provide any out-of-the-box capability for implementing server-side paging, sorting, and grouping.

However, you can implement server-side data operations by using [Telerik UI for ASP.NET Core](/aspnet-core). The following example demonstrates how to use the `ToDataSourceResult` extension method to implement the server-side data operations of paging, sorting, and grouping.

```Controller
using ApiJqueryGrid.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ApiJqueryGrid.Controllers
{
    [Route("api/[controller]")]
    public class GridController : ControllerBase
    {
        private static List<OrderViewModel> orders;

        [HttpGet("Read")]
        public DataSourceResult GetOrders([DataSourceRequest] DataSourceRequest request)
        {
            if (orders == null)
            {
                orders = Enumerable.Range(1, 50).Select(i => new OrderViewModel
                {
                    OrderID = i,
                    Category = new Category() { CategoryID = 2, CategoryName = "Delivered" },
                    OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }).ToList();
            }


            return orders.ToDataSourceResult(request);
        }

        [HttpPost("Create")]
        public IActionResult Create(OrderViewModel order)
        {
            order.OrderID = orders.Count + 1;
            orders.Add(order);

            return new ObjectResult(new DataSourceResult { Data = new[] { order }, Total = 1 });
        }

        [HttpPut("Update")]
        public IActionResult Update(OrderViewModel order)
        {

            return new StatusCodeResult(200);
        }

        [HttpDelete("Destroy")]
        public IActionResult Destroy(OrderViewModel order)
        {
            orders.Remove(order);

            return new StatusCodeResult(200);
        }
    }
}
```

> The `dataSource` type Web API is intended for [Telerik UI for ASP.NET Core](/aspnet-core). As a result, you need to include `kendo.aspnetmvc.js`.

```jQuery
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [
                { "title": "Order ID", "width": "100px", "field": "OrderID" },
                { "title": "Ship City", "width": "200px", "field": "ShipCity" },
                { "title": "Ship Name", "width": "200px", "field": "ShipName" },
                { "title": "Order Date", "width": "200px", "field": "OrderDate", format: "{0:dd/MM/yyyy}" },
                { "title": "Category", "width": "200px", "field": "Category", editor: categoryDropDownList, template: "#=Category.CategoryName#" },
                { command: ["edit", "destroy"], "width": "150px" }
            ],
            toolbar: ["create"],
            groupable: true,
            pageable: true,
            sortable: true,
            filterable: true,
            editable: "inline",
            dataSource: {
                type: "webapi",
                transport: {
                    read: {
                        url: "/api/Grid/Read"
                    },
                    update: {
                        url: "/api/Grid/Update"
                    },
                    create: {
                        url: "/api/Grid/Create"
                    },
                    destroy: {
                        url: "/api/Grid/Destroy"
                    }
                },
                pageSize: 20,
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                serverGrouping: true,
                serverAggregates: true,
                schema: {
                    data: "Data",
                    total: "Total",
                    errors: "Errors",
                    model: {
                        id: "OrderID",
                        fields: {
                            OrderID: { type: "number", editable: false },
                            ShipCity: { type: "string" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            Category: { defaultValue: {CategoryID: 1, CategoryName: "En Route"} },
                        }
                    }
                }
            }
        });

        function categoryDropDownList(container, options) {
            $('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "CategoryName",
                    dataValueField: "CategoryID",
                    dataSource: {
                        data: [{ CategoryID: 1, CategoryName: "En Route" }, { CategoryID: 2, CategoryName: "Delivered" }]
                    }
                });
        }
    </script>
```
```Angular
<div ng-app="app" ng-controller="controller">
    <div kendo-grid k-options="gridOptions" k-data-source="gridDataSource"></div>
</div>
<script>
    var app = angular.module("app", ["kendo.directives"]);
    app.controller("controller", ["$http", "$scope", function ($http, $scope) {
        $scope.categoryDataSource = new kendo.data.DataSource({
            data: [{ CategoryID: 1, CategoryName: "En Route" }, { CategoryID: 2, CategoryName: "Delivered" }]
        });

        $scope.categoryDropDownList = function (container, options) {
            $('<input kendo-drop-down-list required k-data-text-field="\'CategoryName\'" k-data-value-field="\'CategoryID\'" k-data-source="categoryDataSource" data-bind="value:' + options.field + '"/>')
                .appendTo(container);
        };

        $scope.gridOptions = {
            columns: [
                { "title": "Order ID", "width": "100px", "field": "OrderID" },
                { "title": "Ship City", "width": "200px", "field": "ShipCity" },
                { "title": "Ship Name", "width": "200px", "field": "ShipName" },
                { "title": "Order Date", "width": "200px", "field": "OrderDate", format: "{0:dd/MM/yyyy}" },
                { "title": "Category", "width": "200px", "field": "Category", editor: $scope.categoryDropDownList, template: "#=Category.CategoryName#" },
                { command: ["edit", "destroy"], "width": "150px" }
            ],
            toolbar: ["create"],
            groupable: true,
            pageable: true,
            sortable: true,
            filterable: true,
            editable: "inline"
        };

        $scope.model = {
            id: "OrderID",
            fields: {
                OrderID: { type: "number", editable: false },
                ShipCity: { type: "string" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" },
                Category: { defaultValue: { CategoryID: 1, CategoryName: "En Route" } },
            }
        };

        $scope.gridDataSource = {
            transport: {
                read: {
                    url: "/api/Grid/Read",
                    type: "GET"
                },
                update: {
                    url: "/api/Grid/Update",
                    type: "PUT"
                },
                create: {
                    url: "/api/Grid/Create",
                    type: "POST"
                },
                destroy: {
                    url: "/api/Grid/Destroy",
                    type: "DELETE"
                },
                parameterMap: function (data, operation) {
                    var webapi = new kendo.data.transports.webapi({ prefix: "" });
                    var params = webapi.parameterMap(data);

                    return params;
                }
            },
            pageSize: 20,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            serverGrouping: true,
            serverAggregates: true,
            schema: { data: "Data", total: "Total", errors: "Errors", model: $scope.model }
        };
    }]);
</script>
```

## See Also

* [Download Visual Studio Solution](https://github.com/telerik/kendo-examples-asp-net/tree/master/grid-core-webapi-crud)
