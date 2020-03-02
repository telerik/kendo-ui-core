---
title: Export Only the Text out of the HTML Content from Header, Footer, or Group Header Templates
description: An example on how to export only the text out of the HTML content in a Grid cell to Excel.
type: how-to
page_title: Export Only Text From Grid Cells which Contain HTML | Kendo UI Grid for jQuery
slug: export-only-the-text-from-the-grid-cell-which-contains-html
tags: grid, excel, export, encoded
ticketid: 1123086
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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

Configure the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event by setting only the text value to the cells with jQuery.

For the full implementation of the solution, refer to [this Dojo](https://dojo.telerik.com/EtESI).
