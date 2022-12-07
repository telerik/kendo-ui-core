---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TreeList component for {{ site.framework }}."
previous_url: /helpers/html-helpers/treelist, /helpers/data-management/treelist/overview
slug: htmlhelpers_treelist_aspnetcore
position: 1
---

# {{ site.framework }} TreeList Overview

{% if site.core %}
The Telerik UI TreeList TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TreeList widget.
{% else %}
The Telerik UI TreeList HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TreeList widget.
{% endif %}

The TreeList enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

* [Demo page for the TreeList HtmlHelper](https://demos.telerik.com/{{ site.platform }}/treelist/index)
{% if site.core %}
* [Demo page for the TreeList TagHelper](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
{% endif %}

## Initializing the TreeList

The following example demonstrates how to define the TreeList.

> The TreeList distinguishes the root items based on the `ParentId` field. If the `ParentId` is set as `.Nullable(true)`, root items with be items whose `ParentId` field values are `null`. If the `ParentId` is not nullable (`.Nullable(false)`), root items will be items which have a default value for their data type.

{% if site.mvc %}
1. Create a new ASP.NET MVC application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug newprojectwizards_visualstudio_aspnetcore %}), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridServerBinding`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add new item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

    ![{{ site.product_short }} A new entity data model](images/treelist-new-entity-data-model.png)

1. Pick the **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.

    ![{{ site.product_short }} Choosing the connection](images/treelist-entity-data-model.png)

1. Choose the **Employees** table from the `Which database objects do you want to include in your model?`. Leave all other options as they are set by default. Click **Finish**.

    ![{{ site.product_short }} Choosing the Employees table in the database objects](images/treelist-database-objects.png)

1. Right-click the `~/Models` folder in the solution explorer and add a new `EmployeeViewModel` class.
{% endif %}

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.FirstName).Width(250).Title("First Name");
            columns.Add().Field(e => e.LastName).Title("Last Name");
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
        })
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Index", "EmployeeDirectory"))
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo).Nullable(true);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <columns>
            <treelist-column field="FirstName" width="250px" title="First Name"></treelist-column>
            <treelist-column field="LastName" title="Last Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Extension" title="Ext" format="{0:#}"></treelist-column>
        </columns>
        <treelist-datasource>
            <transport>
                <read url="@Url.Action("Index","EmployeeDirectory")"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo">
                    <fields>
                        <field name="EmployeeId" type="number"></field>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="FirstName" type="string"></field>
                        <field name="LastName" type="string"></field>
                        <field name="Position" type="string"></field>
                        <field name="Extension" type="number"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
    </kendo-treelist>
```
{% endif %}
```Model
    public class EmployeeViewModel
    {
        // The Id.
        public int EmployeeID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        // A nullable ParentId.
        public int? ReportsTo { get; set; }

        public string Address { get; set; }

        // This is a case-sensitive property. Define it only if you want to use lazy-loading.
        // If it is not defined, the TreeList will calculate and assign its value on the client.
        public bool hasChildren { get; set; }
    }
```
```Controller
 public JsonResult All([DataSourceRequest] DataSourceRequest request)
    {
        var result = GetDirectory().ToTreeDataSourceResult(request,
            e => e.EmployeeId,
            e => e.ReportsTo,
            e => e
        );

        return Json(result, JsonRequestBehavior.AllowGet);
    }
```
```AsyncController  
    public async Task<JsonResult> TreeList_Read([DataSourceRequest] DataSourceRequest request)
    {
        var northwind = new NortwindEntities();

        var result = await northwind.Employees.ToTreeDataSourceResultAsync(request,
            employee => employee.EmployeeID,
            employee => employee.ReportsTo,
            employee => e
        );

        return Json(result, JsonRequestBehavior.AllowGet);
    }

```

{% if site.mvc %}
1. Build and run the application.

    ![{{ site.product_short }} The final result is a TreeList bound to data](images/treelist-bound.png)
{% endif %}

## Functionality and Features

* Data operations
    * [Ajax binding]({% slug htmlhelpers_treelist_aspnetcore_ajaxbinding %})
    * [Editing]({% slug editing_aspnetcore_treelist_helper %})
    * [Paging]({% slug client_side_paging_aspnetcore_treelist_helper %})
    * [Grouping with aggregates]({% slug htmlhelpers_treelist_aspnetcore_aggregates %})
* Export options
    * [Excel]({% slug htmlhelpers_treelist_aspnetcore_excelexport %})
    * [PDF]({% slug htmlhelpers_treelist_aspnetcore_pdfexport %})
* More settings
    * [Column enhancements]({% slug htmlhelpers_treelist_aspnetcore_locked_columns %})
    * [Scrolling]({% slug htmlhelpers_treelist_aspnetcore_scrolling %})
    * [Row Selection]({% slug htmlhelpers_treelist_selection %})
    * [Globalization]({% slug globalization_htmlhelpers_treelist %})
    * [Accessibility]({% slug htmlhelpers_treelist_aspnetcore_accessibility %})

## Events

You can subscribe to all TreeList [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#events). For a complete example on basic TreeList events, refer to the [demo on using the events of the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/events).

```HtmlHelper
    @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
        .Name("treelist")
        /* Other configurations. */
        .Events(events => {
            events.DataBinding("onDataBinding");
            events.DataBound("onDataBound");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" on-data-bound="onDataBound" on-data-binding="onDataBinding">
        <!-- Other configurations. -->
    </kendo-treelist>
```
{% endif %}
```JavaScript
    <script>
        function onDataBinding(e) {
            // Handle the dataBinding event.
            var treelist = this;
        }

        function onDataBound(e) {
            // Handle the dataBound event.
            var treelist = e.sender;
        }
    </script>
```

## Referencing Existing Instances

To reference an existing Kendo UI TreeList instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) to control its behavior.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().TreeList<dynamic>()
                .Name("treelist")
                .Columns(x =>
                {
                    x.Add().Field("Name");
                    x.Add().Field("Position");
                })
                .DataSource("dataSource")
    )

    <script>

        $(function () {
            // Get a reference to the kendo.ui.TreeList instance.
            var treelist = $("#treelist").data("kendoTreeList");
        })

        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```
```TagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>

        $(function () {
            // Get reference to the kendo.ui.TreeList instance
            var treelist = $("#treelist").data("kendoTreeList");
        })

        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        /* Other configurations. */
    )
    <script>
        $(function() {
            // The Name() of the TreeList is used to get its client-side instance.
            var treelist = $("#treelist").data("kendoTreeList");
        });
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/index)
{% if site.core %}
* [Basic Usage of the TreeList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
{% endif %}
* [Server-Side API](/api/treelist)
