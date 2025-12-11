---
title: Implementing a Dynamic Grid
description: Learn how to bind the {{ site.product }} Grid to a DataTable with dynamic title and editors.
type: how-to
page_title: Implementing a Dynamic Grid in ASP.NET Core
slug: grid-dynamic
tags: aspnet, core,  kendo, kendo-ui, grid, edit, operations, caption, title, dynamic, datatype, razor, page
ticketid: 1455029, 1497302, 1479749, 1478314, 1455574
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I create {{ site.product }} Grid that has dynamic columns?

## Solution

This article describes the following use-case scenarios:

* [Basic dynamic Grid binding to a DataTable](#basic-dynamic-binding)
* [Dynamic Grid column name as per the Model value](#dynamic-column-titles)
* [Dynamic Grid Editing](#dynamic-editing)
* [Dynamic Grid binding to a DataTable in a Razor Pages scenario](#dynamic-grid-in-razor-pages)

### Basic Dynamic Binding

The following example demonstrates how to create a dynamic Grid that binds to a `DataTable`.

```Razor View_HtmlHelper
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
        .Scrollable()
        .Height(400)
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
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
```Razor View_TagHelper
@addTagHelper *, Kendo.Mvc
@model System.Data.DataTable
 
<kendo-grid name="Grid" height="400">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <schema data="Data" total="Total" errors="Errors">
            @{
                var id = Model.PrimaryKey[0].ColumnName;
            }
            <model id="@id">
                <fields>
                    @{
                        foreach (System.Data.DataColumn column in Model.Columns)
                        {
                            <field name="@column.ColumnName" type="@column.DataType" ></field>
                        }
                    }
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("Customers_Read", "Grid")" />
        </transport>
    </datasource>
    <columns>
        @{
            foreach (System.Data.DataColumn column in Model.Columns)
            {
                <column field="@column.ColumnName" />
            }
        }
    </columns>
    <pageable enabled="true" />
    <sortable enabled="true" />
    <filterable enabled="true" />
    <scrollable enabled="true" />
</kendo-grid>
```
```C# Controller
    public ActionResult Index()
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

    public JsonResult Customers_Read([DataSourceRequest] DataSourceRequest request)
    {
    	return Json(GetDataTable(500).ToDataSourceResult(request));
    }
```
To review the complete example, refer to the [ASP.NET Core application](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/Dynamic.cshtml) in the [UI for ASP.NET Core Examples repository](https://github.com/telerik/ui-for-aspnet-core-examples).

### Dynamic Column Titles

The `System.Data.DataColumn` has a [`Caption`](https://docs.microsoft.com/en-us/dotnet/api/system.data.datacolumn.caption?view=netcore-3.1#System_Data_DataColumn_Caption) property that can be used to dynamically change the title of the columns:

```HtmlHelper
.Columns(columns =>
{
    foreach (System.Data.DataColumn column in Model.Columns)
    {
        var c = columns.Bound(column.ColumnName).Title(column.Caption);
    }
})
```
```TagHelper
<columns>
@{
    foreach (System.Data.DataColumn column in Model.Columns)
    {
        <column field="@column.ColumnName" title="@column.Caption" />
    }
}
</columns>
```

### Dynamic Editing

Since dynamic editing is not part of the official built-in options, which utilized strongly typed models for ASP.NET Core, there are different solutions that can be applied.

1. First, add the model `Id()` option&mdash;the primary key of the table. Also, use the `Editable()` option to specify the non-editable fields.

    ```HtmlHelper
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
    ```TagHelper
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <schema data="Data" total="Total">
            @{
                var id = Model.PrimaryKey[0].ColumnName;
            }
            <model id="@id">
                <fields>
                    @{
                        foreach (System.Data.DataColumn column in Model.Columns)
                        {
                            if(column.ColumnName == id) {
                                <field name="@column.ColumnName" type="@column.DataType" editable="false"></field>
                            }
                            else
                            {
                                <field name="@column.ColumnName" type="@column.DataType"></field>
                            }
                        }
                    }
                </fields>
            </model>
        </schema>
    </datasource>
    ```

1. Use `IFormCollection` to intercept the updated data item on the server.

    ```C# Inline_Popup
        public JsonResult Customers_Update([DataSourceRequest] DataSourceRequest request, IFormCollection data)
        {
            ... // Update Action logic.
        }
    ```
    ```C# InCell
        public JsonResult Customers_Update([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IFormCollection models)
        {
            ... // Update Action logic.
        }
    ```
    ```C# Controller_Inline_Popup
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
        
        public JsonResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(db.ToDataSourceResult(request));
        }

        public JsonResult Customers_Update([DataSourceRequest] DataSourceRequest request, IFormCollection data)
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

1. Alternatively, you can post the Model and values to the server in the desired format, so that you can process them and update the corresponding table accordingly.

    ```HtmlHelper
    @(Html.Kendo().Grid<dynamic>()
        .Name("gridMetadata")
        .Events(events => events.Save("savePopUpChange")) // Handle the "Save" event of the Grid.
        .Editable(ed=>ed.Mode(GridEditMode.PopUp)) 
        ... // Additional configuration.
        .DataSource(dataSource => dataSource
            .Ajax()
            ... // Additional configuration.
            .Update(update => update.Action("Metadata_Update", "Grid").Data("updateValuesData")) // Send additional data through the Update request.
        )
    )
    ```
    ```TagHelper
    <kendo-grid name="gridMetadata" on-save="savePopUpChange">
        <editable mode="popup"/>
        <!-- Additional configuration.-->
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <transport>
                <update url="@Url.Action("Metadata_Update", "Grid")" data="updateValuesData"/>
            </transport>
            <!-- Additional configuration.-->
        </datasource>
    </kendo-grid>
    ```
    ```JavaScript
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
    ```C# Controller
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult Metadata_Update([DataSourceRequest] DataSourceRequest request, string keyValueList)
        {
            var list = keyValueList.Split('|');
            // Server-side saving.
            return result;
        } 
    ```

1. To define the column editors based on a condition, you can use a `switch case`:

    ```HtmlHelper
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("gridMetadata")
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
            columns.Command(command =>  {command.Edit();});
        })
        ... // Additional configuration.
    )
    ```
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model System.Data.DataTable
    
    <kendo-grid name="Grid" height="400">
        <columns>
            @{
                foreach (System.Data.DataColumn dcolumn in Model.Columns)
                {
                    switch (dcolumn.DataType.ToString())
                    {
                        case "System.Int16":
                        case "System.Int32":
                        case "System.Int64":
                            <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="Integer"/>                              
                            break;

                        case "System.Decimal":
                        case "System.Double":
                        case "System.Float":
                        <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="Integer"/>  
                            columns.Bound(dcolumn.ColumnName).Title(dcolumn.Caption).EditorTemplateName("Number");
                            break;
                        case "System.String":
                            <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="String"/>  ;                                 
                            break;
                        case "System.Byte":
                        case "System.Boolean":
                            <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="Boolean"/>                                 
                            break;
                        case "System.DateTime":
                            <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="Date"/>  
                            break;
                        default:
                            <column field="@dcolumn.ColumnName" title="@dcolumn.Caption" editor="String"/>                               
                            break;
                    }
                }
            }
            <column>
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                </commands>
            </column>
        </columns>
        <!-- Additional configuration.-->
    </kendo-grid>
    ```
For runnable examples of a dynamic Grid with editing, refer to the following example applications in GitHub:

* [Dynamic Grid in Batch (InCell) Edit Mode](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/DynamicBatchEditing.cshtml)
* [Dynamic Grid in Popup Edit Mode](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/DynamicPopupEditing.cshtml)

### Dynamic Grid In Razor Pages

The following example shows how to create a dynamic Grid in a Razor Pages scenario.

```Razor HtmlHelper_Index.cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

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
        .Read(r => r.Url(Url.Page("Index", "Read")).Data("sendTokens"))
    )
)
```
```Razor TagHelper_Index.cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<script>
    function sendTokens() {
        return kendo.antiForgeryTokens();
    }
</script>

<kendo-grid name="Grid" height="400">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <schema data="Data" total="Total" errors="Errors">
            @{
                var id = Model.DataTable.PrimaryKey[0].ColumnName;
            }
            <model id="@id">
                <fields>
                    @{
                        foreach (System.Data.DataColumn column in Model.DataTable.Columns)
                        {
                            <field name="@column.ColumnName" type="@column.DataType" ></field>
                        }
                    }
                </fields>
            </model>
        </schema>
        <transport>
            <read url="/Index?handler=Read" data="sendTokens"/>
        </transport>
    </datasource>
    <columns>
        @{
            foreach (System.Data.DataColumn column in Model.DataTable.Columns)
            {
                <column field="@column.ColumnName" />
            }
        }
    </columns>
    <pageable enabled="true" />
    <scrollable enabled="true" />
</kendo-grid>
```
```C# Index.cshtml.cs
    [BindProperty]
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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the HtmlHelper Grid for {{ site.framework }}](/api/grid)
* [Server-Side API Reference of the TagHelper Grid for {{ site.framework }}](/api/taghelpers/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
