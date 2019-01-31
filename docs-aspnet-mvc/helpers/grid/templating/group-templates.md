---
title: Group Templates
page_title: Group Templates | Kendo UI Grid HtmlHelper for ASP.NET MVC
description: "Learn how to customize the group rows when the data of the Kendo UI Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) is grouped."
slug: htmlhelpers_group_templates_grid_aspnetcore
position: 4
---

# Group Templates

Group rows are used to organize data rows into a tree structure when data grouping is applied.

A group row contains an expanding and collapsing group icon that enables end-users to expand and collapse a group row, and thus show or hide its child rows. One of the main features of group rows is to display group summary values. Kendo UI Grid provides three different templates that can be used to customize the appearance of the group rows:

- `ClientGroupHeaderTemplate`&mdash;Renders a template to be displayed for the entire group row. Usually the main objective is to show an information about the entire group. By default if no template is defined the name of the field and the current group value is displayed.
- `ClientGroupHeaderColumnTemplate`&mdash;Renders a template in the group row aligned to the column itself. Usually it is used to show an aggregate value for a specific column in the context of the current group. Visually the template content is displayed aligned to the column itself. This functionality is introduced in R3 2018 release.
- `ClientGroupFooterTemplate`&mdash;Renders a template in the group footer row aligned to the column. Pretty much it works in the same way as the `ClientGroupHeaderColumnTemplate` for the group footer row.

If no template is defined, the name of the field and the current group are displayed in the following way.

**Figure 1: Grid with no group templates**

![Grid with no group templates](/helpers/grid/grid-no-group-header-template.png)

The only difference in the use of `ClientGroupHeaderTemplate` is that the template content is compiled and displayed instead of the field and current group value.

Both `ClientGroupHeaderColumnTemplate` and `ClientGroupFooterTemplate` work in a similar way. `ClientGroupHeaderColumnTemplate` displays the content as aligned to the column in the group row. `ClientGroupFooterTemplate` displays the content as aligned to the column in the group footer row. Their content is displayed as aligned to the column as shown in the following way.

**Figure 2: Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied**

![Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied](/helpers/grid/grid-group-header-column-template.png)

Due to the fact that `ClientGroupHeaderTemplate` is displayed next to the expanding icon of the group row, it takes precedence over the `ClientGroupHeaderColumnTemplate` of the first visible column. If you want to show the `ClientGroupHeaderColumnTemplate` content for the first column of the Grid, do not set the `ClientGroupHeaderTemplate` for the group column. The following Grid configuration shows that commenting the `ClientGroupHeaderTemplate` for the **Units In Stock** column shows the `ClientGroupHeaderColumnTemplate` for the **Product Name** column.

```ASPX
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName)
                .ClientGroupHeaderColumnTemplate("Count: #=count#");
            columns.Bound(p => p.UnitPrice).Format("{0:C}");
            columns.Bound(p => p.UnitsOnOrder);
            columns.Bound(p => p.UnitsInStock);
                //.ClientGroupHeaderTemplate("Min: #= min #");
        })
        .Pageable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Aggregates(aggregates =>
            {
                aggregates.Add(p => p.UnitsInStock).Min();
                aggregates.Add(p => p.ProductName).Count();
            })
            .Group(groups => groups.Add(p => p.UnitsInStock))
            .Read(read => read.Action("Aggregates_Read", "Grid"))
        )
    %>
```
```Razor
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName)
                .ClientGroupHeaderColumnTemplate("Count: #=count#");
            columns.Bound(p => p.UnitPrice).Format("{0:C}");
            columns.Bound(p => p.UnitsOnOrder);
            columns.Bound(p => p.UnitsInStock);
                //.ClientGroupHeaderTemplate("Min: #= min #");
        })
        .Pageable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Aggregates(aggregates =>
            {
                aggregates.Add(p => p.UnitsInStock).Min();
                aggregates.Add(p => p.ProductName).Count();
            })
            .Group(groups => groups.Add(p => p.UnitsInStock))
            .Read(read => read.Action("Aggregates_Read", "Grid"))
        )
    )
```

**Figure 3: Grid with GroupHeaderColumnTemplate for first column applied and no GroupHeaderTemplate**

![Grid with GroupHeaderColumnTemplate for first column applied and no GroupHeaderTemplate](/helpers/grid/grid-group-header-column-template-first-column.png)

In a server-binding scenario, you can set the group templates without the `Client` prefix&mdash;`GroupHeaderTemplate`, `GroupHeaderColumnTemplate`, and `GroupFooterTemplate`. For more information, refer to the demo on [server aggregates of the Grid](https://demos.telerik.com/aspnet-mvc/grid/serveraggregates).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Troubleshooting of the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
