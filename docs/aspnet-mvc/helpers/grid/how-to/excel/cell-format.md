---
title: Format Cells during Excel Export
page_title: Format Cells during Excel Export | Kendo UI Grid HtmlHelper
description: "Format the Excel cell values in the Kendo UI Grid for ASP.NET MVC."
slug: howto_cellformat_aspnetmvcgrid
---

# Format Cells during Excel Export

To format the cell values, set the [`format`](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The page on how to [create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats supported by Excel.

> **Importnat**
>
> This project requires UI for ASP.NET MVC version 2014.3.1125 and later. Earlier versions do not have the `ExcelExport` event exposed through the fluent API.

To see the example on how to format Grid cells during Excel export, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/cell-format-excel).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Color Alternating Rows]({% slug howto_alternatingrows_aspnetmvcgrid %})
* [How to Export Detail Grids to Excel]({% slug howto_detailgridexcelexport_aspnetmvcgrid %})
* [How to Export Multiple Grids to Excel]({% slug howto_multiplegridexport_aspnetmvcgrid %})
* [How to Use the Column Template]({% slug howto_columntemplatexport_aspnetmvcgrid %})

For more runnable examples on the Kendo UI Grid HtmlHelper, browse the [how-to section of articles]({% slug howto_bindgridtodatatable_gridaspnetmvc %}).
