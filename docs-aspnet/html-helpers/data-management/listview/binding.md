---
title: Ajax Binding
page_title: Ajax Binding
description: "Configure the Telerik UI ListView for AJAX binding and easily enable client-data processing during AJAX binding."
previous_url: /helpers/data-management/listview/binding
slug: htmlhelpers_listview_aspnetcore_ajaxbinding
position: 2
---

# Ajax Binding

When configured for Ajax binding, the ListView for {{ site.framework }} makes Ajax requests when doing paging.

## Getting Started

To configure the ListView for {{ site.framework }} for Ajax binding:

1. Add a new action method which returns data to populate the ListView. Note that the action method has a parameter of type `Kendo.Mvc.UI.DataSourceRequest`. It will contain the current ListView request information. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

1. Use the `ToDataSourceResult` extension method to convert your `IQueryable` or `IEnumerable` to a `Kendo.Mvc.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // The result can be any IEnumerable or IQueriable.
            var result = myService.Orders;

            var dsResult = result.ToDataSourceResult(request);
        }

1. Return the `DataSourceResult` as JSON.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // Get orders from the service.
            var orders = myService.Orders;

            // Apply the requested sort, page, group, filtering with the ToDataSourceResult() extension method.
            var dsResult = orders.ToDataSourceResult(request);

            return Json(dsResult);
        }

1. In the view, configure the ListView to use the action method created in the previous steps. You may use the sample model and data from the following example. The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and Linq expressions to apply paging, sorting, filtering, and grouping. The JSON response of the action method will contain only a single page of data. The ListView will be bound to that data.

    ```Razor
        @(Html.Kendo().ListView<ListViewCore.Models.OrderViewModel>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(6)
                .Read(read => read.Action("Orders_Read", "ListView"))
            )
            .Pageable()
        )
    ```
    ```Template
        <script type="text/x-kendo-tmpl" id="template">
            <div class="order">
                <h3>#= OrderID #</h3>
                <dl>
                    <dt>Ship Name:</dt>
                    <dd>#= ShipName #</dd>
                </dl>
                <dl>
                    <dt>Ship City:</dt>
                    <dd>#= ShipCity #</dd>
                </dl>
                <dl>
                    <dt>Freight:</dt>
                    <dd>#= kendo.toString(Freight, "n2")#</dd>
                </dl>
                <dl>
                    <dt>Order Date:</dt>
                    <dd>#= kendo.toString(OrderDate, "D")#</dd>
                </dl>
            </div>
        </script>
        <style>
            .order {
                float: left;
                width: 30%;
                height: 300px;
                position: relative;
                margin-left: 30px;
                text-align:center;
            }
        </style>
    ```
    ```Model
        public class OrderViewModel
        {
            public int OrderID
            {
                get;
                set;
            }

            public decimal? Freight
            {
                get;
                set;
            }
                public DateTime? OrderDate
            {
                get;
                set;
            }
                public string ShipCity
            {
                get;
                set;
            }
                public string ShipName
            {
                get;
                set;
            }
        }
    ```
    ```Controller
        public class ListViewController : Controller
        {
            public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
            {
                // The result can be any IEnumerable or IQueriable.
                // This is just an example that you can copy and paste.
                var result = Enumerable.Range(0, 50).Select(i => new OrderViewModel
                {
                    OrderID = i,
                    Freight = i * 10,
                    OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                });

                var dsResult = result.ToDataSourceResult(request);
                return Json(dsResult);
            }
        }
    ```

## Adding More Parameters

To pass additional parameters to the action method:

1. Use the `Data` setting.
1. Provide the name of a JavaScript function which will return an object containing the additional data.

  The following example demonstrates the action method.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
        {
            // The implementation is omitted for brevity.
        }

  The following example demonstrates how to send additional data.

        @(Html.Kendo().ListView<ListViewCore.Models.OrderViewModel>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(6)
                .Read(read => read.Action("Orders_Read", "ListView").Data("additionalData"))
            )
            .Pageable()
        )
        <script>
            function additionalData() {
                return {
                    firstName: "John",
                    lastName: "Doe"
                };
            }
        </script>

## Processing Client Data

By default, the Telerik UI ListView for {{ site.framework }} requests data from the server every time the user changes the page, filters the ListView, sorts, or groups. To change this behavior, disable `ServerOperation`.

    .DataSource(dataSource => dataSource
        .ServerOperation(false) // All data will be requested at once and data operations will be applied client-side.
        .Read(read => read.Action("Orders_Read", "ListView"))
    )

## See Also

* [Binding to Remote Data by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/remote-data-binding)
* [Customizing the Data Source of the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/custom-datasource)
* [Server-Side API](/api/listview)
