---
title: Group Templates
page_title: Group Templates | Kendo UI Grid
description: "Learn how to customize the group rows when Kendo UI Grid data is grouped."
slug: group_templates_kendoui_grid_widget
position: 2
---

# Group Templates

Group rows are used to organize data rows into a tree structure when data grouping is applied. A group row contains a group expand/collpse icon that enables end-users to expand and collapse a group row, and thus show or hide its child rows. One of the main features of group rows is to display group summary values. Kendo UI Grid provides three different templates that can be used to customize the appearance of the group rows:

  - [GroupHeaderTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadertemplate) - renders a template to be displayed for the entire group row. Usually the main objective is to show an information about the entire group. By default if no template is defined the name of the field and the current group value is displayed.

  - [GroupHeaderColumnTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheaderColumntemplate) - renders a template in the group row aligned to the column itself. Usually it is used to show an aggregate value for a specific column in the context of the current group. Visually the template content is displayed aliged to the column itself. This functionality is introduced in R3 2018 release.

  - [GroupFooterTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupfootertemplate) - renders a template in the group footer row aligned to the column. Pretty much it works in the same way as the groupHeaderColumnTemplate for the group footer row.

In case that no template is defined the name of the field and the current group is displayed as shown in the image below:

**Figure 1: Grid with no group templates**

![Grid with no group templates](/controls/data-management/grid/grid-no-group-header-template.png)

The only difference between in the use of GroupHeaderTemplate is that the template content is compiled and displayed instead of field and current group value.

Both GroupHeaderColumnTemplate and GroupFooterTemplate works in pretty much similar way. The first displays content aligned to the column in the group row and the latter - in the group footer row. Their content is displayed aligned to the column as shown in the image below:

**Figure 2: Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied**

![Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied](/controls/data-management/grid/grid-group-header-column-template.png)

Due to the fact that GroupHeaderTemplate is displayed next to collapse/expand icon of the group row it takes precedence over the GroupHeaderColumnTemplate of the first visible column. In case that developer wants to show the GroupHeaderColumnTemplate content for the first column of the grid the GroupHeaderTemplate for the group column should not be set. The following grid configuration shows that commenting the GroupHeaderTemplate for the Units In Stock column will show the GroupHeaderColumnTemplate for the Product Name column.

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },

                pageSize: 7,
                group: {
                            field: "UnitsInStock", aggregates: [
                            { field: "ProductName", aggregate: "count" },
                            { field: "UnitsInStock", aggregate: "min" }
                            ]
                        },

                aggregate: [ { field: "ProductName", aggregate: "count" },
                                { field: "UnitsInStock", aggregate: "min" }]
            },

            columns: [
                { field: "ProductName", title: "Product Name",
                    aggregates: ["count"],
                    groupHeaderColumnTemplate: "Count: #=count#", width: 300
                },
                { field: "UnitPrice", title: "Unit Price" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min"],
                    //groupHeaderTemplate: "Min: #= min #", width: 500
                }
            ]
        });
    </script>

**Figure 3: Grid with GroupHeaderColumnTemplate for first column applied and no GroupHeaderTemplate**

![Grid with GroupHeaderColumnTemplate for first column applied and no GroupHeaderTemplate](/controls/data-management/grid/grid-group-header-column-template-first-column.png)