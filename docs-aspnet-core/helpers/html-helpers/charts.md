---
title: Charts
page_title: Charts | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Charts Html helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_charts_aspnetcore
---

# Charts HtmlHelper

The Charts HtmlHelper extension is a server-side wrapper for the [Kendo UI Charts](http://docs.telerik.com/kendo-ui/controls/charts/overview).

The [Kendo UI Charts](http://demos.telerik.com/aspnet-core/) use modern browser technologies to render high-quality data visualizations. All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Canvas](http://www.canvasgfx.com/).

Kendo UI Charts support the following series types:

* Bar and Column
* Line and Vertical Line
* Area and Vertical Area
* Bullet
* Pie and Donut
* Scatter
* Scatter Line
* Bubble
* Radar and Polar

For additional information on new Kendo UI Chart types and features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

For more information on the HtmlHelper, refer to the article on the [Charts HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chart/overview).

## Basic Usage

The following example demonstrates how to define a Bar Chart by using the Chart Html helper.

###### Example

```tab-Razor
   @(Html.Kendo().Chart(Model)
              .Name("internetUsersChart") //The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
              .Title("Internet Users")
              .Series(series => {
                  series.Bar(model => model.Value) //Create a Bar Chart series bound to the "Value" property.
                        .Name("United States");
              })
              .CategoryAxis(axis => axis
                  .Categories(model => model.Year)
              )
    )
```
```tab-Controller
    public ActionResult Index()
        {
            return View(ChartDataRepository.InternetUsers());
        }
```

## Configuration

The following example demonstrates the basic configuration for the Line Chart Html helper.

###### Example

```tab-Razor

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Gross domestic product growth \n /GDP annual %/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .ChartArea(chartArea => chartArea
            .Background("transparent")
        )
        .SeriesDefaults(seriesDefaults =>
            seriesDefaults.Line().Style(ChartSeriesStyle.Smooth)
        )
        .Series(series => {
            series.Line(new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }).Name("India");
            series.Line(new double[] { 1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 }).Name("World");
            series.Line(new double[] { 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 }).Name("Russian Federation");
            series.Line(new double[] { -0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590 }).Name("Haiti");
        })
        .CategoryAxis(axis => axis
            .Categories("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric().Labels(labels => labels.Format("{0}%"))
            .Line(line => line.Visible(false))
            .AxisCrossingValue(-10)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}%")
        )
    )
```

## See Also

* [JavaScript API Reference of the Charts](../../../kendo-ui/api/javascript/dataviz/ui/chart)
* [Charts HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chart/overview)
* [Charts Official Demos](http://demos.telerik.com/)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
