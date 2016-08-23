---
title: Format Cells during Excel Export
page_title: Format Cells during Excel Export | Kendo UI Grid HtmlHelper
description: "Format the Excel cell values in the Kendo UI Grid for ASP.NET MVC."
slug: howto_cellformat_aspnetmvcgrid
---

# Format Cells during Excel Export

To format the cell values, set the [`format`](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The page on how to [create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats supported by Excel.

> **Important**
>
> This project requires UI for ASP.NET MVC version 2014.3.1125 and later. Earlier versions do not have the `ExcelExport` event exposed through the fluent API.

To see the example on how to format Grid cells during Excel export, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/cell-format-excel).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_bindgridtodatatable_gridaspnetmvc %}).
