---
title: How to use filtering in Listbox
description: An example on how to filter the ListBox with external input
type: how-to
page_title: How to filter the ListBox with external input
slug: how_to_filter_the_listbox_with_external_input
tags: listbox, filtering
ticketid: 1112554
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>ListBox</td>
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

I want to implement filter/search capability into the ListBox, but I don't see any default implementation.

## Solution
  
Currently, the value inside the ListBox can be filtered(searched) only using an additional input element.  
  
On the input(or change) event of the input, I can suggest using the [filter](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter) method of the dataSource to filter the ListBox.
  
A fully runnable example is available [here.](http://dojo.telerik.com/AqUdu/2)


