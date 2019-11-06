---
title: Use Web API with Server-Side Operations
page_title: Web API with Server|Side Operations | Kendo UI Grid for jQuery
description: "Learn how to implement the server-side data operations of paging, sorting, and filtering with WebAPI and the jQuery Grid by Kendo UI."
previous_url: /controls/data-management/grid/how-to/web-api-server-operations, /controls/data-management/grid/how-to/binding/web-api-server-operations
slug: howto_use_webapi_withserverside_operations_grid
tags: use, webapi, grid, serverside, data, operations, paging, sorting, filtering
component: grid
type: how-to
res_type: kb
---

Kendo UI does not provide any out-of-the-box capability for implementing server-side paging, sorting, and grouping.

However, you can implement server-side data operations by using [Telerik UI for ASP.NET MVC](/aspnet-mvc). The following example demonstrates how to use the `ToDataSourceResult` extension method to implement the server-side data operations of paging, sorting, and grouping.

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
        public DataSourceResult GetOrders([DataSourceRequest]DataSourceRequest request)
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

> **Important**
>
> The `dataSource` type Web API is intended for [Telerik UI for ASP.NET MVC](/aspnet-mvc). As a result, you need to include `kendo.aspnetmvc.js`.



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

## See Also

* [Download Visual Studio Solution](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/grid-data-source-request-web-api)
