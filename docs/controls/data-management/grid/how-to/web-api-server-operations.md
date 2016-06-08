---
title: Use WebAPI with Server-Side Operations
page_title: Use WebAPI with Server-Side Operations | Kendo UI Grid
description: "Learn how to implement the server-side data operations of paging, sorting, and filtering with WebAPI and Kendo UI Grid."
slug: howto_use_webapi_withserverside_operations_grid
---

# Use WebAPI with Server-Side Operations

Kendo UI does not provide any out-of-the-box capability for implementing server-side paging, sorting, and grouping. However, you can implement server-side data operations by using [UI for ASP.NET MVC](/aspnet-mvc).

The example below demonstrates how to use the `ToDataSourceResult` extension method provided by UI for ASP.NET MVC to implement the server-side data operations of paging, sorting, and grouping.

###### Example

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

## See Also

* [Download Visual Studio Solution](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/grid-data-source-request-web-api)

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
