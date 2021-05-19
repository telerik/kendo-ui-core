---
title: MVVM Listbox with Template Does Not Display Data When Item Is Moved
description: The item template is not bound when an item is moved in the MVVM ListBox.
type: troubleshooting
page_title: Template Not Bound When an MVVM ListBox Item is Moved | Kendo UI ListBox for jQuery
slug: template-not-bound-when-a-mvvm-listbox-item-is-moved
tags: listbox, mvvm, template
ticketid: 1123792
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

My ListBoxes use a template to display their items. When I drag or move an item with the toolbar to the second ListBox, the item is moved but the data is not displayed.

How can I display the data of the ListBox item that was moved?

## Solution

The template is not automatically rebound after drag-and-drop and this issue is expected. To work around it, manually refresh the second ListBoxt on the [`dragend`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/events/dragend) event of the first ListBox.

For the full implementation, refer to [this Dojo example](https://dojo.telerik.com/asOfa). If the arrows from the toolbar are used, you might need to apply similar logic to the [`add`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/events/add) event (with timeout).
