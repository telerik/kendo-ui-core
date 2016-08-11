---
title: Bind the Grid to DataTable
page_title: Bind the Grid to DataTable | Kendo UI Grid HtmlHelper
description: "Bind the Kendo UI MVC Grid to a DataTable."
slug: howto_bindgridtodatatable_gridaspnetmvc
---

# Bind the Grid to DataTable

The example below demonstrates how to bind the UI for ASP.NET MVC Grid to a DataTable.

> **Important**
>
> This approach is applicable when binding to any `dynamic` model.

## Sample Project

To see the full source code of the sample project on how to bind the Kendo UI MVC Grid to a DataTable, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/binding-to-datatable).

There are two main issues that the sample project solves. They are related to:
* Editing
* Aggregates

### Editing

The Grid does not have an instance to a model object and cannot infer field types. You need to provide the model field definitions yourself.

The DataTable metadata contains this information. Pull it into the model definition as illustrated in
[`Index.cshtml:29`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Views/Home/Index.cshtml#L29).

### Aggregates

The aggregates suffer from a lack of type-information as well. The `ToDataSourceResult` helper does not have information about the field types and fails to compute the aggregates on its own.

**Solution**

Provide type-information for the requested aggregates in the `DataSourceRequest` object. For more information on this issue, refer to [`HomeController.cs:33`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Controllers/HomeController.cs#L33).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
