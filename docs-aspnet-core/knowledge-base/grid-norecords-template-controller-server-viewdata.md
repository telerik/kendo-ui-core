---
title: Set the NoRecords Template from Controller
description: An example demonstrating how to set the NoRecords Template message from the server.
type: how-to
page_title: Use Controller for NoRecords Template  | Kendo UI Grid
slug: grid-norecords-template-controller-server-viewdata
tags: grid, norecords, template, controller, server, viewdata
ticketid: 1398515
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I set the NoRecords Template message to content from the controller?

## Solution

Using a [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview.html), pass the text using the [controller's ViewData](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller.viewdata?view=aspnetcore-2.2).  Then, configure the [Kendo UI Grid's NoRecords TemplateID](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridNoRecordsSettingsBuilder) with the ID of the Kendo UI Template.

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

## See Also

* [Kendo UI Templates - Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview.html)
* [ViewData - Microsoft Documentation](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller.viewdata?view=aspnetcore-2.2)
* [Kendo.Mvc.UI.Fluent.GridNoRecordsSettingsBuilder - API Reference](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridNoRecordsSettingsBuilder)
