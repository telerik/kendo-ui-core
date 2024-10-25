---
title: Changing Hover Color of Grid Rows
description: An example on how to change the default hover color of the Telerik UI for {{ site.framework }} Grid rows.
type: how-to
page_title: Changing Hover Color of Grid Rows
slug: grid-rows-hover-color
tags: grid, rows, hover, color, locked, frozen, columns, table, telerik, core, mvc
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
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I customize the hover color of the Telerik UI for {{ site.framework }} Grid rows when using standard and frozen (locked) columns?

* [Using default Grid columns](#using-default-grid-columns)
* [Using frozen Grid columns](#using-frozen-grid-columns)

## Solution

### Using Default Grid Columns

To adjust the default hover color of the Grird rows, which comes from the used Kendo UI theme, apply the following CSS styles:

* If the Grid rows are not selectable (the `Selected()` option is not enabled):
    ```CSS
        <style>
            /* Replace "Grid" with the Name() of the Grid */
            #Grid .k-table-tbody > .k-table-row:hover,
            #Grid .k-table-tbody > .k-table-row.k-hover {
                background-color: #a5e8e5;
            }
        </style>
    ```

* If the Grid rows are selectable (the `Selected()` option is enabled):
    ```CSS
        <style>
            /* Replace "Grid" with the Name() of the Grid */
            #Grid .k-grid-content .k-selected.k-alt td:hover,
            #Grid .k-grid-content .k-selected td:hover {
                background-color: #a5e8e5;
            }

            /* Replace "Grid" with the Name() of the Grid */
            #Grid .k-table-tbody > .k-table-row:hover,
            #Grid .k-table-tbody > .k-table-row.k-hover {
                background-color: #a5e8e5;
            }
        </style>
    ```

Refer to the [following REPL sample](https://netcorerepl.telerik.com/QxarQJYs29cDcdNA02) for a live demo of this example.

### Using Frozen Grid Columns

When the Grid is configured with frozen (locked) columns, the Grid creates separate tables for its locked and scrollable sections. The locked columns are generated inside the `.k-grid-content-locked` element, and the scrollable content is inside the `.k-grid-content` element.

By design, when the user hovers over a specified row in the locked Grid table, the row is highlighted only within the locked table. In order to highlight the entire hovered row (within the locked and scrollable tables), use the following approach:

1. Handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event of the Grid and subscribe to the `hover` event of both locked and scrollable tables.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("Grid")
            .Events(ev => ev.DataBound("onDataBound"))
            ...
        )

    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="Grid" on-data-bound="onDataBound">
            ...
        </kendo-grid>

    ```
    {% endif %}
    ```Script
        function onDataBound(e) {
            // Replace "Grid" with the Name() of the Grid.
            $("#Grid .k-grid-content-locked table tbody tr").hover(function() { // Hovering the rows within the locked table.
                ...
            });

            // Replace "Grid" with the Name() of the Grid.
            $('#Grid .k-grid-content table tbody tr').hover(function() { // Hovering the rows within the scrollable table.
                ...
            });
        }
    ```
1. In the `hover` event handler of the Grid tables, toggle a cusom class to the hovered row from the respective table. Set the desired hover color to the custom class with CSS.

    ```Script
        function onDataBound(e) {
            $("#Grid .k-grid-content-locked table tbody tr").hover(function() {
                    var uid = $(this).attr("data-uid");
                    var gridRow = $(".k-grid .k-grid-content").find("[data-uid='" + uid + "']");
                    $(gridRow).toggleClass("custom-hover");
                    $(this).toggleClass("custom-hover");
            });
            $('#Grid .k-grid-content table tbody tr').hover(function() {
                    var uid = $(this).attr("data-uid");
                    var lockedrow = $(".k-grid .k-grid-content-locked").find("[data-uid='" + uid + "']");
                    $(lockedrow).toggleClass("custom-hover");
                    $(this).toggleClass("custom-hover");
            });
        }
    ```
    ```Styles
        <style>
            .custom-hover{
                background-color: #a5e8e5 !important;
                opacity: 0.6;
            }
        </style>
    ```

If the Grid rows are selectable (the `Selected()` option is enabled), apply the following CSS styles:

    ```
        <style>
            /* selected row color in both locked and scrollable tables */
            /* Replace "Grid" with the Name() of the Grid */
            #Grid .k-grid-content-locked .k-selected.k-alt td,
            #Grid .k-grid-content .k-selected.k-alt td,
            #Grid .k-grid-content-locked .k-selected td,
            #Grid .k-grid-content .k-selected td {
                background-color: #a5e8e5;
            }

            /* selected row hover color in both locked and scrollable tables */
            #Grid .k-grid-content-locked .k-selected.k-alt td:hover,
            #Grid .k-grid-content .k-selected.k-alt td:hover,
            #Grid .k-grid-content-locked .k-selected td:hover,
            #Grid .k-grid-content .k-selected td:hover {
                background-color: #a5e8e5;
            }
        </style>
    ```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on highlighting the entire hovered row when using frozen (locked) Grid columns](https://netcorerepl.telerik.com/cRkVQpOX04aXnQBZ18).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

