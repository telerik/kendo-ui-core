---
title: Custom DataSource
page_title: Custom DataSource | Telerik UI for ASP.NET MVC
description: "Use the CustomDataSource builder available for the Telerik UI for ASP.NET MVC HtmlHelpers."
slug: customdatasource_aspnetmvc
position: 4
---

# Custom DataSource

This chapter provides information about how to use the CustomDataSource builder available for the Telerik UI for ASP.NET MVC helpers that support DataSource.

The CustomDataSource builder is created in order to allow full control over the DataSource options listed in the [client-side API](/api/javascript/data/dataSource). By applying the CustomDataSource builder developers benefit from using the MVC wrappers. For example, they can generate validation attributes, editors, etc., while utilizing the flexibility of JavaScript. It can also be used in more advanced scenarios where the regular DataSource builders prevent the developer from fully customizing the options of the DataSource.

###Using the CustomDataSource Builder

Using the CustomDataSource builder, even for small customizations, requires additional attention as all predefined settings, introduced by the regular DataSource builders, are removed. Here is an example for converting a regular Grid AjaxDataSourceBuilder to CustomDataSource builder:

##### Example - [Grid](http://demos.telerik.com/kendo-ui/grid/index) with AjaxDataSourceBuilder:

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

##### Example - CustomDataSourceBuilder equivalent:

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

### Using the `ClientHandlerDescriptor` Class to a Set JavaScript Function or Object as an Option for DataSource

The demo below shows how to set a JavaScript function for the `Read` operation of the Scheduler by utilizing the `ClientHandlerDescriptor` type included in the `Kendo.Mvc` namespace. This class allows code rendering as-is, without the need of string wrapping. In this way the JavaScript functions and objects can be set to apply various options from the CustomDataSource.

##### Example:

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
                url: "http://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp",
                success: function (data) {
                    alert("Data is received");
                    options.success(data);
                }
            });
        }
    </script>

### `DefaultValue` of Model Fields as a Function

The example below demonstrates how to set the default value of the `EmployeeID` field to a JavaScript function. This is applicable in cases where the default value should be dynamic. For example, this is a case when the user inserts a new record while the `EmployeeID` column specifies a filter value different from the default one.

##### Example:

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

### Setting Custom DataType of the Grid DataSource CRUD Operations

The example below shows how to bind the Grid to the Kendo UI online demo service that serves `jsonp` data. [See the full demo](/aspnet-mvc/introduction#sample-application).

##### Example:

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
                   read.Url("http://demos.telerik.com/kendo-ui/service/products")
                       .DataType("jsonp")
                );
                transport.Create(create =>
                   create.Url("http://demos.telerik.com/kendo-ui/service/products/create")
                         .DataType("jsonp")
                );
                transport.Update(update =>
                   update.Url("http://demos.telerik.com/kendo-ui/service/products/update")
                         .DataType("jsonp")
                );
                transport.Destroy(destroy =>
                   destroy.Url("http://demos.telerik.com/kendo-ui/service/products/destroy")
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

### Grid Binding to oData

This example demonstrates how to bind the Grid to the oData service. [See the full demo](/aspnet-mvc/introduction#sample-application).

##### Example:

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
               transport.Read(read => read.Url("http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"))
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


### Grid Binding to oData v4

Here is an example for using the CustomDataSource builder to bind the Grid wrapper to oData v4 service. [See the full demo](/aspnet-mvc/helpers/grid/how-to/oData-v4-web-api-controller).

##### Example:

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
