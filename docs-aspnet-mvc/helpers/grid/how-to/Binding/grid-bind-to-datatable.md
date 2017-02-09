---
title: Bind Grids to DataTable
page_title: Bind the Grid to DataTable | Kendo UI Grid HtmlHelper
description: "Bind the Kendo UI Grid to DataTable in ASP.NET MVC applications."
slug: howto_bindgridtodatatable_gridaspnetmvc
---

# Bind the Grid to DataTable

The following [sample project](#sample-project) demonstrates how to bind the Kendo UI Grid to a DataTable in ASP.NET MVC applications.

> **Important**
>
> This approach is applicable when binding to any `dynamic` model.

## Sample Project

The sample project example resolves two main issues, which are related to:  

* [Editing](#editing)
* [Aggregates](#aggregates)

To see the complete project, refer to [this repository on GitHub](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/binding-to-datatable).

### Editing

The Grid does not have an instance to a model object and cannot infer field types. You need to provide the model field definitions yourself.

**Solution**

The metadata of the DataTable contains this information. Pull it into the model definition as illustrated in
[`Index.cshtml:29`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Views/Home/Index.cshtml#L29).

### Aggregates

The aggregates suffer from a lack of type-information as well. The `ToDataSourceResult` helper does not have information about the field types and fails to compute the aggregates on its own.

**Solution**

Provide type-information for the requested aggregates in the `DataSourceRequest` object. For more information on this issue, refer to [`HomeController.cs:33`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/grid/binding-to-datatable/KendoUIMVC5/Controllers/HomeController.cs#L33).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).
