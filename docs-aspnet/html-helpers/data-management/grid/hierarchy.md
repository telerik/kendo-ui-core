---
title: Hierarchy
page_title: Hierarchy
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and display its parent and child records by applying hierarchy to its structure."
slug: hierarchy_grid_htmlhelper_aspnetcore
position: 17
---

# Hierarchy

The Grid provides options for visualizing the relations between parent and child records by displaying its table data in a hierarchical manner.

* To implement hierarchy in the Grid HtmlHelper, use the `ClientDetailTemplateId()` method and filter the records in the child table based on the parent key field value. For a runnable example, refer to the [demo on using hierarchy in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/hierarchy).

{% if site.core %}
* To implement hierarchy in the Grid TagHelper, use the `detail-template-id` attribute that accepts the `id` of the external Kendo UI template that initializes the detail Grid. 
{% endif %}

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(e => e.FirstName).Width(130);
                columns.Bound(e => e.LastName).Width(130);
                columns.Bound(e => e.Country).Width(130);
                columns.Bound(e => e.City).Width(110);
                columns.Bound(e => e.Title);

            })
            .Sortable()
            .Pageable()
            .Scrollable()
            .ClientDetailTemplateId("template")
            .HtmlAttributes(new { style = "height:600px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(6)
                .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
            )
    )

    <script id="template" type="text/kendo-tmpl">
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                .Name("grid_#=EmployeeID#") // template expression, to be evaluated in the master context
                .Columns(columns =>
                {
                    columns.Bound(o => o.OrderID).Width(110);
                    columns.Bound(o => o.ShipCountry).Width(150);
                    columns.Bound(o => o.ShipAddress).Width(150);
                    columns.Bound(o => o.ShipName).Width(300);
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(10)
                    .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new { employeeID = "#=EmployeeID#" }))
                )
                .Pageable()
                .Sortable()
                .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var url = @Url.Action("HierarchyBinding_Orders","Grid");
    }

    <kendo-grid name="grid" height="550" selectable="true" detail-template-id="template">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees" />
            </transport>
        </datasource>
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }" />
        <filterable enabled="true" />
        <columns>
            <column field="FirstName" title="First Name" width="240" />
            <column field="LastName" title="Last Name" />
            <column field="Country" title="Country" width="150" />
            <column field="City" title="City" width="150" />
        </columns>
    </kendo-grid>

    <script id="template" type="text/kendo-tmpl">
        <kendo-grid name="grid_#=EmployeeID#" is-in-client-template="true">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
                <transport data="Data" total="Total" errors="Errors">
                    <read url="@Html.Raw(url + "?employeeID=#=EmployeeID#")" />
                </transport>
            </datasource>
            <pageable enabled="true" />
            <sortable enabled="true" />
            <columns>
                <column field="OrderID" width="110" />
                <column field="ShipCountry" title="Ship Country" width="150" />
                <column field="ShipAddress" title="Ship Address" width="150" />
                <column field="ShipName" title="Ship Name" width="300" />
            </columns>
        </kendo-grid>
    </script>
```
{% endif %}

If the detail Grid contains [client templates]({% slug client_templates_overview%}), any `#` characters that are part of binding expressions in these templates must be escaped. As a result, the Kendo UI template that holds the detail Grid will ignore the `#` characters, while the inner template will handle it correctly. For more information on how to escape `#` characters in nested templates, refer to the [Kendo UI Template documentation](https://www.telerik.com/kendo-jquery-ui/documentation/framework/templates/essentials).

```HtmlHelper
    <script id="template" type="text/kendo-tmpl">
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                .Name("grid_#=EmployeeID#") // template expression, to be evaluated in the master context
                .Columns(columns =>
                {
                    columns.Bound(o => o.OrderID).Width(110);
                    columns.Bound(o => o.ShipCountry).Width(150);
                    columns.Bound(o => o.ShipAddress).ClientTemplate("\\#= ShipAddress \\#"); // escaped template expression, to be evaluated in the child/detail context
                    columns.Bound(o => o.ShipName).Width(300);
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(10)
                    .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new { employeeID = "#=EmployeeID#" }))
                )
                .Pageable()
                .Sortable()
                .ToClientTemplate()
        )
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var url = @Url.Action("HierarchyBinding_Orders","Grid");
    }

    <script id="template" type="text/kendo-tmpl">
        <kendo-grid name="grid_#=EmployeeID#" is-in-client-template="true">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
                <transport>
                    <read url="@Html.Raw(url + "?employeeID=#=EmployeeID#")" />
                </transport>
            </datasource>
            <pageable enabled="true" />
            <sortable enabled="true" />
            <columns>
                <column field="OrderID" width="110" />
                <column field="ShipCountry" title="Ship Country" width="150" />
                <column field="ShipAddress" title="Ship Address" template="\\#= ShipAddress \\#"/> // escaped template expression, to be evaluated in the child/detail context
                <column field="ShipName" title="Ship Name" width="300" />
            </columns>
        </kendo-grid>
    </script>
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Hierarchy by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/hierarchy)
* [Using Nested Component for Editor in Child Grid](https://docs.telerik.com/aspnet-mvc/knowledge-base/grid-hierarchy-editor-limitation)
* [Grid Hierarchy with Local Data]({% slug grid-hierarchy-localdata %})
* [Server-Side API](/api/grid)
