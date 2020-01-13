---
title: Hierarchy
page_title: Hierarchy
description: "Learn the basics when working with the Telerik UI Grid TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: hierarchy_grid_aspnetcore
position: 2
---

# Hierarchy

The Grid supports hierarchy and requires a `DetailInit` function.

That function initializes the detail Grids by using the [Kendo UI Grid for jQuery](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview).

```tagHelper
        <kendo-grid name="grid" height="550" selectable="true" on-detail-init="onDetailInit">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees" />
                </transport>
            </datasource>
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="FirstName" title="First Name" width="240" />
                <column field="LastName" title="Last Name" />
                <column field="Country" title="Country" width="150" />
                <column field="City" title="City" width="150" />
            </columns>
        </kendo-grid>


        <script>
            function onDetailInit(e) {
                $("<div/>").appendTo(e.detailCell).kendoGrid({
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                        },
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        pageSize: 10,
                        filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
                        { field: "OrderID", width: "110px" },
                        { field: "ShipCountry", title: "Ship Country", width: "110px" },
                        { field: "ShipAddress", title: "Ship Address" },
                        { field: "ShipName", title: "Ship Name", width: "300px" }
                    ]
                });
            }
        </script>
```
```cshtml
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

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
