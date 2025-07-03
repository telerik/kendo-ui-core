---
title: Customizing the Excel Export Filename of the Grid by Adding Current Date and Time
description: How can I add the current date and time to the Excel export filename of the {{ site.product }} Grid?
type: how-to
page_title: Customize The Excel Filename of the Grid
slug: grid-export-custom-file-name
tags: grid, export, custom, file, name, excel
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I add the current date and time to the Excel export filename of the Grid when working with the {{ site.product }} components?

## Solution
Use the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event which has the workbook in its event data to rename it.

With the help of the [`kendo.toString()`](https://docs.telerik.com/kendo-ui/globalization/intl/dateformatting) method or another way to format the date, concatenate the date to the filename.

```Razor Index.cshtml
@(Html.Kendo().Grid<GridExportCustomName.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.OrderID);
        columns.Bound(e => e.Freight);
    })
    .ToolBar(t => 
    {
        t.Excel();
    })
    .Events(ev=>ev.ExcelExport("onExcelExport"))
    .DataSource(dataSource => dataSource
        .Custom()
        .Type("odata-v4")
        .Transport(transport =>
           transport.Read(read => read.Url("https://demos.telerik.com/service/v2/odata/Orders"))
        )
        .PageSize(10)
    )

)
```
```JS script.js
    function onExcelExport(e) {
        e.workbook.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.xlsx";
    }
```

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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
