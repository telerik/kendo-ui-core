---
title: Limit the Number of Items in Connected Listboxes
description: An example on how to limit the number of items in the Kendo UI ListBox.
type: how-to
page_title: Limit the Number of Items in the Second ListBox | Kendo UI ListBox
slug: limit-the_number-of-items-in-listbox
previous_url: /knowledge-base/how_to_limit_the_number_of_items_in_listBox
tags: listbox, limit
ticketid: 1130658
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
</table>

## Description

I have two connected ListBoxes:
* The first one lists the available items.
* The second one lists the selected items, whose number is limited to five.

How can I disable the addition of new items to the second ListBox while at the same time the second box remains active for the user to reorder the items based on their priority sequence.

## Solution

1. Create custom logic to determine if an item can be added to the selected list.
1. Apply the custom logic on the `add` event of the ListBox by using the `view` method of its dataSource. As a result, the approach adds and respectively removes the item from the first list only if the conditions are met.

For the complete implementation of the approach, refer to [this runnable example](http://dojo.telerik.com/UYUsa).
