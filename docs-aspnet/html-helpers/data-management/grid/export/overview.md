---
title: Overview
page_title: Export Overview
description: "Get started with the {{ site.product_short }} Grid by Kendo UI and learn how to configure the export functionality of the widget."
slug: htmlhelpers_grid_aspnetcore_export_overview
position: 1
---

# Export Overview

By default, the Telerik UI Grid HtmlHelper for {{ site.framework }} provides a PDF and Excel export functionality.

For more information about the available export options of the Grid, refer to the articles on:
* [Excel export]({% slug excelexport_gridhelper_aspnetcore %})
* [PDF export]({% slug pdfexport_gridhelper_aspnetcore %})
* [Printing]({% slug printing_gridhelper_aspnetcore %})

Under the hood, most of the PDF export options use the Kendo UI for jQuery [Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/overview) and the Excel export builds a [`kendo.ooxml.Workbook`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook).

To enable the PDF and Excel Export functionality, add the following ToolBar configuration:

    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .ToolBar(tools=>
        {
            tools.Pdf();
            tools.Excel();
        })
    )

## See Also

* [Server-Side API](/api/grid)
