---
title: Defining Custom HtmlHelper Methods 
page_title: Defining Custom HtmlHelper Methods
description: Learn how to define custom HtmlHelper methods in the Telerik UI for {{ site.framework }}.
slug: define-custom-helper-methods
tags: grid, html, helper, custom, mvc, telerik, pageable, boolean, column, component
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>


## Description

How can I define my own custom HtmlHelper methods for an arbitrary Telerik UI for {{ site.framework }} component?

## Solution

To achieve the desired result:

1. Create a static [`Extension Method`](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) to extend the desired type for the utilized configuration of the component.
1. Within the method, implement the desired logic and return the extended type.
1. From there, reference the extension method within the page in which it will be utilized.
1. Finally, invoke the defined extension method inside the component's configuration.

The following example illustrates how to define a custom HtmlHelper method for the Grid:

```Razor Index.cshtml
    @using TelerikExample.Extensions

    @(Html.Kendo().Grid<OrderViewModel>()
         .Name("grid")
         .Columns(columns =>
         {
             columns.Bound(p => p.Discontinued);
             columns.Bound(p => p.Approved);
         })
         .CustomPageable()
         .DataSource(dataSource => dataSource
             .Ajax()
             .PageSize(20)
             .Read(read => read.Action("Orders_Read", "Grid"))
          )
    )
```
```C# GridExtension.cs
    namespace TelerikExample.Extensions
    {
        public static class GridExtension
        {
            public static GridBuilder<T> CustomPageable<T>(this GridBuilder<T> builder)
                where T : class // Custom method for reusing several configartion methods simulatenously.
            {
                return builder
                    .Pageable(conf =>
                    {
                        conf.PreviousNext(true);
                        conf.Numeric(false);
                        conf.Info(false);
                        conf.Input(true);
                    });
            }
        }
    }
```
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
