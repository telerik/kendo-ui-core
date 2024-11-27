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

To see the example on how to export all expanded detail Grids on the current page, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchyExcelExportAllPages/Views/Home/OnlyCurrentPage.cshtml).

To see the example on how to export all pages and all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchyExcelExportAllPages/Views/Home/Index.cshtml).

> Versions of UI for ASP.NET MVC older than 2014.3.1125 do not expose the `ExcelExport` event through the fluent API.

For more information on how to create Excel documents, refer to [this article](https://docs.telerik.com/kendo-ui/framework/excel/introduction#create-excel-document).

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridbuilder)
