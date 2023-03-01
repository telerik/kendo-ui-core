---
title: Helpers Overview
page_title: Helpers Overview
description: "Learn the basics when working with Telerik UI Helpers for {{ site.framework }}"
previous_url: /aspnetmvc-apps/mvc-6/known-issues, /mvc-6/known-issues, /known-issues
slug: knownissues_aspnetmvc6_aspnetmvc
position: 0
---
{% if site.mvc %}
# HTML Helpers Overview

The Telerik UI HTML Helpers for {{ site.framework }} are server-side wrappers that enable you to use and configure the <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery components</a> in an {{ site.framework }} application.

You can add HTML Helpers to your application and then configure them further by using predefined strongly typed attributes. Most of the components expose events, which you can handle by using the `Events` configuration of the helpers.  

## Components vs. Helpers

The following list describes how the {{ site.framework }} helpers differ from the Kendo UI components.

The Telerik UI for {{ site.framework }} HTML helpers:

* Allow you to create components with no HTML and JavaScript coding.
* Provide for server-side data binding and, in some cases, server-side rendering.
* Allow you to use the `ToDataSourceResult()` extension method for binding to server-side collections and for performing data operations (paging, sorting, filtering, and grouping).
* Provide integration with some {{ site.framework }} features such as security trimming and editor templates.
* Support unobtrusive validation based on Data Annotation attributes.
* Enable a simple implementation of CRUD operations.
* Support Visual Studio IntelliSense for the server-side configuration syntax.
* Enable Visual Studio Extensions for automatic creation of new {{ site.product }} applications and for automatic updating of the Telerik UI version.
* Enable you to use scaffolding to generate component declarations and related controller action methods.

The <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery components</a> components:

* Allow for a complete server-platform independence.
* Provide full control over the placement of the initialization scripts.
* Support the integration with the [MVVM](https://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](https://docs.telerik.com/kendo-ui/framework/AngularJS/introduction), and [Single-Page Application](https://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns.
* Support [Visual Studio IntelliSense](https://docs.telerik.com/kendo-ui/third-party/vs-intellisense) for the client-side API.

## See Also

* [Introduction to Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug downloadinstall_aspnetcore %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})

{% else %}
# Tag and HTML Helpers Overview

The Telerik UI Tag and HTML Helpers for {{ site.framework }} are server-side wrappers that enable you to use and configure the <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery components</a> in an {{ site.framework }} application. Both helper flavors offer the same functionality, and you can choose which one to use depending on your preferences. 

You can add the desired Tag or HTML Helpers to your application and then configure them further by using predefined strongly typed attributes. The helpers also allow you to handle the events of the components in your {{ site.framework }} projects.

## Components vs. Helpers

The following list describes how the {{ site.product_short }} helpers differ from the Kendo UI components.

The {{ site.product_short }} helpers:

* Allow you to create components with no HTML and JavaScript coding.
* Provide for server-side data binding and, in some cases, server-side rendering.
* Allow you to use the `ToDataSourceResult()` extension method for binding Kendo UI components to server-side collections and for performing data operations (paging, sorting, filtering, and grouping).
* Provide integration with some {{ site.framework }} features such as security trimming and editor templates.
* Support unobtrusive validation based on Data Annotation attributes.
* Enable a simple implementation of CRUD operations.
* Support Visual Studio IntelliSense for the server-side configuration syntax.
* Enable Visual Studio Extensions for automatic creation of new {{ site.product }} applications and for automatic updating of the Telerik UI version.
* Enable you to use scaffolding to generate component declarations and related controller action methods.

The <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery components</a> components:

* Allow for a complete server-platform independence.
* Provide full control over the placement of the initialization scripts.
* Support the integration with the [MVVM](https://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](https://docs.telerik.com/kendo-ui/framework/AngularJS/introduction), and [Single-Page Application](https://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns.
* Support [Visual Studio IntelliSense](https://docs.telerik.com/kendo-ui/third-party/vs-intellisense) for the client-side API.

## Known Issues

* Tag Helpers might need to be disabled on pages where components render custom content&mdash;for example, the Button, Editor, Splitter, Tooltip, or Window. Some Tag Helpers, such as the `href` one, are processed automatically and result in invalid HTML.

        @removeTagHelper "*, Microsoft.AspNet.Mvc.Razor"
        @removeTagHelper "*, Microsoft.AspNetCore.Mvc.Razor"

* The `TagMode` enum of the MultiSelect is now renamed to `MultiSelectTagMode`.
* [`Deferred()`]({% slug fundamentals_core%}#deferred-initialization) can be invoked only as a last setting.

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              /* Other configuration. */
              .Deferred()
        )

* The Grid does not support server-side rendering as available in Telerik UI for ASP.NET MVC. The toolbar template, column header template, and column template are no longer rendered on the server.

* Some changes were introduced with the Enum naming in {{site.product}} Charts:

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

* The **Thumbnails** view of the {{site.product_short}} Editor's ImageBrowser is not supported because the `System.Drawing` namespace is [not part of {{ site.framework }}](https://blogs.msdn.microsoft.com/dotnet/2016/02/10/porting-to-net-core/). However, you can process images on the server side by using a third-party library.

## See Also

* [Introduction to {{ site.product }}]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% endif %}
