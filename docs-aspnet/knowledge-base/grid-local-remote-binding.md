---
title: Choosing Between Local and Remote Data Binding in the Grid
description: Understand the key differences between local and remote data binding in Grid for {{ site.framework }} to decide which to use in your application.
type: how-to
page_title: How to Decide Between Local and Remote Data Binding for Grid in {{ site.framework }}
slug: grid-local-remote-binding
tags: grid, aspnetcore, data binding, local data binding, remote data binding
res_type: kb
ticketid: 1658539
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2024.2.514</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>{{ site.product }} Grid</td>
        </tr>
    </tbody>
</table>

## Description
How can I configure the Telerik UI for {{ site.framework }} Grid for local or remote data binding? 

When developing a project with the Grid component, it is essential to understand the differences between local and remote data binding to choose the appropriate method for your project. This article also answers the following questions:

- What is local data binding, and how does it work with the Grid?
- What is remote data binding, and how does it enhance the Grid functionality?
- How do I decide which data binding method to use for Grid in my {{ site.framework }} application?

## Solution

**Local Data Binding** is a method where data is provided to the Grid from the Controller to the View at the initial load. This approach is efficient for small datasets that do not require server-side operations like paging, sorting, or filtering after the initial load. 

Example of Local Data Binding:
```csharp
public ActionResult Local_Data_Binding()
{
    var model = productService.Read();
    return View(model);
}
```
In the View:
```cshtml
@model IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>
@using Kendo.Mvc.UI

@(Html.Kendo().Grid(Model))
```
Local Data Binding is demonstrated [here](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding).


**Remote Data Binding**, in contrast, utilizes AJAX requests to perform server-side operations. This method is suitable for handling large datasets and supports dynamic operations like paging, filtering, sorting, and editing directly on the server, thus reducing the initial load on the client side.

It is important to note that using the .ServerOperation() property Remote binding can function like Local binding:

Example of Remote Data Binding:
```csharp
public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
{
    return Json(GetCustomers().ToDataSourceResult(request));
}
```
In the Grid configuration:
```csharp
.DataSource(dataSource => dataSource
    .Ajax()
    .PageSize(20)
    .ServerOperation(false)
    .Read(read => read.Action("Orders_Read", "Grid"))
)
```
Remote Data Binding is showcased [here](https://demos.telerik.com/{{ site.platform }}/grid/remote-data-binding).

### Decision Criteria

As a verdict, I would highly recommend you to use Remote Data Binding because it supports complex features like Editing without compromising performance.

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

{% if site.core %}
* [Grid for {{ site.framework }} - Local Data Binding Documentation](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/binding/local)
{% else %}
* [Grid for {{ site.framework }} - Local Data Binding Documentation](https://docs.telerik.com/aspnet-mvc/html-helpers/data-management/grid/binding/server-binding#binding-to-the-view-model)
{% endif %}
* [Grid for {{ site.framework }} - Remote Data Binding Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/binding/ajax-binding)

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}


