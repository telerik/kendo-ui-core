---
title: Export the Grid to Excel after Confirmation
description: An example on how to export the Kendo UI Grid to Excel only after confirmation.
type: how-to
page_title: Export Grid to Excel only after Confirmation | UI for JSP
slug: export-the-grid-to-excel-only-after-confirmation
tags: grid, excel, export
ticketid: 1117057
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for JSP</td>
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

How can I implement a custom **Yes** or **No** confirmation message to the user on clicking the **Export to Excel** button where **Yes** exports the Grid and **No** cancels the task?

## Suggested Workarounds

The Kendo UI Grid does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

Apply custom logic on the `excelExport` event of the Grid. For more information, refer to:  

* [http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\/events/excelexport](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)  
* [http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\/methods/saveasexcel](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveasexcel)  

[This Dojo example](http://dojo.telerik.com/eWogO) demonstrates the full implementation of the scenario. The used approach exports the file when the user confirms the action and prevents the default behavior when the user clicks **Cancel**.  
