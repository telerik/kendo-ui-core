---
title: Choosing Between Local and Remote Data Binding in Grid for ASP.NET Core
description: Understand the key differences between local and remote data binding in Grid for ASP.NET Core to decide which to use in your application.
type: how-to
page_title: How to Decide Between Local and Remote Data Binding for Grid in ASP.NET Core
slug: grid-local-remote-binding
tags: grid, aspnetcore, data binding, local data binding, remote data binding
res_type: kb
ticketid: 1658539
---

## Environment

| Product | Grid for ASP.NET |
| --- | --- |
| Version | 2024.2.514 |

## Description

When developing a project with the Grid for ASP.NET Core, it is essential to understand the differences between local and remote data binding to choose the appropriate method for your project. This KB article also answers the following questions:

- What is local data binding and how does it work with the Grid for ASP.NET Core?
- What is remote data binding and how does it enhance Grid functionality?
- How do I decide which data binding method to use for Grid in my ASP.NET Core application?

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
Local Data Binding is demonstrated [here](https://demos.telerik.com/aspnet-core/grid/local-data-binding).


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
Remote Data Binding is showcased [here](https://demos.telerik.com/aspnet-core/grid/remote-data-binding).

### Decision Criteria

As a verdict, I would highly recommend you to use Remote Data Binding because it supports complex features like Editing without compromising performance.

## See Also

- [Grid for ASP.NET Core - Local Data Binding Documentation](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/binding/local-data)
- [Grid for ASP.NET Core - Remote Data Binding Documentation](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/binding/remote-data)
