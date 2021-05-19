---
title: Get Data Index in the ListBox after Reordering
description: An example on how to get the index of a ListBox item after reordering.
type: how-to
page_title: Get the Index of an Item after Reordering | Kendo UI ListBox for jQuery
slug: get-index-of-item-in-listbox-after-reorder
tags: listbox, datasource
ticketid: 1112980
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
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

How can I easily retrieve the index of each data item after reordering the ListBox? 

## Suggested Workarounds

The ListBox does not provide a built-in solution for achieving this behavior. However, you can still work around this issue by applying custom logic on the `reorder` event of the ListBox.

The Kendo UI dataSource features the `indexOf` method but the data items are not automatically reordered in the dataSource after the reordering takes place. To retrieve the index of a specific ListBox data item, manually remove the item from its current and insert it in its desired position. When the indexes of the dataSource items match the order in the ListBox, then the `indexOf` method returns the correct index.

For more information on the API settings, refer to the documentation on the [`insert`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/insert) and [`indexOf`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/indexof) methods.  

For a working demo, refer to [this example](https://dojo.telerik.com/Edeco/4). Although the demo uses the jQuery version, the logic applies client-side methods and the implementation for the AngularJS version is similar.

## See also
[Get Data Index in the ListBox on Add]({% slug listbox-get-index-of-item-on-add %})