---
title: Setting the NoRecords Template from the Controller
description: An example on how to set the NoRecords template message from the server in the {{ site.product }} Grid.
type: how-to
page_title: Use Controller for the NoRecords Template
slug: grid-norecords-template-controller-server-viewdata
tags: grid, norecords, template, controller, server, viewdata
ticketid: 1398515
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® {{ site.product_short }} Grid</td>
 </tr>
  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I set the `NoRecords` template message to content from the controller?

## Solution

1. Use a [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview.html) and pass the text by using the [`ViewData` setting of the controller](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller.viewdata?view=aspnetcore-2.2).
1. Configure the [`NoRecords` `TemplateID` of the Grid](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridnorecordssettingsbuilder) with the ID of the Kendo UI Template.

```css
<style>
    .mystyle {
        color: red;
        font-size: 26px;
    }
</style>
```

```javascript
<div>
    @(Html.Kendo().Grid<NoRecordsExample.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID).Filterable(false);
            columns.Bound(p => p.Freight);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity);
        })
        .Pageable()
        .NoRecords(e => e.TemplateId("myTemplate"))
        .Sortable()
        .Scrollable()
        .Filterable()
        .HtmlAttributes(new { style = "height:550px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
</div>

<script type="text/x-kendo-template" id="myTemplate">
    <div class="mystyle">@ViewData["NoRecords"]</div>
</script>
```

```c#
public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["NoRecords"] = "Custom No Data Message";
        return View();
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

* [Overview of the Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview.html)
* [Official Microsoft Documentation of ViewData](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller.viewdata?view=aspnetcore-2.2)
* [API Reference of Kendo.Mvc.UI.Fluent.GridNoRecordsSettingsBuilder](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridnorecordssettingsbuilder)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
