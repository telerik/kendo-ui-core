---
title: Dynamic Grid with Popup Editing
description: An example on how to create a custom Popup template with dynamic grid.
type: how-to
page_title: Dynamic Grid with Popup Editing in ASP.NET Core
slug: grid-dynamic-popup-editing
tags: aspnet, core,  kendo, kendo-ui, grid, edit, custom, popup, template, dynamic
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

How to create a dynamic Telerik UI Grid in ASP.NET Core that uses a custom Popup editor template?

## Solution


```View
@model System.Data.DataTable
@(Html.Kendo().Grid<dynamic>()
    .Name("Grid")
    .Columns(columns =>
    {
        foreach (System.Data.DataColumn dcolumn in Model.Columns) //loop through the DataColumns
        {
            switch (dcolumn.DataType.ToString())
            {
                case "System.DateTime":
                    columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).Format("{0:d}"); //If the column DataType is "DateTime", format the date by using the Format() method
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
    .Editable(ed => ed.Mode(GridEditMode.PopUp).TemplateName("DynamicPopupEditor")) //Specify the name of the custom Popup template ("~/Views/Shared/EditorTemplates/DynamicPopupEditor.cshtml")
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
        @{ foreach (System.Data.DataColumn dcolumn in ViewData["modelData"] as IList<System.Data.DataColumn>) //Loop through the DataColumns and create the editors based on the column DataType
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
For the complete implementation refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/69137d5d7163206454d73ea1f1dbf40a42028237/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/DynamicPopupEditing.cshtml).

