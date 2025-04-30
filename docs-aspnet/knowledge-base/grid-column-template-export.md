---
title: Use Column Templates when Exporting Grid to Excel
page_title: Use Column Templates when Exporting Grid to Excel
description: "Use column templates in the exported Excel file when using {{ site.product }} Grid."
previous_url: /helpers/data-management/grid/how-to/Export/column-template-export, /html-helpers/data-management/grid/how-to/Export/column-template-export
slug: howto_columntemplatexport_aspnetmvcgrid
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

How can I use column templates when exporting Grid's data to Excel?

## Solution

The example relies on the following key steps:

1. Add the column in the Grid that has a template:

    ```HtmlHelper
    columns.Bound(p => p.Freight).ClientTemplate("Freight: #: kendo.format('{0:c}', Freight) #");
    ```
    {% if site.core %}
    ```TagHelper
    <column field="Freight" template="Freight: #: kendo.format('{0:c}', Freight) #"/>
    ```
    {% endif %}

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
    
1. Within the `ExcelExport` event handler, loop through the data items of the DataSource, select the row and cell in the sheet by index, and use the [`kendo.template()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) method to specify the column template as a value of the cell.

    ```JS
    function excelExport(e) {
        var sheet = e.workbook.sheets[0];
        var template = kendo.template(this.columns[1].template);
        var data = this.dataSource.view();

        for (var i = 0; i < data.length; i++) {
            sheet.rows[i + 1].cells[1].value = template(data[i]);
        }
    }
    ```

To review the complete example, refer to the ASP.NET MVC project on [using column templates in the Grid Excel exports](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridExcelExportColumnTemplate).{% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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
