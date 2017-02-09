---
title: Telerik Document Processing
page_title: Telerik Document Processing | Telerik UI for ASP.NET MVC
description: "Import and export content between different formats and work with archive files by using Telerik Document Processing."
slug: docsprocessing_aspnetmvc
previous_url: /doc-processing
position: 11
---

# Telerik Document Processing

Telerik Document Processing is a set of UI-independent and cross-platform libraries that let you process content between different formats and work with archive files.

## List of Libraries

Telerik Document Processing includes the following available libraries:

* [**RadPdfProcessing**](http://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview) Create, import, and export PDF documents.
* [**RadSpreadProcessing**](http://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) Create, import, and export XLSX, CSV and TXT spreadsheet documents, and export them to PDF.
* [**RadSpreadStreamProcessing**](http://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) Export large XLSX and CSV spreadsheet documents with low memory footprint and great performance.
* [**RadWordsProcessing**](http://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/overview) Create, import, and export DOCX, HTML, RTF and TXT documents, and export them to PDF.
* [**RadZipLibrary**](http://docs.telerik.com/devtools/document-processing/libraries/radziplibrary/overview) Compress and decompress ZIP files.

## Supported File Formats

The Telerik Document Processing libraries support the following file formats:

* CSV
* DOCX
* HTML
* PDF
* RTF
* TXT
* XLSX
* ZIP

## Available Assemblies

Telerik Document Processing supports .NET 4 and .NET 4.5. To handle the demands of your project, take the required assembly from the **Bin40** or **Bin45** folder respectively:

* **Telerik.Windows.Documents.Core.dll** The main assembly from the Telerik Document Processing libraries. It is required when intending to use the library.
* **Telerik.Windows.Documents.Flow.dll** The assembly is part of the words (text) processing library. It is required for processing HTML, DOCX, RTF, and TXT documents.
* **Telerik.Windows.Zip.dll** The assembly is required when working with zipped formats, such as DOCX and XLSX, and PDF.
* **Telerik.Windows.Documents.Flow.FormatProviders.Pdf** The assembly allows for exporting of flow documents, such as DOCX and RTF, to PDF.
* **Telerik.Windows.Documents.Spreadsheet.dll** The main assembly for spreadsheet processing. It is required when processing XLSX, CSV, and TXT documents.
* **Telerik.Documents.SpreadsheetStreaming.dll** The main assembly for generating huge spreadsheet files and using minimum resources.
* **Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.dll** The assembly is required when processing XLSX documents.
* **Telerik.Windows.Documents.Fixed.dll** The assembly is required when processing PDF documents.
* **Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf.dll** The assembly is required when processing PDF documents.
* **Telerik.Windows.Zip.dll** The assembly of the [**Telerik Zip Library**](http://demos.telerik.com/aspnet-ajax/ziplibrary/examples/overview/defaultcs.aspx). It is required when working with zipped formats, such as DOCX and XLSX, and PDF.
* **Telerik.Windows.Zip.Extensions.dll** The assembly extends **Telerik.Windows.Zip** with additional helper methods (Zip Extensions).

## Licensing

Telerik Document Processing is available as part of the following suites:

* DevCraft
* Telerik UI for ASP.NET AJAX
* Telerik UI for ASP.NET MVC
* Telerik UI for WPF
* Telerik UI for WinForms
* Telerik UI for Silverlight

## See Also

* [Get Started with Telerik Document Processing](http://docs.telerik.com/devtools/document-processing/installation-and-deployment/installing-on-your-computer)
* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET Core Overview](http://docs.telerik.com/aspnet-core/introduction)
