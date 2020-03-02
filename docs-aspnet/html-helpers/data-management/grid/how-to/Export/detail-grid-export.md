---
title: Export Detail Grids to Excel
page_title: Export Detail Grids to Excel
description: "Export master and detail Grids in Excel using ASP.NET MVC."
previous_url: /helpers/data-management/grid/how-to/Export/detail-grid-export
slug: howto_detailgridexcelexport_aspnetmvcgrid
---

# Export Detail Grids to Excel

The demo on how to export the detail Grids and merge their workbooks with the master Grid workbook uses the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event to get the workbook of the detail Grids.

The event is prevented to avoid saving an Excel file for every detail Grid.

To see the example on how to export all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export).

To see the example on how to export all pages and all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export-all-pages-all-details).

> These projects require a UI for ASP.NET MVC 2014.3.1125 version or later. Earlier versions do not expose the `ExcelExport` event through the fluent API.

For more information on how to create Excel documents, refer to [this article](https://docs.telerik.com/kendo-ui/framework/excel/introduction#create-excel-document).

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
