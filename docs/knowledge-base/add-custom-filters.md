---
title: Combine Regular and Custom Filters in ASP.NET MVC Grid
page_title: Add Custom Filters - ASP.NET MVC Data Grid
description: Learn how to combine custom with built-in filters in a Telerik UI Data Grid for ASP.NET MVC.
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
  <td>Progress® Telerik UI® Grid for ASP.NET MVC</td>
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
  <td>.NET Framework</td>
  <td>Version 4.6</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
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

I have a Telerik UI Data Grid for ASP.NET MVC with regular filters and local filtering. How can I add custom filters and combine the regular filters with the custom ones?

## Solution

To allow the application of both filter types, wrap the custom filter in an additional filter with the `"OR"` criteria.

For the complete implementation of the approach, refer to [this runnable example](https://dojo.telerik.com/AgIgO/17), which applies the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method of the DataSource.

## See Also

* [Kendo UI for jQuery Data Grid (Product Page)](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
