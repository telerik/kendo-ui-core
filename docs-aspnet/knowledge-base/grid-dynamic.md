---
title: Dynamic Grid
description: An example on how to bind the grid to a DataTable with dynamic title and Editors and in Razor Pages.
type: how-to
page_title: Dynamic Grid in ASP.NET Core
slug: grid-dynamic
tags: aspnet, core,  kendo, kendo-ui, grid, edit, operations, caption, title, dynamic, datatype, razor, page
ticketid: 1455029, 1497302, 1479749, 1478314, 1455574
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

I am trying to bind a DataTable to a ASP.NET Kendo Grid. The main reason for this is that the grid needs to be dynamic with a different number of columns etc. Although I've seen an example of this is MVC, I can't get this to work in ASP.NET Core. I need help with

1. [Basic dynamic grid binding to DataTable](#basic-dynamic-binding)
1. [Dynamic name of column as per model value from backend](#dynamic-column-titles)
1. [Dynamic editing](#dynamic-editing)
1. [Bind to a DataTable in a Razor page](#dynamic-grid-in-razor-page)

## Solution

### Basic Dynamic Binding

```View
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("Grid")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn column in Model.Columns)
            {
                var c = columns.Bound(column.ColumnName);
            }
        })
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                foreach (System.Data.DataColumn column in Model.Columns)
                {
                    var field = model.Field(column.ColumnName, column.DataType);
                }
            })
            .Read(read => read.Action("Customers_Read", "Grid"))
        )
    )
```
```Controller
    public IActionResult Index()
    {
    	DataTable products = GetDataTable(500);
    
    	return View(products);
    }

    private static DataTable GetDataTable(int howMany)
    {
        var dataSource = new DataTable();
        dataSource.Columns.Add("Field1");
        dataSource.Columns.Add("Field2", typeof(int));
        for (int i = 0; i < howMany; i++)
        {
            dataSource.Rows.Add("value" + i, i);
        }
        return dataSource;
    }

    public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
    {
    	return Json(GetDataTable(500).ToDataSourceResult(request));
    }
```

### Dynamic Column Titles

- The `System.Data.DataColumn` has a [`Caption`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.caption?view=netcore-3.1#System_Data_DataColumn_Caption) property that can be used to dynamically change the tile of the columns:

```
    .Columns(columns =>
    {
        foreach (System.Data.DataColumn column in Model.Columns)
        {
            var c = columns.Bound(column.ColumnName).Title(column.Caption);
        }
    })
```

### Dynamic Editing

Since the dynamic editing is not part of the official built-in options which utilized strongly typed models for ASP.NET Core, there are different solutions that can be applied. For a runnable example go to the [examples repository](https://github.com/telerik/ui-for-aspnet-core-examples). [View.cshtml](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/Dynamic.cshtml) and [Controller](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Controllers/Grid/DynamicController.cs).

The first thing is to add the model Id - the primary key of the table and define the editors based on the column types:

```
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
```

1. You can use `IFormCollection` to intecept the updated item.

    ```Inline_Popup
        public IActionResult Customers_Update([DataSourceRequest] DataSourceRequest request, IFormCollection data)
    ```
    ```InCell
        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IFormCollection models)
    ```
    ```Controller_Inline_Popup
        public static DataTable db = new DataTable();
        public IActionResult Index()
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
        public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(db.ToDataSourceResult(request));
        }

        public IActionResult Customers_Update([DataSourceRequest] DataSourceRequest request, IFormCollection data)
        {
            var dt = GetDataTableColumns();
            var updatedRow = dt.NewRow();
            for (int i = 0; i < db.Rows.Count; i++)
            {
                var itemToBeUpdatedId = data[db.PrimaryKey[0].ToString()][0];
                var row = db.Rows[i];
                if (row[db.PrimaryKey[0]].ToString() == itemToBeUpdatedId)
                {
                    for (var j = 0; j < db.Columns.Count; j++) 
                    {
                        if(data[db.Columns[j].ColumnName][0] != null)
                        { 
                            TypeConverter typeConverter = TypeDescriptor.GetConverter(db.Columns[j].DataType);
                            row[db.Columns[j].ColumnName] = typeConverter.ConvertFromString(data[db.Columns[j].ColumnName][0]);
                            updatedRow[db.Columns[j].ColumnName] = row[db.Columns[j].ColumnName];
                        }
                    }

                }
            }
            return Json(dt.ToDataSourceResult(request));
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
    ```

1. Alternatively, you can post the model and values to the controller in a preferred format for you, so that you can process them on the server and update the corresponding table accordingly.

For example in a grid with inline editing shared by another programmer with us:

```View
    // grid Save event and editable mode
    .Events(events => events.Save("savePopUpChange"))
    .Editable(ed=>ed.Mode(GridEditMode.PopUp)) 

    // data source Update method with additional data sent
    .Update(update => update.Action("Metadata_Update", "KendoGrid").Data("updateValuesData"))

    <script>  
        var keyValueList = [];
        function savePopUpChange(e) {     
            keyValueList.push(keyValuePair);
            var inputs = e.container.find("input");
            for (var i = 0; i < inputs.length; i++) {
                var element = inputs[i];
                var keyValuePair = element.name + ":" + element.value;
                keyValueList.push(keyValuePair);
            }
        }
    
        function updateValuesData(e) {
            return { keyValueList: keyValueList.join("|") }
        }
    </script>
```
```Controller
    [AcceptVerbs(HttpVerbs.Post)]
    public ActionResult Metadata_Update([DataSourceRequest] DataSourceRequest request, string keyValueList)
    {
        var list = keyValueList.Split('|');
        //server side saving   
        return result;
    } 
```

To define editors based on a condition, you can use a switch case as shown below

```
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("gridMetadata")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn dcolumn in Model.ViewDataTable.Columns)
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
            columns.Command(command =>  {command.Edit();});
        }).

```

## Dynamic Grid In Razor Page

```Index.cshtml
    <script>
        function sendTokens() {
            return kendo.antiForgeryTokens();
        }
    </script>

    @(Html.Kendo().Grid<dynamic>()
        .Name("Grid")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn column in Model.DataTable.Columns)
            {
                var c = columns.Bound(column.ColumnName);
            }
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                foreach (System.Data.DataColumn column in Model.DataTable.Columns)
                {
                    var field = model.Field(column.ColumnName, column.DataType);
                }
            })
            .Read(read => read.Url("/Customer?handler=Read").Data("sendTokens"))
        )
    )
```
```Index.cshtml.cs

    public DataTable DataTable { get; set; }

    public void OnGet()
    {
        DataTable = GetDataTable(500);
    }

    private static DataTable GetDataTable(int howMany)
    {
        var dataSource = new DataTable();
        dataSource.Columns.Add("Field1");
        dataSource.Columns.Add("Field2", typeof(int));
        for (int i = 0; i < howMany; i++)
        {
            dataSource.Rows.Add("value" + i, i);
        }
        return dataSource;
    }

    public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
    {

        return new JsonResult(GetDataTable(500).ToDataSourceResult(request));
    }
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [A runnable example of a dynamic grid with editing](https://github.com/telerik/ui-for-aspnet-core-examples)