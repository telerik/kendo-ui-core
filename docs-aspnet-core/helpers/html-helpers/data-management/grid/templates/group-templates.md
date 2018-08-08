---
title: Group Templates
page_title: Group Templates | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to customize the group rows when Kendo UI Grid for ASP.NET MVC data is grouped."
slug: group_templates_grid_aspnetmvc_widget
position: 2
---

# Group Templates

Group rows are used to organize data rows into a tree structure when data grouping is applied. A group row contains a group expand/collpse icon that enables end-users to expand and collapse a group row, and thus show or hide its child rows. One of the main features of group rows is to display group summary values. Kendo UI Grid provides three different templates that can be used to customize the appearance of the group rows:

  - ClientGroupHeaderTemplate - renders a template to be displayed for the entire group row. Usually the main objective is to show an information about the entire group. By default if no template is defined the name of the field and the current group value is displayed.

  - ClientGroupHeaderColumnTemplate - renders a template in the group row aligned to the column itself. Usually it is used to show an aggregate value for a specific column in the context of the current group. Visually the template content is displayed aliged to the column itself. This functionality is introduced in R3 2018 release.

  - ClientGroupFooterTemplate - renders a template in the group footer row aligned to the column. Pretty much it works in the same way as the ClientGroupHeaderColumnTemplate for the group footer row.

In case that no template is defined the name of the field and the current group is displayed as shown in the image below:

**Figure 1: Grid with no group templates**

![Grid with no group templates](/helpers/html-helpers/data-management/grid/grid-no-group-header-template.png)

The only difference between in the use of ClientGroupHeaderTemplate is that the template content is compiled and displayed instead of field and current group value.

Both ClientGroupHeaderColumnTemplate and GroupFooterTemplate works in pretty much similar way. The first displays content aligned to the column in the group row and the latter - in the group footer row. Their content is displayed aligned to the column as shown in the image below:

**Figure 2: Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied**

![Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied](/helpers/html-helpers/data-management/grid/grid-group-header-column-template.png)

Due to the fact that ClientGroupHeaderTemplate is displayed next to collapse/expand icon of the group row it takes precedence over the ClientGroupHeaderColumnTemplate of the first visible column. In case that developer wants to show the ClientGroupHeaderColumnTemplate content for the first column of the grid the ClientGroupHeaderTemplate for the group column should not be set. The following grid configuration shows that commenting the ClientGroupHeaderTemplate for the Units In Stock column will show the ClientGroupHeaderColumnTemplate for the Product Name column.

###### Example

```tab-Razor

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

![Grid with GroupHeaderColumnTemplate for first column applied and no GroupHeaderTemplate](/helpers/html-helpers/data-management/grid/grid-group-header-column-template-first-column.png)