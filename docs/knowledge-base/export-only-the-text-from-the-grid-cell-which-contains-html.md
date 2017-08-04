---
title: Excel Export With Header, Footer or Group Header Template Results In HTML Content
description: How To Export Only the Text of the HTML content in the Grid Cell
type: howto
page_title: Export Only the Text From the Grid Cell Which Contains HTML
slug: export-only-the-text-from-the-grid-cell-which-contains-html
tags: grid, excel, export, encoded
ticketid: 1123086
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Version 11.0.9600.18537</td>
 </tr>
</table>

## Description

When I style the header, footer, or group header template of the Grid by using HTML tags, the Excel files renders the whole HTML content.

How can I avoid the display of HTML content in the output Excel file and show just the data?

## Solution  

Configure the [`excelExport`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event by setting only the text value to the cells with jQuery.

For the full implementation of the solution, refer to [this Dojo](http://dojo.telerik.com/EtESI).
