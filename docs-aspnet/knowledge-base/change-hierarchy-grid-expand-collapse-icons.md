---
title: Updating and Adding Text to the Expand and Collapse Icons in the Hierarchy Grid
description: "An example on how to update and add text to the Expand and Collapse icons for the Telerik UI for {{ site.framework }} hierarchical Grid."
type: how-to
page_title: Updating and Adding Text to the Expand and Collapse Icons in the Hierarchy Grid
slug: update-hierarchy-grid-expand-collapse-icons
tags: telerik, grid, hierarchy, expand, collapse, icons, add, text, rows
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>


## Description

How can I change the **Expand** and **Collapse** icons in the Telerik UI for {{ site.framework }} Hierarchy Grid and add text to the icons?

## Solution

To achieve the desired scenario:

1. Update the **Expand** and **Collapse** icons by using the common classes provided by Kendo. For the full list of the available Kendo UI Web Font Icons, refer to the [list of Font icons](/styles-and-layout/sass-themes/font-icons#list-of-font-icons).
1. To add initial text icons once the data is bound to the Grid, subscribe to the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databoundsystemstring) event.
1. To add text to the **Expand** and **Collapse** icons, subscribe to both the [`DetailExpand`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#detailexpandsystemstring) and [`DetailCollapse`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#detailcollapsesystemstring) events and alter the initially provided style classes by using the conventional [removeClass()](https://api.jquery.com/removeclass/) and [text()](https://api.jquery.com/text/) jQuery methods.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(e => e.FirstName).Width(100);
                columns.Bound(e => e.LastName).Width(110);
                columns.Bound(e => e.Country).Width(110);
                columns.Bound(e => e.City).Width(110);
                columns.Bound(e => e.Title);

            })
            .Sortable()
            .Pageable()
            .Scrollable()
            .ClientDetailTemplateId("template")
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(6)
                .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
            )
            .Events(events => {
                events.DataBound("onDataBound");
                events.DetailExpand("onDetailExpand");
                events.DetailCollapse("onDetailCollapse");
            })
    )
```
```Script.js
    <script id="template" type="text/kendo-tmpl">
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                .Name("grid_#=EmployeeID#")
                .Columns(columns =>
                {
                    columns.Bound(o => o.OrderID).Width(110);
                    columns.Bound(o => o.ShipCountry).Width(110);
                    columns.Bound(o => o.ShipAddress);
                    columns.Bound(o => o.ShipName).Width(200);
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
    <script>
        function onDataBound(e) {
            this.tbody.find('.k-hierarchy-cell').each(function(_,x){ // Append an initial icon and text.
                  x= $(x);
                  x.prepend("<span class='expand'>Expand</span>")
            });
        }
        function onDetailExpand(e){ // Change the Expand to Collapse state.
             var hierarchyCell = $(e.masterRow).find(".k-hierarchy-cell");
    
             var span = $(hierarchyCell).find(".expand");
             span.text("Collapse");
             span.removeClass("expand").addClass("collapse");
        }
        function onDetailCollapse(e){ // Change the Collapse to Expand state.
            var hierarchyCell = $(e.masterRow).find(".k-hierarchy-cell");
    
             var span = $(hierarchyCell).find(".collapse");
             span.text("Expand");
             span.removeClass("collapse").addClass("expand");
        }
    </script>
```
```Style.css
    <style>
        /* Update Expand icon. */
        .k-i-expand:before {
          content: "\e11e";
        }
        /* Update Collapse icon. */
        .k-i-collapse:before {
          content: "\e121";
        }
        /* Set a width for the hierarchy column, otherwise the column you swap it with will be shrunk. */
        .k-grid .k-hierarchy-col {
          width: 70px;
        }
        /* Update the Collapse icon's not state. */
        .collapse:not(.show) {
            display: inline;
        }
        /* Set inline display to the icon to have the text and the icon on the same line. */
        .k-grid .k-hierarchy-cell>.k-icon{
          display: inline;
        }
    </style>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on updating and adding both the Expand and Collapse icons for the Hierarchy Grid](https://netcorerepl.telerik.com/GnuPvvcu03wZcuCT49).

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Add and Update the Expand and Collapse icons to the Grid](https://netcorerepl.telerik.com/GnuPvvcu03wZcuCT49)