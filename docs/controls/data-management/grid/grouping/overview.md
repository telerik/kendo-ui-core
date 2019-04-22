---
title: Basics
page_title: jQuery Grid Documentation | Grouping Basics | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI packed with features such as sorting, grouping, paging, editing and more."
slug: grouping_kendoui_grid_widget
position: 1
---

# Grouping Basics

By default, the grouping functionality of the Grid is disabled.

For more information on displaying aggregate results, refer to the article on [grouping with aggregates]({% slug aggregates_kendoui_grid_widget %}).

## Getting Started

To enable grouping, set the `groupable` option to `true`. As a result, the Grid exposes a new area in its header which enables the user to group the Grid data by a column. To group the data by multiple columns, users can drag the desired columns to the grouping header.

###### Example

    $("#grid").kendoGrid({
         groupable: true
         // Other configuration.
    });

To sort the grouped content, click the grouping tab. To toggle the sort order of the grouped data from the previous example, click **Last Name**. Each individual group can also be toggled from their expanded to collapsed state by clicking the arrow next to the respective header grouping.

**Figure 1: A Grid with its grouping functionality enabled**

![Grid with Grouping Enabled](../grid5_1.png)

**Figure 2: A Grid with its data grouped by last name**

![Grid Grouped by Last Name](../grid6_1.png)

## Using with Row Templates

A row template explicitly defines the row markup while grouping requires you to change the row markup. To use the two features simultaneously, include a script in the row template which adds additional cells depending on the number of the existing groups.

###### Example

    $(document).ready(function () {
        // window. can be omitted if the function is defined outside the document.ready closure.
        window.getGridGroupCells = function(id) {
            var cnt = $("#" + id).data("kendoGrid").dataSource.group().length,
                result = "";

            for (var j = 0; j < cnt; j++) {
                result += "<td class='k-group-cell'>&nbsp;</td>";
            }

            return result;
        }

        $("#GridID").kendoGrid({
            groupable: true,
            rowTemplate: "<tr>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>",
            altRowTemplate: "<tr class='k-alt'>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>"
        });
    });

## Using with Paging

When you use grouping with paging, paging occurs before grouping. As a result:
* The `dataSource` instance is not aware if items from the displayed groups are available on other pages.
* If the groups are collapsed, you cannot display additional items and groups from other pages after the rendered items and groups. To work around this issue, increase the page size.

To enable the Grid to execute grouping before paging, group the whole data source. In this case, however, the performance of the Grid will be reduced.

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
