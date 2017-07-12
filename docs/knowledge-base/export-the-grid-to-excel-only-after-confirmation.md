---
title: Grid Export Excel
description: Export the Grid to Excel only after confirmation
type: how-to
page_title:How to Export the Grid to Excel Only After a Confirmation
slug: export-the-grid-to-excel-only-after-confirmation
position: 0
tags:grid, excel, export
teampulseid:
ticketid: 1117057
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for JSP</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 8 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr>
</table>

 
## Description
On click of export excel button how can I prompt a custom confirmation message to user with options saying yes or no. yes would export the excel and no would cancel the task.

## Solution
  
This can be achieved with a custom logic added on the excelExport event of the Grid:  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#events-excelExport](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#methods-saveAsExcel](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-saveAsExcel)  
  
I made a Dojo example demonstrating this. The approach is exporting the file when the user confirms the action and it is preventing the default behaviour when the user clicks cancel:  
  
[http://dojo.telerik.com/eWogO](http://dojo.telerik.com/eWogO)  