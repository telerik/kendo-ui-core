---
title: Detail Grid Excel Export
description: How to export master and detail grids in Excel using ASP.NET MVC
---

# Detail Grid Excel Export

This demo shows how to export the detail grids and merge their workbooks with the master grid workbook. The uses the [excelExport](/api/javascript/ui/grid#events-excelExport) event to get the
workbook of the detail grids. The event is prevented to avoid saving an Excel file for every detail grid. For additional info check [Create Excel Documents](/framework/excel/introduction#create-excel-document).

> This project requires UI for ASP.NET MVC version 2014.3.1125 and up. Earlier versions don't have the `ExcelExport` event exposed via the fluent API.

[Detail Grid Excel Export Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/detail-grid-excel-export)
