---
title: Grid: Cancel changes per row using the mode incell editing
description: How to cancel changes for specific row with incell editing
type: howto
page_title: How to Cancel Changes for Specific Row With Incell Editing
slug: how-to-cancel-changes-for-specific-row-with-incell-editing
position: 0
tags:grid, editing
teampulseid:
ticketid: 1111657
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
Hello,

I am using a grid with a remote Datasource that has batch : true. The grid is using the incell editing mode.  The grid toolbar has the commands: create, save and cancel.  
  
The problem is that the "cancel" command, discards "all" changes made. Is there a way to provide a cancel command per row, but with keeping the above configurations? In other words i need both commands in my grid  
1\. row cancel command, that discards only the changes of the corresponding row  
2\. and the cancel command on the toolbar that discards all changes  
  
is there a way to realise such a requirement? 

## Solution


The desired result is not fully supported from the Kendo UI Grid, but a similar result can be achieved via custom logic. I can suggest adding a custom button, and on the button click the get the item by Uid, and then call cancelChanges only for that item:  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-getByUid](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-getByUid)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-cancelChanges](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-cancelChanges)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#configuration-columns.command](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command)  
  
Please have in mind that this will prevent the item from being updated in the database, but visually the old values, will be reverted after saveChanges:  
  
The scroll related issue can be resolved using a custom approach to restoring the scroll position:  
  
[http://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance\#restore-scroll-positions](http://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#restore-scroll-positions)  
  
I modified the provided example to demonstrate this:  
  
[http://dojo.telerik.com/iGEPE/2](http://dojo.telerik.com/iGEPE/2)  
  
As for the event, it is expected, as this is a custom approach to cancel the changes for a specific row. I hope the button click event or another event to be suitable as well for executing the custom logic.  

## Suggested Workarounds

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
