---
title: The Custom Theme that Is Created by Using SASS ThemeBuilder Doesn't Affect Charts
description: The theme which is created through the ThemeBuilder changes the style of every Kendo UI control except for the Charts.
type: troubleshooting
page_title: Custom Theme Created through the SASS ThemeBuilder Doesn't Affect the MVC Charts | Kendo UI Chart for ASP.NET MVC
slug: chart-style-not-affected-by-sass-theme
tags: chart, theme, themebuilder, style, sass
ticketid: 1141887
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Charts for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>All</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

## Description

I created a new SASS theme by using the Kendo UI ThemeBuilder tool, downloaded it, and added a reference to it in my `Layout.cshtml` file. The theme works as expected for the whole application but it doesn't affect the Charts even though I chose new colors for the series.

## Cause

The Charts require you to set a custom property before they recognize the new styles.

## Solution

Set the `theme` property of the Kendo UI Charts to `"sass"`.

````c#
@(Html.Kendo().Chart()
  .Name("bar")
  .Theme("sass")
````

## See Also

* [Progress SASS ThemeBuilder](https://themebuilder.telerik.com/aspnet-mvc)
* [API Reference of the theme Property](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/theme)
