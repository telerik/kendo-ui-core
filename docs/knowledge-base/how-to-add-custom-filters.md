---
title: Combine Filters
description: Combine custom filter with build-in filter
type: how-to
page_title: How to Add Custom Filters
slug: how-to-add-custom-filters
position: 0
tags: grid, filter 
teampulseid:
ticketid: 1118405
pitsid:

res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
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
  <td>57</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2015</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
 <tr>
  <td>MVC Version</td>
  <td>MVC 5</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

 
## Description

We have in out project Grid that he have regular filters. 

We have added more custom filters that the customer requested. 

The filtering is local filtering.

We would like to combine these filters.

## Solution

The logic is to wrap the custom filter in additional filter in order to allow applying both filters with the "OR" criteria. 
  
Please check [the runnable example](http://dojo.telerik.com/AgIgO/17) using the [filter method](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter) of the DataSource.