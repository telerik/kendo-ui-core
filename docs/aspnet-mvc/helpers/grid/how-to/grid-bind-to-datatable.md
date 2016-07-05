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

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Apply Custom Row Styles Based on Model Data]({% slug howto_applycustomrrowstylesmodeldata_gridaspnetmv %})
* [How to Bind the Grid to the SignalR Hub]({% slug howto_bindgridtosignalrhub_gridaspnetmv %})
* [How to Export Grid Data in PDF]({% slug howto_exportonpdf_gridaspnetmv %})
* [How to Export Grid Data to CSV Files]({% slug howto_exportgriddatacsvfile_gridaspnetmv %})
* [How to Export Grid Data to Excel]({% slug howto_exportgriddataasexceldocs_gridaspnetmv %})
* [How to Handle Unauthorized Requests with Ajax-Bound Grids]({% slug howto_handleunathorizedrequestsajaxbound_gridaspnetmv %})
* [How to Post Grid Data with Form]({% slug howto_postgriddatawithform_gridaspnetmv %})
* [How to Post Grid Selection to Server]({% slug howto_postselectiontoserver_gridaspnetmv %})
* [How to Preserve the Grid Server Toolbar Template after Using setOptions]({% slug howto_preserveservertemplateaftersetoptions_gridaspnetmv %})
* [How to Use Custom JsonResult with Ajax-Bound Grids]({% slug howto_usecustomjsonresultajaxbound_gridaspnetmvc %})
* [How to Use Grid Hierarchy with Dynamic Model Loading and DataTable]({% slug howto_usegridhierarchydynamicmodelload_gridaspnetmv %})
* [How to Use Grid Self-Referencing Hierarchy]({% slug howto_usegridselfrefhierarchy_gridaspnetmv %})
* [How to Use oData v4 with WebAPI Controller]({% slug howto_useodata4webapicontroller_gridaspnetmvc %})
* [How to Use the Sortable to Reorder Grid Rows]({% slug howto_usesortabletoreorder_gridaspnetmv %})
* [How to Use UTC on Both Client and Server]({% slug howto_useutctimeonclientandserver_gridaspnetmv %})

For more runnable examples on the Kendo UI Grid HtmlHelper, browse the [how-to section of articles]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
