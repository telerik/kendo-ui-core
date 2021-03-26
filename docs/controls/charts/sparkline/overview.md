---
title: Overview
page_title: jQuery Charts Documentation | Sparkline Overview
description: "Get started with the jQuery Sparkline by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_sparklinescharts
position: 1
---

# Sparkline Overview

The Kendo UI Sparkline is a very small chart that is drawn without axes, coordinates, legends, titles, or other chart-specific elements.

Sparklines behave like inline elements as they are rendered inside a `span` element so that they can be easily embedded in text as opposed to the standard Telerik UI Charts which behave like block elements as they are rendered inside `div` elements.

While Sparklines are typically line charts, other types are supported as well:

* Line (default)
* Bar (Data Bars)
* Column
* Area
* Pie
* Bullet

 Generally, Sparklines are simple, word-sized graphics that can be embedded in chunks of text, tables, or headlines. The concept for such graphics was developed by [Edward Tufte](https://en.wikipedia.org/wiki/Edward_Tufte). The Telerik UI Sparklines HtmlHelper is a version of the Telerik UI Chart HtmlHelper that is tailored for this specific application.

* [Demo page for the Sparkline](https://demos.telerik.com/kendo-ui/sparklines/index)

## Basic Configuration

To create the Sparklines, add an empty `span` in the HTML and provide it with an ID. Optionally, set the width and height of the desired chart inline or by using CSS.

> * The width of the Line, Area, and Column Sparklines is determined by the number of data points.
> * Bar and Bullet graphs have a default width that can be overridden with CSS.
> * The Pie width equals the line-height to make a square.

    <span id="sparkline" style="line-height: 60px"></span>

To render the Sparkline, select the `div` with a jQuery selector and call the `kendoChart()` function.

    $("#sparkline").kendoSparkline([1, 2, 3, 2, 1]);

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_sparklinescharts %})
* [Axes configuration]({% slug axes_kendoui_sparklinescharts %})

## See Also

* [Basic Usage of the Sparkline (Demo)](https://demos.telerik.com/kendo-ui/sparklines/index)
* [JavaScript API Reference of the Sparkline](/api/javascript/dataviz/ui/sparkline)
