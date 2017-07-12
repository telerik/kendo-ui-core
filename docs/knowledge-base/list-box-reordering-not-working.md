---
title: ListBox reordering not working
description:Indexes of the items in the ListBox dataSource are not reordered
type: troubleshooting
page_title:ListBox reordering not updating the indexes in its dataSource
slug: list-box-reordering-not-working
position: 0
tags:listbox, reorder
teampulseid:
ticketid: 1112413
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
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Latest</td>
 </tr>
</table>

 
## Description
I want to use the ListBox to reorder items in a bound data source. However, although I can see the items reorder visually on screen, these changes are not reflected in the data source behind it.

What do I need to do to get the displayed order in sync with the data source? 

## Solution

The desired result can be achieved via custom logic on the reorder event of the ListBox. It will require manually removing the item from one position and then inserting in on the new one:  
  
[http://dojo.telerik.com/Edeco/4](http://dojo.telerik.com/Edeco/4)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-insert](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-insert)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-indexOf](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-indexOf)  
  










