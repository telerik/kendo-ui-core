---
title: Server-side Processing
page_title: Server-side processing of Kendo UI Spreadsheet data | Kendo UI Documentation
description: How to process Kendo UI Spreadsheet data using the Telerik Document Processing library
---

# Server-side Processing with the Telerik Document Processing Library

The native data format for the Spreadsheet widget is [JSON](json). There is also built-in support for [exporting to Excel](/web/spreadsheet/import-and-export-data/export-to-excel) that runs in the browser.

For anything beyond that, we ship a .NET based server-side module based on [Telerik RadSpreadProcessing](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview), part of the Document Processing Library.

It allows importing, exporting and processing data from various formats:
* Excel Microsoft Office Open XML Spreadsheet (.xlsx)
* Comma separated values (.csv)
* Tab separated values (.txt)
* Portable document format (.pdf) (export only)

# Overview

The .NET server-side module is distributed distributed as part of the [UI for ASP.NET MVC bundle](/aspnet-mvc/introduction).

In the ZIP bundle you'll find a `spreadsheet` folder that contains assemblies for both .NET 4.0 and .NET 4.5.
You need to include a reference to the `Telerik.Web.Spreadsheet.dll` assembly for the respective framework version.

> A NuGet package will be provided in time for the official release of the Spreadsheet widget.

The main entry point for the project is the `Telerik.Web.Spreadsheet.Workbook` class.
This is a POCO object that mirrors the object structure of the JSON and provides format conversion methods.
Under the hood it uses the Telerik DPL to perform the actual conversion.

# Licensing

The DPL module is available with the Kendo UI Enterprise and DevCraft bundles.

# Supported Scenarios

The following section contains typical usage scenarios, as they would appear in an ASP.NET MVC application.

> There's no strict dependency on the type of server framework used.
  Popular choices like MVC, WebAPI and WebForms will work equally well.

## Load data from an external file

The following controller action will load a file from the file system and convert it to a Workbook for serialization.
Supported file extensions are .xlsx, .csv, .txt and .json


```cs
public ActionResult Load()
{
    var workbook = Telerik.Web.Spreadsheet.Workbook.Load("path/to/document.xlsx");
    return Json(workbook);
}
```

## Save a Workbook to an external file

Here we will will load a file from the file system and convert it to a Workbook for serialization.

Supported file extensions are .xlsx, .csv, .txt, .pdf and .json

```cs
[HttpPost]
public ActionResult Save(Telerik.Web.Spreadsheet.Workbook workbook)
{
    workbook.Save("path/to/document.xlsx");
    return new EmptyResult();
}
```

## Convert a DPL Document to a Workbook

The Telerik Document Processing Library provides a full-blown model for a spreadsheet document.
You can convert it to Telerik.Web.Spreadsheet.Workbook if you want to display the result in the Kendo UI Spreadsheet widget.


```cs
    var document = new Telerik.Windows.Documents.Spreadsheet.Model.Workbook();
    var worksheet = document.Worksheets.Add();
    worksheet.Cells[0, 0].SetValue("1.23");

    return Telerik.Web.Spreadsheet.Workbook.FromDocument(document);
```

## Convert a Workbook to a DPL Document

Conversely, you can start of with a Kendo UI Spreadsheet model (Telerik.Web.Spreadsheet.Workbook) and convert it to a DPL Document.
It can be then further processed, converted and stored as needed.


```cs
[HttpPost]
public ActionResult Process(Telerik.Web.Spreadsheet.Workbook workbook)
{
    var document = workbook.ToDocument();

    // Continue with the DPL API as usual...
    var worksheet = document.ActiveWorksheet;
    var A1Cell = new CellIndex(0, 0);
    var B2Cell = new CellIndex(1, 1);

    worksheet.Cells[A1Cell, B2Cell].Merge();

    return new EmptyResult();
}
```

# Further reading

The full documentation of the [RadSpreadProcessing module](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview) is available as part of the [UI for WPF](http://docs.telerik.com/devtools/wpf/introduction).
