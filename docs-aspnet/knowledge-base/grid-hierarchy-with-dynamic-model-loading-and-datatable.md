---
title: Implement Grid Hierarchy with Dynamic Model Loading and DataTable
page_title: Implement Grid Hierarchy with Dynamic Model Loading and DataTable
description: "Implement a hierarchical {{ site.product }} Grid with a dynamic model loading and DataTable in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Binding/grid-hierarchy-with-dynamic-model-loading-and-datatable, /html-helpers/data-management/grid/how-to/Binding/grid-hierarchy-with-dynamic-model-loading-and-datatable
slug: howto_usegridhierarchydynamicmodelload_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
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

How can I implement a hierarchical Grid that binds to a [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable?view=net-9.0) and loads dynamic data based on a selected Model through a DropDownList?

## Solution

The solution relies on the following key steps:

1. Define a hierarchical Grid and populate its columns using the available `DataTable`. Also, handle the `DetailInit` event of the Grid and initialize the detail Grid through a partial View:

    ```Razor HtmlHelper
    @using Kendo.Mvc.UI
    @model string

    @{
        System.Data.DataTable Table = (System.Data.DataTable)ViewData["Table"];
    }

    @(Html.Kendo().Grid<dynamic>()
        .Name("Grid")
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn column in Table.Columns)
            {
                columns.Bound(column.ColumnName).Width(120).ClientTemplate("<div style='height: 30px; overflow: hidden;'>#=" + column.ColumnName + "#</div>");
            }
        })
        .Events(events => events.DetailInit("onDetailInit"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                var id = Table.PrimaryKey[0].ColumnName;
                model.Id(id);
                foreach (System.Data.DataColumn column in Table.Columns)
                {
                    var field = model.Field(column.ColumnName, column.DataType);
                    if (column.ColumnName == id)
                    {
                        field.Editable(false);
                    }

                }
            })
            .Read(read => read.Action("Read", "Home").Data("getTableName"))
            .Update(update => update.Action("Update", "Home"))
        )
        ...// Additional options.
    )

    <script>
        function getTableName() {
             // Send the current table name through the Read request of the main Grid.
            return { tableName: "@Model" };
        }

        function onDetailInit(e) {
            // Initialize the detail Grid based on the currently selected DataTable.
            var container = e.detailCell;

            var parentFieldName = "@Table.PrimaryKey[0].ColumnName";

            var tableName = "@ViewData["childrenTableName"]";

            $.ajax({
                type: "GET",
                url: "@(Url.Action("DetailTemplate","Home"))",
                data: {
                    parentFieldName: parentFieldName,
                    parentFieldValue: e.data[parentFieldName],
                    tableName: tableName
                },
                success: function (data) {
                    container.html(data);
                }
            });
        }
    </script>
    ```
    ```C# HomeController
    public ActionResult DetailTemplate(string tableName, string parentFieldName, string parentFieldValue)
    {
        ViewData["parentFieldValue"] = parentFieldValue;
        ViewData["parentFieldName"] = parentFieldName;
        ViewData["tableName"] = tableName;

        DataTable data = DynamicTable(string.IsNullOrEmpty(tableName) ? tableName : tableName, parentFieldName, parentFieldValue);

        return PartialView(data);
    }

    private DataTable DynamicTable(string tableName, string parentFieldName, string parentFieldValue)
    {
        // Secure SQL connection strings - current implementation is for test purposes only.
        var connectionString = ConfigurationManager.ConnectionStrings["GridBindingDataTableEntities"].ConnectionString;
        using (var connection = new SqlConnection(connectionString))
        {
            var command = new SqlCommand();
            command.Connection = connection;
            command.CommandText = string.Format("SELECT * from {0}", tableName);
            if (!string.IsNullOrEmpty(parentFieldName))
            {
                command.CommandText += " WHERE " + parentFieldName + " = @parentFieldValue";
                command.Parameters.Add(new SqlParameter("parentFieldValue", parentFieldValue));
            }

            using (var dataAdapter = new SqlDataAdapter(command))
            {
                var dataTable = new DataTable();

                dataAdapter.Fill(dataTable);
                dataAdapter.FillSchema(dataTable, SchemaType.Mapped);
                return dataTable;
            }
        }
    }
    ```
    ```Razor DetailTemplate.cshtml
    @model System.Data.DataTable

    @(Html.Kendo().Grid<dynamic>()
        .Name("grid_" + ViewData["parentFieldValue"])
        .Columns(columns =>
        {
            foreach (System.Data.DataColumn column in Model.Columns)
            {
                columns.Bound(column.ColumnName).Width(120).ClientTemplate("<div style='height: 30px; overflow: hidden;'>#=" + column.ColumnName + "#</div>");
            }
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
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
            .Read(read => read.Action("Read", "Home", new { tableName = ViewData["tableName"], parentFieldValue = ViewData["parentFieldValue"], parentFieldName = ViewData["parentFieldName"] }))
        )
        .Pageable()
        .Sortable()
    )
    ```

1. Add a DropDownList inside a form and handle its `Change` event to submit the form when a specified option is selected:

    ```Razor
    @using (Html.BeginForm("Index", "Home", System.Web.Mvc.FormMethod.Post, null))
    {
        <h3>Select table to load:</h3>

        @(Html.Kendo().DropDownList()
            .Name("tableName")
            .DataTextField("Key")
            .DataValueField("Key")
            .Events(ev => ev.Change("onChange"))
            .BindTo((List<KeyValuePair<string, string>>)ViewData["ParentChildRelations"])
        )
    }

    <script>
        function onChange(e) {
            $("form").submit();
        }
    </script>
    ```
    ```C# HomeController
    public ActionResult Index(string tableName)
    {
        tableName = string.IsNullOrEmpty(tableName) ? "Employees" : tableName;

        ViewData["Table"] = DynamicTable(tableName, null, null);
        ViewData["ParentChildRelations"] = GetTableParentChildRelations();
        ViewData["childrenTableName"] = GetTableParentChildRelations().Where(pair => pair.Key == tableName).Select(pair => pair.Value).FirstOrDefault();

        return View(model: tableName);
    }

    private List<KeyValuePair<string, string>> GetTableParentChildRelations()
    {
        return new List<KeyValuePair<string, string>>() {
            new KeyValuePair<string,string>("Employees", "Orders"),
            new KeyValuePair<string,string>("Categories", "Products")
        };
    }
    ```

To review the complete example, refer to the [project on how to implement a hierarchical Grid using a `DataTable` and dynamic Model loading](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchyDynamicModelLoadingAndDataTable).

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
