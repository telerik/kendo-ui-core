---
title: Bind Grids to DataTable
page_title: Bind the Grid to DataTable
description: "Bind the Kendo UI Grid to DataTable in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Binding/grid-bind-to-datatable
slug: howto_bindgridtodatatable_gridaspnetmvc
---

# Bind the Grid to DataTable

The following [sample project](#sample-project) demonstrates how to bind the Kendo UI Grid to a DataTable in ASP.NET MVC applications.

> This approach is applicable when binding to any `dynamic` model.

## Sample Project

The sample project example resolves two main issues, which are related to:  

* [Editing](#editing)
* [Aggregates](#aggregates)

To see the complete project, refer to [this repository on GitHub](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable).

### Editing

The Grid does not have an instance to a model object and cannot infer field types. You need to provide the model field definitions yourself.

**Solution**

The metadata of the DataTable contains this information. Pull it into the model definition as illustrated in
[`Index.cshtml`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable/Views/Home/Index.cshtml).

### Aggregates

The aggregates suffer from a lack of type-information as well. The `ToDataSourceResult` helper does not have information about the field types and fails to compute the aggregates on its own.

**Solution**

Provide type-information for the requested aggregates in the `DataSourceRequest` object. For more information on this issue, refer to [`HomeController.cs`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable/Controllers/HomeController.cs).

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridbuilder)
