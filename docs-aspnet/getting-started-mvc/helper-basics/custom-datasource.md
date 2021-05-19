---
title: Custom DataSource
page_title: Custom DataSource
description: "Get started with Telerik UI for ASP.NET MVC and use the CustomDataSource builder."
slug: customdatasource_aspnetmvc
previous_url: /custom-datasource, /getting-started/custom-datasource
position: 2
permalink: /getting-started/helper-basics/custom-datasource
---

# Custom DataSource

Telerik UI for ASP.NET MVC enables you to use the CustomDataSource builder that is available helpers which support data binding.

The CustomDataSource builder provides full control over the [DataSource client-side API options](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). The CustomDataSource builder facilitate the usage of the Telerik UI helpers&mdash;for example, the helpers generate validation attributes, editors, and so on, while they utilize the flexibility of JavaScript. The CustomDataSource builder can also be used in more advanced scenarios where the regular DataSource builders prevent you from fully customizing the options of the DataSource.

## Getting Started

The CustomDataSource builder removes all predefined settings that are introduced by the regular DataSource builders.

The following example demonstrates how to convert a regular [Grid](https://demos.telerik.com/kendo-ui/grid/index) AjaxDataSourceBuilder to a CustomDataSource builder.

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(true)
            .Model(model =>
            {
                model.Id(p => p.OrderID);
                model.Field(p => p.OrderID).Editable(false);
            })
            .Read(read => read.Action("Read", "Home"))     
        )
    )

The following example demonstrates the CustomDataSourceBuilder equivalent.

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Custom()
            .Type("aspnetmvc-ajax")
            .PageSize(10)
            .ServerPaging(true)
            .ServerSorting(true)
            .ServerFiltering(true)
            .Transport(transport => transport
                .Read(read => read.Action("Read", "Home"))
            )
            .Schema(schema => schema
                .Data("Data")
                .Total("Total")
                .Errors("Errors")
                .Parse(@<text>function (data) {
                    // configure a parse function only if the response (data) must be
                    // transformed in some way before data binding
                    return data;
                }</text>)
                .Model(model => {
                    model.Id("OrderID");
                    model.Field("OrderID", typeof(int));
                    model.Field("OrderDate", typeof(DateTime));
                    model.Field("OrderDescription", typeof(string));
                    model.Field("IsCompleted", typeof(bool));
                })
            )
        )
    )

## Headers

As of the Telerik UI for ASP.NET MVC R3 2019 release, you can set request headers through the `Headers` configuration option using the regular or the CustomDataSource builder.

The following example demonstrates how to use the `Headers` option to set a request header using custom DataSource.

```HtmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Custom(dataSource =>
        {
            dataSource
            .Type("odata")
            .Transport(transport =>
            {
                transport.Read(read =>
                {
                    read.Action("ReadOrders", "Home")
                    .DataType("json")
                    .Headers(new { header1 = "test" });
                });
            });
        })
    )

    <script>
        myDataSource.read(); // the header will be set in the request sent to the HomeController ReadOrders action.
    </script> 
```
```HomeController

    public ActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // Orders can be IQueriable or IEnumerable.
        return Json(orders.ToDataSourceResult(request));
    }
```

Unlike the Grid, or other helpers that can be bound to local data, the DataSource helper does not provide functionality for binding to data in the ViewModel and must be configured to use remote data, as demonstrated in the example above.

## Setting Functions and Objects as DataSource Objects

To set a JavaScript function or object as an option for the DataSource, use the `ClientHandlerDescriptor` class.

The following example demonstrates how to set a JavaScript function for the `Read` operation of the Scheduler by utilizing the `ClientHandlerDescriptor` type that is included in the `Kendo.Mvc` namespace. This class allows code rendering as is without the need of string wrapping. In this way, the JavaScript functions and objects can be set to apply various options from the CustomDataSource.

    @(Html.Kendo().Scheduler<MeetingViewModel>()
        .Name("scheduler")
        .Editable(false)
        .DataSource(ds => ds
            .Custom()
            .Batch(true)
            .Schema(schema => schema
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field("title", typeof(string)).DefaultValue("No title").From("Title");
                    m.Field("start", typeof(DateTime)).From("Start");
                    m.Field("end", typeof(DateTime)).From("End");
                    m.Field("description", typeof(string)).From("Description");
                    m.Field("recurrenceID", typeof(int)).From("RecurrenceID");
                    m.Field("recurrenceRule", typeof(string)).From("RecurrenceRule");
                    m.Field("recurrenceException", typeof(string)).From("RecurrenceException");
                    m.Field("isAllDay", typeof(bool)).From("IsAllDay");
                    m.Field("startTimezone", typeof(string)).From("StartTimezone");
                    m.Field("endTimezone", typeof(string)).From("EndTimezone");
                }))
            .Transport(new {
                //the ClientHandlerDescriptor is a special type that allows code rendering as-is (not as a string)
                read = new Kendo.Mvc.ClientHandlerDescriptor() {HandlerName = "customRead" }
            })
        )
    )

    <script>
        function customRead(options) {
            $.ajax({
                url: "https://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp",
                success: function (data) {
                    alert("Data is received");
                    options.success(data);
                }
            });
        }
    </script>

## Setting Model Fields as Functions

The following example demonstrates how to set the default value of the `EmployeeID` field to a JavaScript function. This approach is applicable when the default value has to be dynamic. For example, when the user inserts a new record while the `EmployeeID` column specifies a filter value that is different from the default one.

    @(Html.Kendo().Grid<ForeignKeyColumnDemo.Models.Order>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Create())
        .Filterable()
        .DataSource(dataSource => dataSource
            .Custom()
            .Type("aspnetmvc-ajax")
            .PageSize(10)
            .ServerPaging(false)
            .ServerSorting(false)
            .ServerFiltering(false)
            .Transport(transport => transport
                .Read(read => read.Action("Read", "Home"))
                .Create(create => create.Action("Create", "Home"))
            )
            .Schema(schema => schema
                .Data("Data")
                .Total("Total")
                .Errors("Errors")
                .Model(model => {
                    model.Id("OrderID");
                    model.Field("OrderID", typeof(int));
                    model.Field("EmployeeID", typeof(int)).DefaultValue(new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "defaultValue" });
                    model.Field("OrderDate", typeof(DateTime));
                    model.Field("OrderDescription", typeof(string));
                    model.Field("IsCompleted", typeof(bool));
                })
            )
        )
    )

    <script>    
        function defaultValue(e) {
            if (typeof this.EmployeeID === "function") {
                var grid = $("#grid").data("kendoGrid");
                var ds = grid.dataSource;
                var filter = ds.filter();

                if (filter && filter.filters[0].field === "EmployeeID") {
                    return filter.filters[0].value;
                } else {
                    return 1;
                }
            }
        }
    </script>

## Setting Up Custom DataType CRUD Operations

The following example demonstrates how to bind the Grid to the Kendo UI online demo service that serves `jsonp` data. For the full demo, refer to the [Download and Installation article of Telerik UI for ASP.NET MVC]({% slug overview_downloadinstallation_mvc %}#sample-application).

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
        .Name("Grid")    
        .Columns(columns => {        
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Destroy()).Width(110);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();        
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource        
            .Custom()         
            .Batch(true)
            .PageSize(20)
            .Schema(schema => schema.Model(m => m.Id(p => p.ProductID)))
            .Transport(transport =>
            {
                transport.Read(read =>
                   read.Url("https://demos.telerik.com/kendo-ui/service/products")
                       .DataType("jsonp")
                );
                transport.Create(create =>
                   create.Url("https://demos.telerik.com/kendo-ui/service/products/create")
                         .DataType("jsonp")
                );
                transport.Update(update =>
                   update.Url("https://demos.telerik.com/kendo-ui/service/products/update")
                         .DataType("jsonp")
                );
                transport.Destroy(destroy =>
                   destroy.Url("https://demos.telerik.com/kendo-ui/service/products/destroy")
                          .DataType("jsonp")
                );
                transport.ParameterMap("parameterMap");
            })
        )
    )
    <script>
        function parameterMap(options, operation) {
            if (operation !== "read" && options.models) {
                return { models: kendo.stringify(options.models) };
            }
        }
    </script>

## Binding the Grid to oData

The following example demonstrates how to bind the Grid to the oData service. For the full demo, refer to the [Download and Installation article of Telerik UI for ASP.NET MVC]({% slug overview_downloadinstallation_mvc %}#sample-application).

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(e => e.OrderID).Filterable(false);
            columns.Bound(e => e.Freight);
            columns.Bound(e => e.OrderDate).Width(120).Format("{0:MM/dd/yyyy}");
            columns.Bound(e => e.ShipName).Width(260);
            columns.Bound(e => e.ShipCity).Width(150);
        })
        .DataSource(dataSource => dataSource
            .Custom()
            .Type("odata")
            .Transport(transport =>
               transport.Read(read => read.Url("https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"))
            )
            .PageSize(20)
            .ServerPaging(true)
            .ServerSorting(true)
            .ServerFiltering(true)
        )
        .Pageable()
        .Sortable()
        .Filterable()
    )

The following example demonstrates how to use the CustomDataSource builder to bind the Grid helper to oData v4 service. For the full demo, refer to the article on [using the oData Web API controller in the Grid]({% slug howto_useodata4webapicontroller_gridaspnetmvc %}).

    @(Html.Kendo().Grid<KendoUIMVC5.Models.Product>()
        .Name("products")
        .Columns(columns =>
        {
            columns.Bound(e => e.ProductName).Width(200);
            columns.Bound(e => e.ProductID).Width(300);
            columns.Bound(e => e.UnitPrice).Width(300);
            columns.Command(cmd => cmd.Edit()).Width(300);
        })
        .Scrollable()
        .ToolBar(tb => tb.Create())
        .DataSource(dataSource => dataSource
            .Custom()
            .Schema(sch =>
            {
                sch.Model(m=>{
                    m.Id("ProductID");
                    m.Field(f=>f.ProductID).Editable(false);
                    m.Field("UnitPrice", typeof(Decimal));
                });
            })
            .Type("odata-v4")
            .Transport(transport =>
            {
                transport.Read(read => read.Url("/odata/Products").Data("{'$expand': 'Category'}");
            })
            .Events(ev => ev.RequestEnd("onRequestEnd"))
            .PageSize(20)
            .ServerPaging(true)
            .ServerSorting(true)
            .ServerFiltering(true)
        )
    )

## See Also

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Installing Telerik UI for ASP.NET MVC with NuGet]({% slug aspnetmvc_nuget %})
