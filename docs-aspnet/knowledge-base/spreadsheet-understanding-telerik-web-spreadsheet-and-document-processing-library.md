---
title: Understanding Telerik.Web.Spreadsheet and Document Processing Library Spreadsheet Workbook and Worksheets
description: Learn how convert an exported Workbook and Worksheets at the server-side from Telerik.Web.Spreadsheet to Document Processing Library Spreadsheet.
type: how-to
page_title: Converting Telerik Telerik.Web.Spreadsheet Workbook and Worksheets to Document Processing Library 
slug: spreadsheet-understanding-telerik-web-spreadsheet-and-document-processing-library
tags: spreadsheet, converting, workbook, worksheet, telerik.web.spreadsheet, dpl, document processing, back-end, server 
res_type: kb
---

## Description

I have implemented a [Spreadsheet Server Export](https://demos.telerik.com/aspnet-core/spreadsheet/server-side-import-export) however I need to convert the exported Workbook to be usable with your [Document Processing Library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-workbooks/working-with-workbooks-what-is-workbook) so I can modify it further. How can I achieve this?

## Differences

The assemblies from the Telerik.Web.Spreadsheet(later referred as **{{ site.framework_short }}**) suite and Document Processing Library(later referred as **DPL**) both have Workbook and Worksheet classes which have different capabilities.

- [{{ site.framework_short }} Worksheet server-side API](https://docs.telerik.com/devtools/aspnet-ajax/controls/spreadsheet/server-side-programming/overview#telerikwebspreadsheetworksheet-properties-and-methods)
- [{{ site.framework_short }} Row server-side API](https://docs.telerik.com/devtools/aspnet-ajax/controls/spreadsheet/server-side-programming/overview#telerikwebspreadsheetrow-properties-and-methods)
- [{{ site.framework_short }} Cell server-side API](https://docs.telerik.com/devtools/aspnet-ajax/controls/spreadsheet/server-side-programming/overview#telerikwebspreadsheetcell-properties)
- [DPL Worksheet Documentation](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-worksheets/what-is-worksheet)
- [DPL Cells Documentation](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/what-is-cell)
- [DPL Rows and Columns Documentation](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-rows-and-columns/what-is-row-column)
- [DPL Workbook API](https://docs.telerik.com/devtools/document-processing/api/Telerik.Windows.Documents.Spreadsheet.Model.Workbook.html)
- [DPL Worksheet API](https://docs.telerik.com/devtools/document-processing/api/Telerik.Windows.Documents.Spreadsheet.Model.Worksheet.html)
- [DPL Sheet API](https://docs.telerik.com/devtools/document-processing/api/Telerik.Windows.Documents.Spreadsheet.Model.Sheet.html)
- [DPL Cells API](https://docs.telerik.com/devtools/document-processing/api/Telerik.Windows.Documents.Spreadsheet.Model.Cells.html)
- [DPL CellSelection API](https://docs.telerik.com/devtools/document-processing/api/Telerik.Windows.Documents.Spreadsheet.Model.CellSelection.html)


## Converting from One to the Other

The Workbook and worksheets from the {{ site.framework_short }} and DPL are not interchangeable. Nevertheless, the {{ site.framework_short }} Workbook class has some methods that allow converting from one to another and vice-versa:

- An instance method .ToDocument() that all allows any {{ site.framework_short }} Workbook instance to be converted to a DPL Workbook;
- A static method Workbook.FromDocument() that allows any DPL Workbook to be converted to {% if site.core %}a{% else %}an{% endif %} {{ site.framework_short }} Workbook;

````C#
using System;
using DPL = Telerik.Windows.Documents.Spreadsheet.Model;
using {{ site.framework_short }} = Telerik.Web.Spreadsheet;
using System.Collections.Generic;

// {{ site.framework_short }} to Document Processing Library
{{ site.framework_short }}.Workbook {{ site.framework_short }}Workbook = new {{ site.framework_short }}.Workbook();
{{ site.framework_short }}.Worksheet {{ site.framework_short }}Worksheet = {{ site.framework_short }}Workbook.AddSheet();
 
{{ site.framework_short }}.Row row = new {{ site.framework_short }}.Row() { Index = 2, Cells = new List<{{ site.framework_short }}.Cell> { } };
row.AddCell(new {{ site.framework_short }}.Cell() { Index = 2, Value = "Test cell" });
{{ site.framework_short }}Worksheet.AddRow(row);
 
DPL.Workbook dplWorkbook = {{ site.framework_short }}Workbook.ToDocument();
DPL.Sheet dplSheet = dplWorkbook.Sheets[0];
DPL.Worksheet dplWorksheet =  dplWorkbook.Worksheets[0];
 
// Document Processing Library to {{ site.framework_short }}
{{ site.framework_short }}.Workbook converted{{ site.framework_short }}Workbook = {{ site.framework_short }}.Workbook.FromDocument(dplWorkbook);
{{ site.framework_short }}.Worksheet converted{{ site.framework_short }}Worksheet = converted{{ site.framework_short }}Workbook.Sheets[0];
 
// value is "Test cell"
string value = converted{{ site.framework_short }}Worksheet
    .Rows.Find(r=> r.Index == 2)
    .Cells.Find(c=> c.Index == 2)
    .Value.ToString();
````

## More {{ site.framework }} Spreadsheet Resources

* [{{ site.framework }} Spreadsheet Documentation]({%slug htmlhelpers_spreadsheet_aspnetcore %})

* [{{ site.framework }} Spreadsheet Demos](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)

{% if site.core %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-core-ui/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-mvc/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Server-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/spreadsheet)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)