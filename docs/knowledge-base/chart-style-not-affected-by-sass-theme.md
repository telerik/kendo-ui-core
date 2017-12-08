---
title: Custom Theme Created Using Sass ThemeBuilder Doesn't Affect Charts
description: Theme created using ThemeBuilder changes style of every control except the Charts
type: troubleshooting
page_title: Custom Theme Created Using Sass ThemeBuilder Doesn't Affect Charts
slug: chart-style-not-affected-by-sass-theme
tags: chart, theme, themebuilder, style, sass
ticketid: 1141887
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Charts for ASP.NET MVC</td>
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

I created a new Sass theme using the ThemeBuilder tool, downloaded it, and added a reference to it in my `Layout.cshtml` file. The theme works as expected throughout all the application but it doesn't affect the charts even though I chose new colors for the series.

## Cause\ Possible Cause(s)

As the Charts are very specific Widgets, they require a custom property to be set before recognizing the new styles.

## Solution

Set the `theme` property of the Kendo UI Charts to `"sass"`

````c#
@(Html.Kendo().Chart()
  .Name("bar")
  .Theme("sass")
````

## See Also
* [Progress Sass ThemeBuilder.](http://themebuilder.telerik.com/aspnet-mvc)
* [API Reference for theme property.](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-theme)
