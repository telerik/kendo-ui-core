---
title: Get Index Of Data In ListBox After Reorder
description: How to get the index of an ListBox item after reorder
type: how-to
page_title: Get Index Of Item In ListBox After Reorder
slug:get-index-of-item-in-listbox-after-reorder
position: 0
tags:listbox, datasource
teampulseid:
ticketid: 1112980
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>ListBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr>
</table>

 
## Description
We are unable to easily retrieve the index of each data item after we reorder the list. 

## Solution

Currently, the ListBox does not provide a built-in method to retrieve the indexed of a specific dataItem.  
  
The dataSource is providing the indexOf method, but the dataItems are not reordered in the dataSource automatically after a reorder in the ListBox.  
  
The desired result can be achieved via custom logic on the reorder event of the ListBox. It will require manually removing the item from one position and then inserting in on the new one:  
  
[http://dojo.telerik.com/Edeco/4](http://dojo.telerik.com/Edeco/4)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-insert](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-insert)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-indexOf](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-indexOf)  
  
When the indexes of the dataSource items are matching the order in the ListBox, the indexOf method will return the correct index when needed.  
  
Please have in mind that the example is using the jQuery version, but as the logic is using client-side methods, the implementation for the AngularJS version is similar.  
  

## Suggested Workarounds

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
