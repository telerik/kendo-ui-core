---
title: Document Processing Libraries
page_title: Document Processing Libraries| Download and Installation | Telerik UI for ASP.NET Core
description: "Get started with Telerik UI for ASP.NET Core and import and export content between different formats and work with archive files by using Telerik Document Processing."
slug: document_processing_core
position: 11
---

# Telerik Document Processing

Telerik Document Processing is a set of UI-independent and cross-platform libraries that let you process content between different formats and work with archive files.

## List of Libraries

Telerik Document Processing includes the following libraries:

* [RadPdfProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview)&mdash;Create, import, and export PDF documents.
* [RadSpreadStreamProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview)&mdash;Export large `XLSX` and `CSV` spreadsheet documents with low memory footprint and great performance.
* [RadWordsProcessing](http://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/overview)&mdash;Create, import, and export `DOCX`, `HTML`, `RTF`, and `TXT` documents, and export them to PDF.
* [RadZipLibrary](http://docs.telerik.com/devtools/document-processing/libraries/radziplibrary/overview)&mdash;Compress and decompress `ZIP` files.

## Supported File Formats

The Telerik Document Processing libraries support the following file formats:

* `CSV`
* `DOCX`
* `HTML`
* `PDF`
* `RTF`
* `TXT`
* `XLSX`
* `ZIP`

## Available NuGet Packages

Telerik Document Processing supports [.NET Framework 4.0](https://dotnet.microsoft.com/download/dotnet-framework/net40) and [.NET Standard 2.0](https://github.com/dotnet/standard/blob/master/docs/versions/netstandard2.0.md). You can take the required packages from the `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <version>\dpl` installation folder of the dpl product.

* `Telerik.Windows.Documents.Core.nupkg`&mdash;The main NuGet package from the Telerik Document Processing libraries. Required when you plan to use the library.
* `Telerik.Windows.Documents.Flow.nupkg`&mdash;The package is part of the Word (text) processing library. Required for processing `HTML`, `DOCX`, `RTF`, and `TXT` documents.
* `Telerik.Windows.Documents.Flow.FormatProviders.Pdf.nupkg`&mdash;The package allows for exporting flow documents, such as `DOCX` and `RTF`, to PDF.
* `Telerik.Documents.SpreadsheetStreaming.nupkg`&mdash;The main package for generating huge spreadsheet files while using minimum resources.
* `Telerik.Windows.Documents.Fixed.nupkg`&mdash;The package is required when processing PDF documents.
* `Telerik.Windows.Zip.nupkg`&mdash;The package is required when working with zipped formats, such as `DOCX` and `XLSX`, and PDF.

## Licensing

Telerik Document Processing is available as part of the following suites:

* DevCraft
* Telerik UI for ASP.NET AJAX
* Telerik UI for ASP.NET MVC
* Telerik UI for ASP.NET Core
* Telerik UI for WPF
* Telerik UI for WinForms
* Telerik UI for Silverlight

## See Also

* [Get Started with Telerik Document Processing](http://docs.telerik.com/devtools/document-processing/installation-and-deployment/installing-on-your-computer)
* [Telerik UI for ASP.NET Core Overview]({% slug overview_aspnetmvc6_aspnetmvc %})
