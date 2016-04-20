---
title: Bind the Kendo UI MVC Grid to a DataTable
Page_title: Bind the Kendo UI MVC Grid to a DataTable
description: Bind the Kendo UI MVC Grid to a DataTable
slug: howto_bindgridtodatatable_gridaspnetmvc
---

# Bind the Kendo UI MVC Grid to a DataTable

This project demonstrates how to bind the UI for ASP.NET MVC Grid to a DataTable.

> The same approach is applicable when binding to any `dynamic` model.

## Sample project

The full source code of the sample project is available on GitHub:
[Bind the Kendo UI MVC Grid to a DataTable](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/binding-to-datatable)

## Problems
There are two main problems that this sample solves.

### Editing

The Grid does not have an instance to a model object and cannot infer field types.
We need to provide the model field definitions ourselves.

The DataTable metadata contains this information.
We can pull it into the model definition as illustrated in
[Index.cshtml:29](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Views/Home/Index.cshtml#L29)

### Aggregates

The aggregates suffer from lack of type information as well. The ToDataSourceResult helper does not have information about the field types and fails to compute the aggregates on its own.

The solution is to provide type information for the requested aggregates in the DataSourceRequest object. See [HomeController.cs:33](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Controllers/HomeController.cs#L33)
