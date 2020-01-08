---
title: Overview
page_title: HTML Helpers Overview
description: "Learn the basics when working with Telerik UI HTML Helpers for {{ site.framework }}"
previous_url: /aspnetmvc-apps/mvc-6/known-issues, /mvc-6/known-issues, /known-issues
slug: knownissues_aspnetmvc6_aspnetmvc
position: 0
---

# HTML Helpers Overview

The Telerik UI HTML Helpers for {{ site.framework }} enable you to configure the corresponding Kendo UI widgets.

HTML Helpers can be added and further configured through predefined strongly typed attributes and also allow you to handle the events of the widgets in {{ site.framework }} projects.

{% if site.core %}

## Known Issues

* Currently, {{ site.product }} does not support localization resources. For more information and discussion on this issue, refer to [dotnet/coreclr#2007](https://github.com/dotnet/coreclr/issues/2007) and [aspnet/Home/issues/1124](https://github.com/aspnet/Home/issues/1142).
* The current set of helpers is limited and next releases will add more helpers.
* [`Deferred()`](http://docs.telerik.com/aspnet-mvc/getting-started/fundamentals#configuration-Deferred) can be invoked only as a last setting.

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              /* Other configuration. */
              .Deferred()
        )

## Grid Specifics

The Grid does not support server-side rendering. The toolbar template, column header template, and column template are no longer rendered on the server.

## Chart Specifics

| Previous Enum                      | Now                   |
|:---                       |:---                     |
| `ChartAreaStyle`          | `ChartSeriesLineStyle`  |
| `ChartAreaMissingValues`  | `ChartSeriesMissingValues` |
| `ChartBarGradient`        | `ChartSeriesGradient`   |
| `ChartBarLabelsPosition`  | `ChartSeriesLabelsPosition`|
| `ChartFunnelLabelsAlign`  | `ChartSeriesLabelsAlign`|
| `ChartFunnelLabelsPosition`| `ChartSeriesLabelsPosition`|
| `ChartLineMissingValues`  | `ChartSeriesMissingValues`  |
| `ChartLineStyle`          | `ChartSeriesStyle`      |
| `ChartPieLabelsAlign`     | `ChartSeriesLabelsAlign`|
| `ChartPieLabelsPosition`  | `ChartSeriesLabelsPosition`  |
| `ChartPointLabelsPosition`| `ChartSeriesLabelsPosition`  |
| `ChartPolarAreaStyle`     | `ChartSeriesLineStyle`  |
| `ChartPolarLineStyle`     | `ChartSeriesLineStyle`  |
| `ChartRadarAreaStyle`     | `ChartSeriesLineStyle`  |
| `ChartRadarLineStyle`     | `ChartSeriesLineStyle`  |
| `ChartRangeAreaLabelsPosition`     | `ChartSeriesLabelsPosition`  |
| `ChartScatterLineMissingValues` | `ChartSeriesMissingValues`|
| `ChartScatterLineStyle`   | `ChartSeriesStyle`      |

## Editor Specifics

The **Thumbnails** view of the ImageBrowser is not supported because the `System.Drawing` namespace is [not part of {{ site.framework }}](https://blogs.msdn.microsoft.com/dotnet/2016/02/10/porting-to-net-core/). However, you can process images on the server side by using a third-party library.

## See Also

* [Introduction to {{ site.product }}]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

{% else %}

## See Also

* [Introduction to Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})

{% endif %}
