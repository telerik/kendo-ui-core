---
title: Group Templates
page_title: Group Templates | Kendo UI Grid
description: "Learn how to customize the group rows when the data of the Kendo UI Grid for jQuery is grouped."
slug: group_templates_kendoui_grid_widget
position: 2
---

# Group Templates

Group rows are used to organize data rows into a tree structure when data grouping is applied.

A group row contains an expanding and collapsing group icon that enables end-users to expand and collapse a group row, and thus show or hide its child rows. One of the main features of group rows is to display group summary values. Kendo UI Grid provides three different templates that can be used to customize the appearance of the group rows:

- [`GroupHeaderTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadertemplate)&mdash;Renders a template to be displayed for the entire group row. Usually the main objective is to show an information about the entire group. By default if no template is defined the name of the field and the current group value is displayed.
- [`GroupHeaderColumnTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadercolumntemplate)&mdash;Renders a template in the group row aligned to the column itself. Usually it is used to show an aggregate value for a specific column in the context of the current group. Visually the template content is displayed aligned to the column itself. This functionality is introduced in R3 2018 release.
- [`GroupFooterTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupfootertemplate)&mdash;Renders a template in the group footer row aligned to the column. Pretty much it works in the same way as the `groupHeaderColumnTemplate` for the group footer row.

If no template is defined, the name of the field and the current group are displayed in the following way.

**Figure 1: Grid with no group templates**

![Grid with no group templates](/controls/data-management/grid/grid-no-group-header-template.png)

The only difference in the use of `GroupHeaderTemplate` is that the template content is compiled and displayed instead of the field and current group value.

Both `GroupHeaderColumnTemplate` and `GroupFooterTemplate` work in a similar way. `GroupHeaderColumnTemplate` displays the content as aligned to the column in the group row. `GroupFooterTemplate` displays the content as aligned to the column in the group footer row. Their content is displayed as aligned to the column as shown in the following way.

**Figure 2: Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied**

![Grid with GroupHeaderColumnTemplate and GroupFooterTemplate applied](/controls/data-management/grid/grid-group-header-column-template.png)

Due to the fact that `GroupHeaderTemplate` is displayed next to the expanding icon of the group row, it takes precedence over the `GroupHeaderColumnTemplate` of the first visible column. If you want to show the `GroupHeaderColumnTemplate` content for the first column of the Grid, do not set the `GroupHeaderTemplate` for the group column. The following Grid configuration shows that commenting the `GroupHeaderTemplate` for the **Units In Stock** column shows the `GroupHeaderColumnTemplate` for the **Product Name** column.

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

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
