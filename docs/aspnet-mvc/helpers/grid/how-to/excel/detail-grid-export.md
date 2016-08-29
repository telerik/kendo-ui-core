---
title: Export Detail Grids to Excel
page_title: Export Detail Grids to Excel | Kendo UI Grid HtmlHelper
description: "Export master and detail Grids in Excel using ASP.NET MVC."
slug: howto_detailgridexcelexport_aspnetmvcgrid
---

# Export Detail Grids to Excel

The demo on how to export the detail Grids and merge their workbooks with the master Grid workbook uses the [`excelExport`](/api/javascript/ui/grid#events-excelExport) event to get the workbook of the detail Grids. The event is prevented to avoid saving an Excel file for every detail Grid.

To see the example on how to export all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export).

To see the example on how to export all pages and all expanded detail Grids, refer to [this Visual Studio project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export-all-pages-all-details).

> **Important**
>
> These projects require UI for ASP.NET MVC version 2014.3.1125 and later. Earlier versions do not have the `ExcelExport` event exposed through the fluent API.

For more information on how to create Excel documents, refer to [this article]({% slug introduction_excelexport_kendoui %}#create-excel-document).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_bindgridtodatatable_gridaspnetmvc %}).
