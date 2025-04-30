---
title: Bind Grid to DataTable
page_title: Bind the Grid to DataTable
description: "Bind the {{ site.product }} Grid to a DataTable in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Binding/grid-bind-to-datatable, /html-helpers/data-management/grid/how-to/Binding/grid-bind-to-datatable
slug: howto_bindgridtodatatable_gridaspnetmvc
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I bind the Grid to a [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable?view=net-9.0)?

## Solution

To bind the Grid to a `DataTable`, you need to configure the Grid's DataSource to read from the `DataTable` and set up the necessary columns and properties.

> This approach is applicable when binding to any `dynamic` model.

The example relies on the following key steps:

1. Define the View's model as `System.Data.DataTable` and set up the Grid columns based on the `DataTable` columns. Also, using the same approach as for the columns, define the fields in the `Model` configuration of the DataSource.

    ```HtmlHelper
    @using Kendo.Mvc.UI
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("Grid")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn column in Model.Columns)
            {
                var c = columns.Bound(column.ColumnName);
            }
            columns.Command(cmd=>cmd.Edit());
        })
        .Pageable()
        .Sortable()
        .Editable(ed=>ed.Mode(GridEditMode.PopUp))
        .Filterable()
        .Groupable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                var id = Model.PrimaryKey[0].ColumnName;
                model.Id(id);
                foreach (System.Data.DataColumn column in Model.Columns)
                {
                    var field = model.Field(column.ColumnName, column.DataType);
                    if (column.ColumnName == id)
                    {
                        field.Editable(false);
                    }

                }
            })
            .Read(read => read.Action("Read", "Home"))
            .Update(update => update.Action("Update", "Home"))
        )
    )
    ```

1. Populate the `DataTable` with the respective data and pass it to the View. 

    ```C#
    public ActionResult Index()
    {
        DataTable products = Products();

        return View(products);
    }

    private DataTable Products()
    {
        var connection = ConfigurationManager.ConnectionStrings["GridBindingDataTableEntities"].ConnectionString;
        using (var dataAdapter = new SqlDataAdapter("SELECT * from Products", connection))
        {
            var dataTable = new DataTable();

            dataAdapter.Fill(dataTable);
            dataAdapter.FillSchema(dataTable, SchemaType.Mapped);
            return dataTable;
        }
    }
    ```

## Sample Project

To review the complete project, refer to [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master).

The sample project resolves two main issues related to:  

* [Editing](#editing)
* [Aggregates](#aggregates)

### Editing

The Grid does not have an instance to a model object and cannot infer field types. You need to provide the model field definitions yourself.

**Solution**

The metadata of the `DataTable` contains this information. Pull it into the model definition as illustrated in
[`Index.cshtml`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable/Views/Home/Index.cshtml).

### Aggregates

The aggregates suffer from a lack of type-information as well. The `ToDataSourceResult` method  does not have information about the field types and fails to compute the aggregates.

**Solution**

Provide type-information for the requested aggregates in the `DataSourceRequest` object. For more information, refer to [`HomeController.cs`](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDataTable/Controllers/HomeController.cs).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
