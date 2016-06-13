---
title: Custom DataSource
page_title: Custom DataSource | Telerik UI for ASP.NET MVC
description: "Use the CustomDataSource builder available for the Telerik UI for ASP.NET MVC HtmlHelpers."
slug: customdatasource_aspnetmvc
position: 5
---

# Custom DataSource

This article provides information on how to use the CustomDataSource builder available for the Telerik UI for ASP.NET MVC HtmlHelpers that support DataSource.

## Getting Started

### The Basics

The CustomDataSource builder is created to allow a full control over the DataSource options listed in the [client-side API](/api/javascript/data/datasource). By applying the CustomDataSource builder, you benefit from using the MVC wrappers. For example, the wrappers are enabled to generate validation attributes, editors, etc., while utilizing the flexibility of JavaScript. The CustomDataSource builder can also be used in more advanced scenarios where the regular DataSource builders prevent you from fully customizing the options of the DataSource.

### Initial Setup

Using the CustomDataSource builder, even for small customizations, requires additional attention as all predefined settings, introduced by the regular DataSource builders, are removed.

The example below demonstrates how to convert a regular [Grid](http://demos.telerik.com/kendo-ui/grid/index) AjaxDataSourceBuilder to a CustomDataSource builder.

###### Example

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

The example below demonstrates how the CustomDataSourceBuilder equivalent.

###### Example

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

## Common Scenarios

### Function and Object Setup as DataSource Objects

To set a JavaScript function or object as an option for the DataSource, use the `ClientHandlerDescriptor` class.

The example below demonstrates how to set a JavaScript function for the `Read` operation of the Scheduler by utilizing the `ClientHandlerDescriptor` type included in the `Kendo.Mvc` namespace. This class allows code rendering as-is, without the need of string wrapping. In this way the JavaScript functions and objects can be set to apply various options from the CustomDataSource.

###### Example

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

### Model Fields Setup as Functions

The example below demonstrates how to set the default value of the `EmployeeID` field to a JavaScript function. This is applicable in the cases where the default value should be dynamic. For instance, a case when the user inserts a new record while the `EmployeeID` column specifies a filter value different from the default one.

###### Example

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

### Custom DataType CRUD Operations Setup

The example below demonstrates how to bind the Grid to the Kendo UI online demo service that serves `jsonp` data.

To see the full demo, refer to the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}#sample-application).

###### Example

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

The example below demonstrates how to bind the Grid to the oData service.

To see the full demo, refer to the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}#sample-application).

###### Example

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

The example below demonstrates how to use the CustomDataSource builder to bind the Grid wrapper to oData v4 service.

To see the full demo, refer to this [Grid how-to example]({% slug howto_useodata4webapicontroller_gridaspnetmvc %}).

###### Example

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

Other articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [ASP.NET MVC 3]({% slug aspnetmvc3_aspnetmvc %})
* [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
* [ASP.NET MVC 5]({% slug aspnetmvc5_aspnetmvc %})
* [ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
