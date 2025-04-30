---
title: Color Alternating Rows when Exporting Grid to Excel
page_title: Color Alternating Rows when Exporting Grid to Excel
description: "Customize the Excel document the {{ site.product }} Grid generates during exporting and color alternating rows in {{ site.framework }} applications."
previous_url: /helpers/data-management/grid/how-to/Export/alternating-rows,  /html-helpers/data-management/grid/how-to/Export/alternating-rows
slug: howto_alternatingrows_aspnetmvcgrid
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

How can I color the alternating rows in the Excel file that contains the Grid data?

## Solution

The example relies on the following key steps:

1. Handle the [`ExcelExport`](/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event of the Grid:

    ```HtmlHelper
    .Events(e => e.ExcelExport("excelExport"))
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid" on-excel-export="excelExport">
    </kendo-grid>
    ```
    {% endif %}

1. Within the `ExcelExport` event handler, loop through the rows in the sheet, select each alternating row, and set the [`background`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.background) option of each cell to the desired color:

    ```JS
        function excelExport(e) {
            var sheet = e.workbook.sheets[0];
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                if (rowIndex % 2 == 0) {
                    var row = sheet.rows[rowIndex];
                    for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                        row.cells[cellIndex].background = "#aabbcc";
                    }
                }
            }
        }
    ```

To review the complete example, refer to the ASP.NET MVC project on [coloring alternating rows in the Grid Excel exports](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridAlternatingRows).{% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

{% if site.mvc %}
> The solution requires Telerik UI for ASP.NET MVC 2014.3.1125 version or later. Earlier versions do not expose the `ExcelExport` event through the fluent API.
{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
