---
title: Format Cells during Export to Excel
page_title: Format Cells during Export to Excel | Kendo UI Grid HtmlHelper
description: "Format the Excel cell values in the Kendo UI Grid for ASP.NET MVC."
slug: howto_cellformat_aspnetmvcgrid
---

# Format Cells during Export to Excel

To format the cell values during the export of the Grid to Excel, set the [`format`](../../../../../kendo-ui/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The page on how to [create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats supported by Excel.

To see the example, refer to the project on how to [format the cells during the export of the Grid to Excel](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/cell-format-excel).

> **Important**
>
> These projects require a UI for ASP.NET MVC 2014.3.1125 version or later. Earlier versions do not expose the `ExcelExport` event through the fluent API.

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).
