---
title: Server-side operations with WebAPI
page_title: Server-side paging, sorting and grouping with Web API
description: This example shows how to implement server-side paging, sorting, filtering with WebAPI and Kendo UI grid
---

# Server-side operations with WebAPI

Kendo UI doesn't provide any out of the box capability for implementing server-side paging, sorting and grouping.

Fortunately this becomes a very easy task with the help of [UI for ASP.NET MVC](/aspnet-mvc).

This project shows how to use the `ToDataSourceResult` extension method provided by UI for ASP.NET MVC to implement
server-side paging, sorting and grouping.

```Controller
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using grid_data_source_request_web_api.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace grid_data_source_request_web_api.Controllers
{
    public class OrdersController : ApiController
    {
        private NorthwindEntities db = new NorthwindEntities();

        // GET api/Orders
        public DataSourceResult GetOrders([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return db.Orders.ToDataSourceResult(request);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
```
```jQuery
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [
              { "title": "Order ID", "width": "100px", "field": "OrderID" },
              { "title": "Ship City", "width": "200px", "field": "ShipCity" },
              { "title": "Ship Address", "field": "ShipAddress" }
        ],
        groupable: true,
        pageable: true,
        sortable: true,
        dataSource: {
            type: "webapi",
            transport: {
                read: {
                    url: "/api/orders"
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            serverGrouping: true,
            serverAggregates: true,
            schema: {
                data: "Data",
                total: "Total",
                errors: "Errors"
            }
        }
    });
</script>
```
```Angular
<div ng-app="app" ng-controller="controller">
    <div kendo-grid k-options="gridOptions" k-data-source="gridDataSource"></div>
</div>
<script>
    var app = angular.module("app", ["kendo.directives"]);
    app.controller("controller", ["$http", "$scope", function ($http, $scope) {
        $scope.gridOptions = {
            columns: [
                { "title": "Order ID", "width": "100px", "field": "OrderID" },
                { "title": "Ship City", "width": "200px", "field": "ShipCity" },
                { "title": "Ship Address", "field": "ShipAddress" }
            ],
            groupable: true,
            pageable: true,
            sortable: true
        };

        $scope.gridDataSource = {
            transport: {
                read: function (options) {
                    var webapi = new kendo.data.transports.webapi({ prefix: "" });
                    var params = webapi.parameterMap(options.data);

                    $http.get("/api/orders", { params: params })
                        .success(function (data) {
                            options.success(data);
                        })
                        .error(function (data) {
                            options.error();
                        });
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            serverGrouping: true,
            serverAggregates: true,
            schema: $.extend({}, kendo.data.schemas.webapi, { data: "Data", total: "Total", errors: "Errors" })
        };
    }]);
</script>
```

[Download Visual Studio Solution](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/grid-data-source-request-web-api)
