---
title: Editor Templates
page_title: Editor Templates
description: "Create the editing Telerik UI Grid {{ site.framework }} with the {{ site.framework }} editor templates."
previous_url: /helpers/data-management/grid/templating/editor-templates
slug: editortemplates_grid_aspnetcore
position: 6
---

# Editor Templates

You can create an editing UI of a Telerik UI Grid for {{ site.framework }} by defining editor templates.

For runnable examples, refer to the [demos on templates in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template).

## Getting Started

The Telerik UI Grid for {{ site.framework }} relies on {{ site.framework }} editor templates to create an editing UI. If the Grid is configured for in-line or in-cell editing, it uses the [`Html.EditorForModel`]({% if site.mvc %}https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorfor.aspx{% else %}https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.htmlhelper-1.editorfor?view=aspnetcore-3.1{% endif %}) method to get the editor HTML for every property which is editable.

The configuration later in this article will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderDate);
            columns.Bound(o => o.ShipCountry);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="500">
        <columns>
            <column field="OrderDate" editor="OrderDate">
            </column>
            <column field="ShipCountry" editor="ShipCountry">
            </column>
        </columns>
        <editable mode="inline" />
    </kendo-grid>
```
{% endif %}

The following example demonstrates the code that will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

```HtmlHelper
    @(Html.EditorFor(o => o.OrderDate);
    @(Html.EditorFor(o => o.ShipCountry);
```

If the Grid is configured for popup editing, it will use the [`Html.EditorForModel`]({% if site.mvc %}https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorfor.aspx{% else %}https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.htmlhelper-1.editorfor?view=aspnetcore-3.1{% endif %}) to get the editor HTML for the whole model.

{% if site.mvc %}For more information on ASP.NET MVC editor templates, refer to [this blog post series on {{ site.framework }} 2 templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-1-introduction.html). For a runnable example on using custom popup templates, refer to [this demo](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/custom-popup-editor).{% endif %}

## Creating Custom Editors for Bound Properties

Your project may require you to create a custom editor for a specific property. For example, to show a DropDownList which contains all available values that a property can take. This is done by creating an editor template for the property.

1. Consider the following models which represent the `Order` and `Employee` entities from the **Northwind** database.

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            public Employee Employee { get; set; }
        }

        public class Employee
        {
            public int EmployeeID { get; set; }

            public string EmployeeName { get; set; }
        }

1. Create an editor template for the `Employee` property. The template will display a [DropDownList]({% slug htmlhelpers_dropdownlist_aspnetcore %}) editor with all available employees. Add a new partial view to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `EmployeeEditor.cshtml`. In case the Editor Templates folder does not exist, you must add it manually.
1. Add the DropDownList to that partial view. Set the `Name` of the DropDownList to the name of the property which will be edited&mdash;`"Employee"` in this case.

    ```HtmlHelper
        @(Html.Kendo().DropDownList()
            .Name("Employee") // The name of the component has to be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the drop-down is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        )
    ```

1. In the main view, bind a column of the Grid to the `Employee` property.

    ```HtmlHelper
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Columns(columns =>
        {
            columns.Bound(p => p.Employee).ClientTemplate("#=Employee.EmployeeName#").Sortable(false).Width(180);
        })
    ```

1. In the action method, which renders the view that contains the Grid, populate the `ViewData` with a list of all employees. Point the DefaultValue for the `Employee` field when adding a new item.

        public ActionResult Index()
        {
            List<Employee> employees = new List<Employee>();

            for (int i = 1; i < 6; i++)
            {
                Employee employee = new Employee
                {
                    EmployeeID = i,
                    EmployeeName = "EmployeeName " + i
                };
                employees.Add(employee);
            }

            ViewData["employees"] = employees;
            ViewData["defaultEmployee"] = employees[0];

            return View();
        }

1. Decorate the `Employee` property with the [`UIHint`](https://msdn.microsoft.com/en-us/library/cc679268) attribute. It needs the name of the editor template ("EmployeeEditor") created in **Step 3** without the extension `".cshtml"`.

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            [UIHint("EmployeeEditor")]
            public Employee Employee { get; set; }
        }

    If the Grid is configured for InLine editing, use the [`EditorTemplateName()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#editortemplatenamesystemstring) method to set the name of the created custom editor template.

    ```
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Columns(columns =>
        {
            columns.Bound(p => p.Employee).ClientTemplate("#=Employee.EmployeeName#").EditorTemplateName("EmployeeEditor").Sortable(false).Width(180);
        })
    ```

1. Specify default value for the column in the Model of the DataSource.

            .DataSource(dataSource => dataSource
                .Ajax()
                .Batch(true)
                .Model(model =>
                {
                    model.Id(p => p.OrderID);
                    model.Field(p => p.Employee).DefaultValue(
                        ViewData["defaultEmployee"] as TelerikMvcApp31.Models.Employee);
                })
                .PageSize(20)
                .Create(c => c.Action("Create", "Grid"))
                .Read(read => read.Action("Orders_Read", "Grid"))
                .Update(u => u.Action("Update", "Grid"))
            )


{% if site.core %}

## TagHelper Editor Templates

To configure Editor Templates when using Grid TagHelper define them by using a client-side function. Pass the name of the handler in the column `editor` attribute.

```
    <kendo-grid name="Grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20" batch="true"
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number" editable="false"></field>
                        <field name="Employee" default-value='new Kendo.Mvc.Examples.Models.Employee() { EmployeeID = 1, EmployeeName = "EmployeeName" }'></field>
                    </fields>
                </model>
            </schema>
            <transport>
                    <read url="@Url.Action("Orders_Read" "Grid")" />
                    <update url="@Url.Action("Update" "Grid")" />
                    <create url="@Url.Action("Create" "Grid")" />
                    <destroy url="@Url.Action("Destroy" "Grid")" />
            </transport>
        </datasource>
        <columns>
            <column field="Employee" width="180" template="#=Employee.EmployeeName#" editor="ClientEmployeeEditor"/>
            <column width="160">
                <commands>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="create"></toolbar-button> 
            <toolbar-button name="save"></toolbar-button>
        </toolbar>
        <editable mode="incell"/>
    </kendo-grid>

    <script type="text/javascript">
        function ClientEmployeeEditor(container, options) {
            $('<input required name="Employee">')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataTextField: "EmployeeName",
                    dataValueField: "EmployeeID",
                    dataSource: {
                        transport: {
                            read: '@Url.Action("ReadEmployees","Grid")'
                        }
                    }
                });
        }
    </script>
```
{% endif %}

## See Also

* [Editing Overview for the Grid]({% slug htmlhelpers_grid_aspnetcore_editing_overview %})
* [Templates by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)
* [Server-Side API](/api/grid)
