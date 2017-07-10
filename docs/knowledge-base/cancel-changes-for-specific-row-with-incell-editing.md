---
title: Cancel Changes Per Row by Using the Incell Editing Mode of the Grid
description: An example on how to cancel the changes for a specific Kendo UI Grid row when the Grid is in the incell editing mode.
type: how-to
page_title: Cancel Changes for Specific Grid Row in Incell Editing Mode | Kendo UI Grid
slug: cancel-changes-for-specific-row-with-incell-editing
tags: grid, editing
ticketid: 1111657
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>58.0.3029.110</td>
 </tr>
</table>

 
## Description

I am using a Grid with a remote Datasource with the `batch:true` setup. The Grid is in the incell editing mode. The toolbar of the Grid has the `create`, `save,` and `cancel` commands. The problem is that the `cancel` command discards all made changes.

In other words, I need my Grid to have both of the following commands:  
1. The `cancel` command of the row which discards only the changes of the corresponding row, and   
1. The `cancel` command of the toolbar which discards all changes that are made.  

How can I provide a `cancel` command per row and at the same time keep the above configurations?

## Suggested Workarounds

The Kendo UI Grid does not provide a built-in solution for achieving this behavior.

However, you can still work around this issue by applying custom logic:

1. Add a custom button.
1. On the button click, get the item by `Uid`.
1. Call `cancelChanges` only for that item.

> **Important**
>
> This approach will prevent the item from being updated in the database. However, the old values will be visually reverted after `saveChanges`.  

For more details, refer to the following articles:  

* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-getByUid](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-getByUid)  
* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-cancelChanges](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-cancelChanges)  
* [http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#configuration-columns.command](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command)  

To resolve the resulting scroll-related issue, [restore the scroll position by using a custom approach](http://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#restore-scroll-positions). For a demo on how to implement this approach, refer to the [modified version of the previously provided example](http://dojo.telerik.com/iGEPE/2).

Because of the usage of a custom approach, the event is expected to cancel the changes for a specific row. I hope the button click event or another event to be suitable as well for executing the custom logic.  
