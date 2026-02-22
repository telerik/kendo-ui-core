---
title: Defining Custom HtmlHelpers
description: Learn how to create a custom HtmlHelper that extends the {{ site.product }} Grid and accepts additional configuration options.
type: how-to
page_title: Defining Custom HtmlHelpers
previous_url: /how-to/define-custom-helper-methods-for-mvc
slug: define-custom-helpers
tags: grid, htmlhelper, custom, component, extend, telerik, core, mvc
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I define a custom HtmlHelper that accepts additional configuration options by extending an arbitrary {% if site.core %}[Telerik UI for {{ site.framework }} component](https://www.telerik.com/aspnet-core-ui){% else %}[Telerik UI for {{ site.framework }} component](https://www.telerik.com/aspnet-mvc){% endif %}?

## Solution

This example shows how to define a custom HtmlHelper named **MyGrid** by extending the [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) component.

1. Define a static [`Extension Method`](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) to extend the Grid configuration.
1. Add the desired options to the method and return the extended type.
1. From there, reference the extension method within the page where the component will be utilized.

{% if site.core %}
```C# MyGridHelper.cs
    namespace Telerik.Examples.Mvc.Areas.DefineCustomHtmlHelper.Helpers
    {
        public static class MyGridHelper
        {
            public static Kendo.Mvc.UI.Fluent.GridBuilder<T> MyGrid<T>(this IHtmlHelper<dynamic> helper, string name)
                where T : class
            {
                return helper.Kendo().Grid<T>()
                    .Name(name)
                    .Groupable()
                    .Sortable()
                    .Scrollable()
                    .Filterable()
                    .Pageable();
            }
        }
    }
```
{% else %}
```C# MyGridHelper.cs
    namespace Telerik.Examples.Mvc.Areas.DefineCustomHtmlHelper.Helpers
    {
        public static class MyGridHelper
        {
            public static Kendo.Mvc.UI.Fluent.GridBuilder<T> MyGrid<T>(this HtmlHelper helper, string name)
                where T : class
            {
                return helper.Kendo().Grid<T>()
                    .Name(name)
                    .Groupable()
                    .Sortable()
                    .Scrollable()
                    .Filterable()
                    .Pageable();
            }
        }
    }
```
{% endif %}
```Razor Index.cshtml
    @using Telerik.Examples.Mvc.Areas.DefineCustomHtmlHelper.Helpers

    @(Html.MyGrid<Telerik.Examples.Mvc.Areas.DefineCustomHtmlHelper.Models.OrderViewModel>("Grid1")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID).Filterable(false);
            columns.Bound(p => p.Freight);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity);
        })
        .HtmlAttributes(new { style = "height:550px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Home"))
        )
    )
```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/DefineCustomHtmlHelper) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)