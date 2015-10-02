---
title: Custom DataSource
page_title: Custom DataSource guide for Telerik UI for ASP.NET MVC
description: Using Custom DataSource MVC
position: 7
---

# Custom DataSource
This page described how to use the CustomDataSource builder available for the Telerik UI for ASP.NET MVC helpers that support DataSource. The CustomDataSource builder is created in order to allow full control over the DataSource options listed in the [client-side API](/api/javascript/data/dataSource) - this way the developers can use the benefits from using the MVC wrappers (e.g.: generating the validation attributes, editors etc.) and at the same time utilize the flexibility of JavaScript. It can be used in more advanced scenarios where the regular DataSource builders are restricting the developer from fully customizing the options of the dataSource.

##Using the CustomDataSource builder
Using the CustomDataSource builder even for small customizations require additional attention as all predefined settings set by the regular DataSource builders are removed. Please check the following example of converting  regular Grid AjaxDataSourceBuilder to CustomDataSource builder:

#### Example - Grid with AjaxDataSourceBuilder

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

#### Example - CustomDataSourceBuilder equivalent

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

##Using the ClientHandlerDescriptor class to set JavaScript function or object as option of DataSource
The demo below show how to set JavaScript function for the "Read" operation of the Scheduler by utilizing the "ClientHandlerDescriptor" type included in "Kendo.Mvc" namespace. This class allow rendering of code as-is, without wrapping as string - this way JavaScript functions and objects can be set to various options of the CustomDataSource.

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
                //ClientHandlerDescriptor is special type that allows rendering of code as-is (not as string)
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

##DefaultValue of model fields as function
This example show how to set the default value of the "EmployeeID" field to JavaScript function. This is usable in cases where the default value should be dynamic - for example when the user insert new record while "EmployeeID" column is filtered by value different than the default value.

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

##Setting custom DataType of the Grid DataSource CRUD operations
Example below show how to bind the Grid to Kendo UI online demo service that serve "jsonp" data (full demo is available in [Telerik UI for ASP.NET MVC offline application](/aspnet-mvc/introduction#sample-application)):

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

##Grid binding to oData
This example show how to bind the Grid to oData service (full demo is available in [Telerik UI for ASP.NET MVC offline application](/aspnet-mvc/introduction#sample-application)):

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


##Grid binding to oData v4
Here is an example of using the CustomDataSource builder to bind the Grid wrapper to oData v4 service ([link to the full demo](/aspnet-mvc/helpers/grid/how-to/oData-v4-web-api-controller)):

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