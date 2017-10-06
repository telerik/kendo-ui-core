---
title: Use Filtering in Listbox
description: An example on how to filter the ListBox with external input.
type: how-to
page_title: Apply Filtering with External Input | Kendo UI ListBox
slug: filter-the-listbox-with-external-input
previous_url: /knowledge-base/how_to_filter_the_listbox_with_external_input
tags: listbox, filtering
ticketid: 1112554
res_type: kb

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
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>58</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6.1</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2015</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>C Sharp</td>
 </tr>
</table>

## Description

How can I implement a filter or search capability in the ListBox?

## Solution

The only current approach is to use an additional input element. To filter the ListBox, on the `input` or `change` event of the input, use the [`filter`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter) method of the dataSource.

For the complete implementation of the approach, refer to [this runnable example](http://dojo.telerik.com/AqUdu/2).
