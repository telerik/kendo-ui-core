---
title: Creating a Dynamic Grid with Batch Editing
description: An example on how enable batch editing with a dynamic {{ site.product }} Grid.
type: how-to
page_title: Create a Dynamic Grid with Batch Editing
slug: grid-dynamic-batch-editing
tags: aspnet, core,  kendo, kendo-ui, grid, edit, custom, popup, template, dynamic, datatable
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

How can I create a dynamic Telerik UI Grid in ASP.NET Core that uses batch editing?

## Solution

The suggested approach demonstrates how to bind a [`DataTable`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable?view=net-6.0) to a Telerik UI Grid and enable the [Batch editing](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/editing/batch#batch-editing). 

1. Populate the Grid columns based on the available `Model.Columns`. `Model.Columns` is the collection of columns of the created `DataTable`.
1. Set the column title by using the [`Caption`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.caption?view=net-6.0) property of the `DataColumn`.
1. Activate the Batch editing: `.DataSource(dataSource => dataSource.Ajax().Batch(true))`.
1. Define the `Model` in the `DataSource` configuration by using the [`ColumnName`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.columnname?view=net-6.0) and [`DataType`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.datatype?view=net-6.0) properties of the `DataColumns`. Also, it is important to set the Model [`Id`](https://docs.telerik.com/aspnet-core/html-helpers/datasource/model#id) to match the [`DataTable` `PrimaryKey`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable.primarykey?view=net-6.0).
1. On the controller side, obtain each of the modified DataTable records by using the [`[Bind(Prefix = "models")]`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.bindattribute.prefix?view=aspnetcore-6.0) attribute.


```Index.cshtml
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("Grid")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn dcolumn in Model.Columns)
            {
                switch (dcolumn.DataType.ToString())
                {
                    case "System.Int16":
                    case "System.Int32":
                    case "System.Int64":
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("Integer");
                        break;

                    case "System.Decimal":
                    case "System.Double":
                    case "System.Float":
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("Number");
                        break;
                    case "System.String":
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("String");
                        break;
                    case "System.Byte":
                    case "System.Boolean":
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("Boolean");
                        break;
                    case "System.DateTime":
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).Format("{0:d}").EditorTemplateName("Date");
                        break;
                    default:
                        columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("String");
                        break;

                }
            }

            columns.Command(command => command.Destroy());
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();
        })
        .Pageable()
        .Sortable()
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Filterable()
        .Groupable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .Batch(true)
                .Model(model =>
                {
                    var id = Model.PrimaryKey[0].ColumnName;
                    model.Id(id);
                    foreach (System.Data.DataColumn column in Model.Columns)
                    {
                        var field = model.Field(column.ColumnName, column.DataType);
                        if (column.ColumnName == id) {
                            field.Editable(false);
                        }

                    }
                })
                .Create(create => create.Action("Customers_Create", "DynamicBatchEditing"))
                .Read(read => read.Action("Customers_Read", "DynamicBatchEditing"))
                .Update(update => update.Action("Customers_Update", "DynamicBatchEditing"))
                .Destroy(destroy => destroy.Action("Customers_Destroy", "DynamicBatchEditing"))
        )
    )
```
```Controller
 public class DynamicBatchEditingController : Controller
    {

        public static DataTable db = new DataTable();
        public ActionResult DynamicBatchEditing()
        {
            db = GetDataTable(50);

            return View(db);
        }


        private DataTable GetDataTable(int howMany)
        {
            DataTable dt = GetDataTableColumns();

            for (int i = 0; i < howMany; i++)
            {
                int index = i + 1;

                DataRow row = dt.NewRow();

                row["OrderID"] = index;
                row["OrderDate"] = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0).AddHours(index);
                row["Freight"] = index * 0.1 + index * 0.01;
                row["ShipName"] = "Name " + index;
                row["ShipCity"] = "City " + index;
                row["ShipCountry"] = "Country " + index;

                dt.Rows.Add(row);
            }

            return dt;
        }
        public ActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(db.ToDataSourceResult(request));
        }

        public ActionResult Customers_Create([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IFormCollection models)
        {
            DataTable editedItemsTable = GetDataTableColumns(); // Gather the table columns.
            for (int x = 0; x < models.Count; x++) // Traverse through each of the models.
            {
                if (models.Keys.Contains("models[" + x + "].OrderID")) // Assert whether the models' keys contains the current record's primary key.
                {
                    int index = x; // Get the current index.
                    DataRow row = editedItemsTable.NewRow(); // Create a new DataRow instance.

                    // Alter the fields.
                    row["OrderID"] = new Random().Next(models.Count, Int32.MaxValue);
                    row["OrderDate"] = models["models[" + index + "].OrderDate"][0];
                    row["Freight"] = models["models[" + index + "].Freight"][0];
                    row["ShipName"] = models["models[" + index + "].ShipName"][0];
                    row["ShipCity"] = models["models[" + index + "].ShipCity"][0];
                    row["ShipCountry"] = models["models[" + index + "].ShipCountry"][0];

                    // Add the newly edited row.
                    editedItemsTable.Rows.Add(row);
                }
            }
            db.Merge(editedItemsTable); // Merge the changes to the existing DataTable.

            return Json(editedItemsTable.ToDataSourceResult(request));
        }

        public ActionResult Customers_Update([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IFormCollection models)
        {
            DataTable editedItemsTable = GetDataTableColumns(); // Gather the table columns.
            for (int x = 0; x < models.Count; x++) // Traverse through each of the models.
            {
                if (models.Keys.Contains("models[" + x + "].OrderID"))
                {
                    int index = x;  // Get the current index.
                    DataRow row = editedItemsTable.NewRow(); // Assert whether the models' keys contains the current record's primary key.

                    // Alter the fields.
                    row["OrderID"] = Int32.Parse(models["models[" + index + "].OrderID"][0]);
                    row["OrderDate"] = models["models[" + index + "].OrderDate"][0];
                    row["Freight"] = models["models[" + index + "].Freight"][0];
                    row["ShipName"] = models["models[" + index + "].ShipName"][0];
                    row["ShipCity"] = models["models[" + index + "].ShipCity"][0];
                    row["ShipCountry"] = models["models[" + index + "].ShipCountry"][0];

                    // Add the newly edited row.
                    editedItemsTable.Rows.Add(row);
                }
            }
            db.Merge(editedItemsTable); // Merge the changes to the existing DataTable.

            return Json(editedItemsTable.ToDataSourceResult(request));
        }
        public ActionResult Customers_Destroy([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IFormCollection models)
        {
            for (int i = 0; i < models.Count; i++) // Traverse through each of the models.
            {

                var primaryKey = db.PrimaryKey[0].ToString(); // Obtain the primary key field name.
                if (models.Keys.Contains($"models[{i}].{primaryKey}")) // Assert whether the currently traversed model's keys contains the primary key field.
                {
                    var itemToBeRemoved = models[$"models[{i}].{primaryKey}"][0]; // Obtain the to-be-removed row index from the primary key field.

                    foreach (DataRow row in db.Rows) // Traverse through each of the DataTable rows.
                    {
                        if (row[db.PrimaryKey[0]].ToString() == itemToBeRemoved) // Assert whether the current row's primary key value is equal to the to-be-removed row index.
                        {
                            db.Rows.Remove(row); // Remove the row.
                            break;
                        }
                    }
                }
            }
            return Json(db.ToDataSourceResult(request));
        }

        private DataTable GetDataTableColumns()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("OrderID", typeof(int)));
            dt.Columns.Add(new DataColumn("OrderDate", typeof(DateTime)));
            dt.Columns.Add(new DataColumn("Freight", typeof(decimal)));
            dt.Columns.Add(new DataColumn("ShipName", typeof(string)));
            dt.Columns.Add(new DataColumn("ShipCity", typeof(string)));
            dt.Columns.Add(new DataColumn("ShipCountry", typeof(string)));
            dt.PrimaryKey = new DataColumn[] { dt.Columns["OrderID"] };
            return dt;
        }
    }
```

For a complete and autonomous example of the aforementioned approach, refer to the following [GitHub example](https://github.com/telerik/ui-for-aspnet-core-examples/commit/1b91810db11092c7e605da2129dafa1e7184f9b1).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/aspnet-core/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Dynamic Batch Editing GitHub Example](https://github.com/telerik/ui-for-aspnet-core-examples/commit/1b91810db11092c7e605da2129dafa1e7184f9b1)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/aspnet-core/knowledge-base)