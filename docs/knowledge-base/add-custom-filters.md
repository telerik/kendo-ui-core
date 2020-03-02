---
title: Combine Regular and Custom Filters in Grid for ASP.NET MVC
page_title: Add Custom Filters to Grid | Kendo UI Grid for ASP.NET MVC
description: An example on how to combine custom with build-in filters in a Kendo UI Grid for ASP.NET MVC.
type: how-to
previous_url: /knowledge-base/how-to-add-custom-filters
slug: add-custom-filters
tags: grid, filter
ticketid: 1118405
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
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

I have a Kendo UI Grid for ASP.NET MVC with regular filters and local filtering. How can I add custom filters and combine the regular filters with the custom ones?

## Solution

To allow the application of both filter types, wrap the custom filter in an additional filter with the `"OR"` criteria.

For the complete implementation of the approach, refer to [this runnable example](https://dojo.telerik.com/AgIgO/17), which applies the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method of the DataSource.
