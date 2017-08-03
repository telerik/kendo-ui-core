---
title: Excel Export With Header, Footer or Group Header Template Results In HTML Content
description: How To Export Only the Text of the HTML content in the Grid Cell
type: howto
page_title: Export Only the Text From the Grid Cell Which Contains HTML
slug: export-only-the-text-from-the-grid-cell-which-contains-html
position: 0
tags: grid, excel, export, encoded
teampulseid:
ticketid: 1123086
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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
If we design the grid header, footer or group header template with html tag, the whole html content is displayed in the excel file. Please advice how to solve this, need to show only the data.

## Solution  
  
The desired result can be achieved on the [excelExport](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event, by setting only the text value to the cells using jQuery.
  
A runnable example can be found [here](http://dojo.telerik.com/EtESI).
