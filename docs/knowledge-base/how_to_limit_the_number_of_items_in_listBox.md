---
title: Connected Listboxes, Limit Number of Items in Second Listbox
description: An example on how to limit the number of item in the Kendo UI ListBox.
type: how-to
page_title: How to Limit the Number of Items in ListBox
slug: how_to_limit_the_number_of_items_in_listBox
tags: listbox, limit
ticketid: 1130658
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>ListBox for Progress® Kendo UI®</td>
 </tr>
</table>


## Description
I have two list boxes that are connected, the left one lists available items and the second for selected items. The number of selected items is limited to 5.  Is there a way to disable new drops in the second list box ?  The second box needs to remain 'active' for the user to reordering the items in their priority sequence.

## Solution
  
We can suggest using custom logic to determine if an item can be added to the selected list. This can be achieved on the add event using the view method of the ListBox dataSource. This will add it and respectively remove it from the first list only if the conditions are met.
  
Please check the [following example](http://dojo.telerik.com/UYUsa)  demonstrating this.