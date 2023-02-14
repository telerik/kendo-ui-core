---
title: Create a Dynamic Grid with Popup Editing
description: An example on how to create a custom popup template with a dynamic Telerik UI Grid for ASP.NET Core.
type: how-to
page_title: Create a Dynamic Grid with Popup Editing in ASP.NET Core
slug: grid-dynamic-popup-editing
tags: aspnet, core,  kendo, kendo-ui, grid, edit, custom, popup, template, dynamic, datatable
ticketid: 1511419, 1522079
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

How can I create a dynamic Telerik UI Grid in ASP.NET Core that uses a custom popup editor template?

## Solution

The suggested approach demonstrates how to bind a [`DataTable`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable?view=net-6.0) to a Telerik UI Grid and enable the [Popup editing](https://demos.telerik.com/aspnet-core/grid/editing-popup). 

1. Populate the Grid columns based on the available `Model.Columns`. `Model.Columns` is the collection of columns of the created `DataTable`.
1. Set the column title by using the [`Caption`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.caption?view=net-6.0) property of the `DataColumn`.
1. Activate the Popup editing and specify the name of the custom Popup template: `.Editable(ed => ed.Mode(GridEditMode.PopUp).TemplateName("DynamicPopupEditor"))`.
1. Define the `Model` in the `DataSource` configuration by using the [`ColumnName`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.columnname?view=net-6.0) and [`DataType`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.datatype?view=net-6.0) properties of the `DataColumns`. Also, it is important to set the Model [`Id`](https://docs.telerik.com/aspnet-core/html-helpers/datasource/model#id) to match the [`DataTable` `PrimaryKey`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable.primarykey?view=net-6.0).
1. Store the [`DataTable` `Columns`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable.columns?view=net-6.0) in `ViewData["modelData"]` to initialize the editors in the Popup form. For more information, refer to [the `Controller` in the GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/69137d5d7163206454d73ea1f1dbf40a42028237/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Controllers/Grid/DynamicPopupEditingController.cs#L18).
1. Create a View for the editor template in the `~/Views/Shared/EditorTemplates` folder. Ensure that the name of the View matches the `TemplateName` specified in the `.Editable()` option.
1. Define an editor for each data type in the editor template and bind the editor to the `Model` property by using the `data-bind` attribute, that is, `.HtmlAttributes(new { data_bind= $"value: {dcolumn.ColumnName}" })`.



```View
@model System.Data.DataTable
@(Html.Kendo().Grid<dynamic>()
    .Name("Grid")
    .Columns(columns =>
    {
        foreach (System.Data.DataColumn dcolumn in Model.Columns) //Loop through the DataColumns.
        {
            switch (dcolumn.DataType.ToString())
            {
                case "System.DateTime":
                    columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).Format("{0:d}"); //If the column DataType is "DateTime", format the date by using the Format() method.
                    break;
                default:
                    columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption);
                    break;
            }
        }
        columns.Command(com => com.Edit());
    })
    .Pageable()
    .Sortable()
    .Editable(ed => ed.Mode(GridEditMode.PopUp).TemplateName("DynamicPopupEditor")) //Specify the name of the custom Popup template ("~/Views/Shared/EditorTemplates/DynamicPopupEditor.cshtml").
    .Filterable()
    .Groupable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model =>
        {
            var id = Model.PrimaryKey[0].ColumnName;
            model.Id(id); //Set the Model Id
            foreach (System.Data.DataColumn column in Model.Columns)
            {
                var field = model.Field(column.ColumnName, column.DataType);
                if (column.ColumnName == id) {
                    field.Editable(false);
                }
            }
        })
        .Read(read => read.Action("Customers_Read", "DynamicPopupEditing"))
        .Update(read => read.Action("Customers_Update", "DynamicPopupEditing"))
    )
)
```
```Controller
    public class DynamicPopupEditingController : Controller
    {
        public static DataTable db = new DataTable();
        public IActionResult DynamicPopupEditing()
        {
            db = GetDataTable(50);
            List<System.Data.DataColumn> columnData = new List<System.Data.DataColumn>();
            foreach(System.Data.DataColumn colData in db.Columns)
            {
                columnData.Add(colData);
            }
            ViewData["modelData"] = columnData;
            return View(db);
        }

        public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(db.ToDataSourceResult(request));
        }
    }
```
```EditorTemplate
    <div class="k-edit-form-container">
        @{ foreach (System.Data.DataColumn dcolumn in ViewData["modelData"] as IList<System.Data.DataColumn>) //Loop through the DataColumns and create the editors based on the column DataType.
            {
                <div class="k-edit-label">
                    <label for="@dcolumn.ColumnName">@dcolumn.ColumnName</label>
                </div>
                switch (dcolumn.DataType.ToString())
                {
                    case "System.Int16":
                    case "System.Int32":
                    case "System.Int64":
                        bool eidtor_enabled = true;
                        if(dcolumn.ColumnName == "OrderID")
                        {
                            eidtor_enabled = false;
                        }
                        <div class="k-edit-field">
                            @(Html.Kendo().IntegerTextBox()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { data_bind= $"value: {dcolumn.ColumnName}" })
                                .Min(int.MinValue)
                                .Max(int.MaxValue)
                                .Enable(eidtor_enabled)
                            )
                        </div>
                        break;
                    case "System.Decimal":
                    case "System.Double":
                    case "System.Float":
                        <div class="k-edit-field">
                            @(Html.Kendo().NumericTextBox()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { style = "width:100%", data_bind = $"value: {dcolumn.ColumnName}" })
                            )
                        </div>
                        break;
                    case "System.String":
                        <div class="k-edit-field">
                            @(Html.Kendo().TextBox()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { style = "width:100%", data_bind = $"value: {dcolumn.ColumnName}" })
                            )
                        </div>
                        break;
                    case "System.Byte":
                    case "System.Boolean":
                        <div class="k-edit-field">
                            @(Html.Kendo().CheckBox()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { style = "width:100%", data_bind = $"checked: {dcolumn.ColumnName}" })
                            )
                        </div>
                        break;
                    case "System.DateTime":
                        <div class="k-edit-field">
                            @(Html.Kendo().DateTimePicker()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { style = "width:100%", data_bind = $"value: {dcolumn.ColumnName}" })
                            )
                        </div>
                        break;
                    default:
                        <div class="k-edit-field">
                            @(Html.Kendo().TextBox()
                                .Name($"{dcolumn.ColumnName}")
                                .HtmlAttributes(new { style = "width:100%", data_bind = $"value: {dcolumn.ColumnName}" })
                            )
                        </div>
                        break;
                }
            }
        }
    </div>
```


For the complete implementation of the suggested approach, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/69137d5d7163206454d73ea1f1dbf40a42028237/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/DynamicPopupEditing.cshtml).

