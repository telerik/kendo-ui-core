---
title: Overview
page_title: Grid Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Grid HtmlHelper for ASP.NET MVC."
slug: overview_gridhelper_aspnetmvc
position: 1
---

# Grid HtmlHelper Overview

The Telerik UI Grid HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Grid widget.

The Grid is a powerful control for displaying data in a tabular format. It provides options for executing data operations, such as paging, sorting, filtering, grouping, and editing, which determine the way the data is presented and manipulated. The Grid supports data binding to local and remote sets of data by using the Kendo UI for jQuery DataSource component.

* [Demo page for the Grid](https://demos.telerik.com/aspnet-mvc/grid)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/grid) demonstrates how to define a Grid by using the Grid HtmlHelper.

## Functionality and Features

* [Advanced configuration]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Data binding]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing]({% slug ajaxediting_grid_aspnetmvc %})
* [Templates]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Excel export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Adaptive rendering]({% slug adaptive_rendering_gridhelper_aspnetmvc %})

## Events

You can subscribe to all Grid [events](/api/grid). For a complete example on basic Grid events, refer to the [demo on using the events of the Grid](https://demos.telerik.com/aspnet-mvc/grid/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .Events(e => e
            .DataBound("grid_dataBound")
            .Change("grid_change")
        )
    %>
    <script>
        function grid_dataBound() {
            // Handle the dataBound event.
        }

        function grid_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Events(e => e
            .DataBound("grid_dataBound")
            .Change("grid_change")
        )
    )
    <script>
        function grid_dataBound() {
            // Handle the dataBound event.
        }

        function grid_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Grid(Model)
          .Name("grid")
          .Events(e => e
              .DataBound(@<text>
                  function() {
                      // Handle the dataBound event inline.
                  }
              </text>)
              .Change(@<text>
                  function() {
                      // Handle the change event inline.
                  }
              </text>)
          )
    )

## Referencing Existing Instances

To reference an existing Kendo UI Grid instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Grid client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) to control its behavior.

    @(Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products)
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(product => product.ProductID);
                columns.Bound(product => product.ProductName);
                columns.Bound(product => product.UnitsInStock);
            })
    )
    <script>
        $(function() {
            // The Name() of the Grid is used to get its client-side instance.
            var grid = $("#grid").data("kendoGrid");
        });
    </script>

## See Also

* [Basic Usage of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid)
* [Using the API of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid/api)
* [Server-Side API](/api/grid)
