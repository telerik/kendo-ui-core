---
title: Navigating Through Hierarchical Grid Rows with Tab Key
description: Learn how to navigate using the Tab key through the expanding arrows of the hierarchy rows in a {{ site.product }} Grid.
type: how-to
page_title: Navigating Through Hierarchical Grid Rows with Tab Key
slug: grid-navigate-hierarchy-rows
tags: grid, keyboard-navigation, hierarchy, rows, navigatable, tab-key, expanding, arrows
res_type: kb
ticketid: 1637778
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>{{ site.product }} Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

How can I enable `Tab` key navigation through the expanding arrows of the parent rows in a hierarchical Grid?

The [`Navigatable()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridbuilder#navigatablesystemboolean) option enables the keyboard navigation functionality of the Grid. When you focus on a cell that holds the expanding arrow of the parent row, you can use the `Arrow` keys to navigate through the expanding arrow cells vertically. In this article, you will learn how to implement a custom JavaScript logic to allow `Tab` key navigation through the cells with the expanding arrows.

## Solution

1. Enable the keyboard navigation functionality of the Grid by setting the `Navigatable()` in your Grid configuration.
1. Handle the [`click`](https://api.jquery.com/click/) event on the Grid's table cells with class `k-hierarchy-cell` and set the clicked cell as a current focused cell in the Grid.
1. Handle the [`keydown`](https://api.jquery.com/keydown/) event on the Grid's table. When the `Tab` key is pressed, prevent the default event action and manually set the focus to the expanding arrow cell of the next row.


```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        .ClientDetailTemplateId("clientDetailTemplate")
        .Navigatable()
        ...// Additional configuratiion.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" navigatable="true" detail-template-id="clientDetailTemplate">
        <!-- Additional configuratiion. -->
    </kendo-grid>

```
{% endif %}
```Scripts
    <script>
        $(document).ready(function () {
            var grid = $('#grid').data('kendoGrid');

            grid.table.on("click", ".k-hierarchy-cell", function () {
                grid.current($(this)); // Focus the expanding arrow cell when clicked.
            });

            grid.table.on('keydown', function (e) {
                if (e.keyCode === 9) { // Check if Tab key is pressed.
                    e.preventDefault();
                    var currentCell = grid.current(); // Get the current table cell.
                    var nextRow = $(currentCell).closest("tr").next(); // Get the next row element.
                    var cellOnNextRow = $(nextRow).find(`td:first`); // Get the first cell on the next row.
                    grid.current(cellOnNextRow); // Focus the cell with the expanding arrow.
                }
            });
        });
    </script>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/QovabVvL04DSpzlV45)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/QoPuFLbr060XUMbA15)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on vertically tabbing through the hierarchy cells of the Grid](https://netcorerepl.telerik.com/QovabVvL04DSpzlV45).
{% endif %}

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

* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
