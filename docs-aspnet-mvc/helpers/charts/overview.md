---
title: Overview
page_title: Charts Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Chart HtmlHelper for ASP.NET MVC."
slug: overview_charthelper_aspnetmvc
position: 1
---

# Charts HtmlHelper Overview

The Telerik UI Chart HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Chart widget.

The Chart uses modern browser technologies to render high-quality data visualizations. All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Canvas](http://www.canvasgfx.com/). The Charts support a set of series types such as Bar, Line, Area, Bullet, Pie, Scatter, Bubble, Polar, and other.

* [Demo page for the Chart](https://demos.telerik.com/aspnet-mvc/chart-api)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/bar-charts) demonstrates how to define a Bar Chart by using the Chart HtmlHelper.

## Functionality and Features

* [Data binding]({% slug ajaxbinding_charthelper_aspnetmvc %}).
* [Scaffolding]({% slug scaffoldingchart_aspnetmvc %}).

## Events

You can subscribe to all Chart [events](/api/chart). For a complete example on basic Chart events, refer to the [demo on using the events of the Chart](https://demos.telerik.com/aspnet-mvc/chart-api/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Chart(Model)
            .Name("internetUsersChart")
            .Events(e => e
                .DataBound("internetUsersChart_dataBound")
                .SeriesClick("internetUsersChart_seriesClick")
            )
    %>

    <script>
        function internetUsersChart_dataBound() {
            // Handle the dataBound event.
        }

        function internetUsersChart_seriesClick() {
            // Handle the series click event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Chart(Model)
        .Name("internetUsersChart")
        .Events(e => e
            .DataBound("internetUsersChart_dataBound")
            .SeriesClick("internetUsersChart_seriesClick")
        )
    )

    <script>
        function internetUsersChart_dataBound() {
            // Handle the dataBound event.
        }

        function internetUsersChart_seriesClick() {
            // Handle the seriesClick event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().Chart(Model)
        .Name("internetUsersChart")
        .Events(e => e
            .DataBound(@<text>
                    function() {
                        // Handle the dataBound event inline.
                    }
            </text>)
            .SeriesClick(@<text>
                    function() {
                        // Handle the seriesClick event inline.
                    }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Chart instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Chart client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart) to control its behavior.

    // Place the following after the Chart for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Chart is used to get its client-side instance.
            var chart = $("#internetUsersChart").data("kendoChart");
        });
    </script>

## See Also

* [Using the API of the Chart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/chart-api/index)
* [Basic Usage of the Bar Chart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/bar-charts/index)
* [Basic Usage of the Line Chart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/line-charts/index)
* [Server-Side API](/api/chart)
