---
title: Export Detail Grids to Excel
page_title: Export Detail Grids to Excel | Kendo UI Grid HtmlHelper
description: "Export master and detail Grids in Excel using ASP.NET MVC."
slug: howto_detailgridexcelexport_aspnetmvcgrid
---

# Export Detail Grids to Excel

The example below demonstrates how to export the detail Grids and merge their workbooks with the master Grid workbook.

The project uses the [`excelExport`](/api/javascript/ui/grid#events-excelExport) event to get the workbook of the detail Grids. The event is prevented to avoid saving an Excel file for every detail Grid.

For more information on how to create Excel documents, refer to [this article]({% slug introduction_excelexport_kendoui %}#create-excel-document).

> **Important**
>
> This project requires UI for ASP.NET MVC version 2014.3.1125 and later. Earlier versions do not have the `ExcelExport` event exposed through the fluent API.

To see the example on how to export all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export).

To see the example on how to export all pages and all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export-all-pages-all-details).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Color Alternating Rows]({% slug howto_alternatingrows_aspnetmvcgrid %})
* [How to Export Multiple Grids to Excel]({% slug howto_multiplegridexport_aspnetmvcgrid %})
* [How to Format Cells during Excel Export]({% slug howto_cellformat_aspnetmvcgrid %})
* [How to Use the Column Template]({% slug howto_columntemplatexport_aspnetmvcgrid %})

For more runnable examples on the Kendo UI Grid HtmlHelper, browse the [how-to section of articles]({% slug howto_bindgridtodatatable_gridaspnetmvc %}).
