---
title: ListBox Reordering Is Not Working
description: The indexes of the items in the dataSource of the Kendo UI ListBox are not reordered.
type: troubleshooting
page_title: Reordering Does Not Update the Indexes in dataSource | Kendo UI ListBox
slug: list-box-reordering-not-working
tags: listbox, reorder
ticketid: 1112413
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>ListBox for Progress Kendo UI</td>
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

I want to use the ListBox to reorder items in a bound data source but although the items of the ListBox visually reorder on the screen, these changes are not reflected in the data source behind it.

How can I get the displayed order in sync with the data source? 

## Suggested Workarounds

The Kendo UI ListBox does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

Apply custom logic on the `reorder` event of the widget by manually removing the item from one position and then inserting it in the new one. For more information, refer to:  

* [http://dojo.telerik.com/Edeco/4](http://dojo.telerik.com/Edeco/4)  
* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-insert](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-insert)  
* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-indexOf](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-indexOf)  
  
