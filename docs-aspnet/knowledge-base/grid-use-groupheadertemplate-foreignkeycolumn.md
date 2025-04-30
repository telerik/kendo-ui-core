---
title: Use GroupHeaderTemplate in the ForeignKey Column of a Grid
page_title: Use GroupHeaderTemplate in the ForeignKey Column of a Grid
description: "Modify the default group header of a ForeignKey column in a {{ site.product }} Grid."
previous_url: /helpers/data-management/grid/how-to/Appearance/use-groupheadertemplate-foreignkeycolumn, /html-helpers/data-management/grid/how-to/Appearance/use-groupheadertemplate-foreignkeycolumn
slug: howto_usegroupheadertemplate_foreignkeycolumn_gridaspnetmv
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I modify the default group header of the `ForeignKey` Grid column?

## Solution

You can achieve this requirement using the following implementation:

1. Create a groupable Grid and define a `ForeignKey` column with `ClientGroupHeaderTemplate` option:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridForeignKeyGroupHeaderTemplate.Models.Order>()
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(p => p.OrderID);
            columns.ForeignKey(p => p.EmployeeId, (System.Collections.IEnumerable)ViewData["employees"], "EmployeeId", "Name")
                .ClientGroupHeaderTemplate("#= values[value] #");
            columns.Bound(p => p.OrderDescription);
            columns.Bound(p => p.OrderDate);
        })
        .Groupable()
        ... // Additional configuration options.
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .ServerOperation(false)
            .Model(model => {
                model.Id(p => p.OrderID);
                model.Field(p => p.OrderID).Editable(false);
            })
            .Read(read => read.Action("ForeignKeyColumn_Read", "Home"))
            .Update(update => update.Action("ForeignKeyColumn_Update", "Home"))
        )
    )
    ```

1. When the page with the Grid is loaded, get a reference to the Grid, access the data of the `ForeignKey` column, and populate the `values` object that is referenced in the `ClientGroupHeaderTemplate` option:

    ```JS
    var values = {};

    $(function () {
        var grid = $("#Grid").data("kendoGrid");
        var fieldName = "EmployeeId";
        var columns = grid.columns;
        var columnIndex = getColumnIndex(fieldName, columns);
        var foreignData = columns[columnIndex].values;
        for (var i = 0; i < foreignData.length; i++) {
            values[foreignData[i].value] = foreignData[i].text;
        }
    });

    function getColumnIndex(fieldName, columns) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].field === fieldName) {
                return i;
            }
        }
    }
    ```

To review the complete example, refer to the [project on how to use the `GroupHeaderTemplate` option in a `ForeignKey column configuration](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridForeignKeyGroupHeaderTemplate) when using the Grid in ASP.NET MVC applications.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

