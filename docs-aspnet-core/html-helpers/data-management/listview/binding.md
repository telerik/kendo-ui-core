---
title: Ajax Binding
page_title: Binding | Kendo UI ListView HtmlHelper for ASP.NET Core
description: "Configure the Kendo UI ListView component for AJAX binding and easily enable client-data processing during AJAX binding."
slug: htmlhelpers_listview_aspnetcore_ajaxbinding
position: 2
---

# Ajax Binding

When configured for AJAX binding, the Kendo UI ListView for ASP.NET Core makes Ajax requests when doing paging.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ListView for ASP.NET Core for Ajax binding.

1. Add a new action method which returns data to populate the ListView. Note that the action method has a parameter of type `Kendo.Mvc.UI.DataSourceRequest`. It will contain the current ListView request information. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

    ###### Example

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

1. Use the `ToDataSourceResult` extension method to convert your `IQueryable` or `IEnumerable` to a `Kendo.Mvc.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

    ###### Example

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // result can be any IEnumerable or IQueriable
            var result = myService.Orders;

            var dsResult = result.ToDataSourceResult(request);
        }

1. Return the `DataSourceResult` as JSON.

    ###### Example

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // get orders from service
            var orders = myService.Orders;

            // apply requested sort, page, group, filtering with the ToDataSourceResult() extension method
            var dsResult = orders.ToDataSourceResult(request);

            return Json(dsResult);
        }

1. In the view, configure the ListView to use the action method created in the previous steps. You may use the sample model and data from the example below

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
                // result can be any IEnumerable or IQueriable, this is just an example you can copy and paste
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

The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and Linq expressions to apply paging, sorting, filtering, and grouping. The JSON response of the action method will contain only a single page of data. The ListView will be bound to that data.

### Additional Parameters

To pass additional parameters to the action method, use the `Data` setting. Provide the name of a JavaScript function which will return an object containing the additional data.

The following example demonstrates the action method.

###### Example

    public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
    {
        //Implementation omitted
    }


The following example demonstrates how to send additional data.

###### Example

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

### Client Data Processing

By default, Kendo UI ListView for ASP.NET Core requests data from the server every time the user changes the page, filters the ListView, sorts, or groups. This behavior
can be changed by disabling `ServerOperation`.

###### Example

    .DataSource(dataSource => dataSource
        .ServerOperation(false) // all data will be requested at once and data operations will be applied client-side
        .Read(read => read.Action("Orders_Read", "ListView"))
    )

## See Also

* [Overview of the ListView HtmlHelper]({% slug htmlhelpers_listview_aspnetcore %})
* [JavaScript API Reference of the ListView](http://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [Overview of the jQuery Kendo UI ListView Widget](https://docs.telerik.com/kendo-ui/controls/data-management/listview/overview)
* [UI for ASP.NET Core ListView Official Demos](http://demos.telerik.com/aspnet-core/listview/index)
