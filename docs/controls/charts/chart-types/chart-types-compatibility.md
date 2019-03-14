---
title: Series Compatibility
page_title: Series Compatibility | Kendo UI Charts
description: Refer to the list of the Chart series that are compatible between each other.
slug: chart_types_compatibility
position: 10
---

# Series Compatibility

Your project might require you to use multiple series in a single Kendo UI Chart.

However, not all Chart series types can be combined in a single Chart plot area.

The main indicator for series compatibility is the type of axes the series use to display their values. For example, specific categorical series rely on a single category and a single value axis (Line, Bar, Area), XY series use x and y axes (Scatter, Scatter Line, Bubble), and so on.

Another indicator of series compatibility is the direction of the series&mdash;for example, you cannot combine Column and Bar series, or Column and Vertical Line series. Some series have a specific layout that cannot be combined with any other series type.

The following table lists the series types supported by the Chart and demonstrates their compatibility with each other.

| Series             | Compatible Series Types |
| :---                  | :---              |
| [Area](https://demos.telerik.com/kendo-ui/area-charts/index)  | Area, Column, Line, Bullet, Candlestick, Box Plot, Range Column, Range Area, Waterfall |
| [Bar](https://demos.telerik.com/kendo-ui/bar-charts/index)    | Bar, Vertical Area, Vertical Line, Vertical Range Area  |
| [BoxPlot](https://demos.telerik.com/kendo-ui/box-plot-charts/index)          | Area, BoxPlot, Line, Range Area |
| [Bubble](https://demos.telerik.com/kendo-ui/bubble-charts/index)        | Bubble, Scatter, Scatter Line  |
| [Bullet](https://demos.telerik.com/kendo-ui/bullet-charts/index)          | Vertical Area, Bullet, Vertical Line, Vertical Range Area  |
| [Candlestick](https://demos.telerik.com/kendo-ui/financial/index)          | Area, Candlestick, Line, Range Area  |
| [Column](https://demos.telerik.com/kendo-ui/bar-charts/column)          | Area, Column, Line, Range Area  |
| [Donut](https://demos.telerik.com/kendo-ui/donut-charts/index)          | Donut  |
| [Funnel](https://demos.telerik.com/kendo-ui/funnel-charts/index)          | none |
| [Horizontal Waterfall](https://demos.telerik.com/kendo-ui/waterfall-charts/horizontal) | Vertical Area, Vertical Line, Vertical Range Area |
| [Line](https://demos.telerik.com/kendo-ui/line-charts/index)          | Area, Column, Bullet, Candlestick, Box Plot, Range Column, Range Area, Waterfall |
| [Ohlc](https://demos.telerik.com/kendo-ui/financial/index)          | Area, Line, Ohlc, Range Area |
| [Pie](https://demos.telerik.com/kendo-ui/pie-charts/index)          | none |
| [Polar Area](https://demos.telerik.com/kendo-ui/polar-charts/polar-area)          | Polar Area, Polar Line, Polar Scatter |
| [Polar Line](https://demos.telerik.com/kendo-ui/polar-charts/index)          | Polar Area, Polar Line, Polar Scatter |
| [Polar Scatter](https://demos.telerik.com/kendo-ui/polar-charts/polar-scatter)          | Polar Area, Polar Line, Polar Scatter |
| [Radar Area](https://demos.telerik.com/kendo-ui/radar-charts/radar-area)          | Radar Area, Radar Column, Radar Line |
| [Radar Column](https://demos.telerik.com/kendo-ui/radar-charts/radar-column)          | Radar Area, Radar Column, Radar Line |
| [Radar Line](https://demos.telerik.com/kendo-ui/radar-charts/index)          | Radar Area, Radar Column, Radar Line |
| [Range Area](https://demos.telerik.com/kendo-ui/range-area-charts/index)          | Area, Box Plot, Bullet, Candlestick, Column, Line, Ohlc, Range Area, Range Column |
| [Range Bar](https://demos.telerik.com/kendo-ui/range-bar-charts/local-data-binding)          | Range Bar, Vertical Area, Vertical Line, Vertical Range Area |
| [Range Column](https://demos.telerik.com/kendo-ui/range-bar-charts/index)          | Area, Line, Range Area, Range Column |
| [Scatter](https://demos.telerik.com/kendo-ui/scatter-charts/index)          | Bubble, Scatter, Scatter Line |
| [Scatter Line](https://demos.telerik.com/kendo-ui/scatter-charts/scatter-line)          | Bubble, Scatter, Scatter Line |
| [Vertical Area](https://demos.telerik.com/kendo-ui/area-charts/index)          | Bar, Bullet, Horizontal Waterfall, Range Bar, Vertical Range Area, Vertical Box Plot, Vertical Line |
| [Vertical Box Plot](https://demos.telerik.com/kendo-ui/box-plot-charts/vertical)          | Vertical Area, Vertical Box Plot, Vertical Line, Vertical Range Area |
| [Vertical Bullet](https://demos.telerik.com/kendo-ui/bullet-charts/local-data-binding)          | Area, Line, Range Area, Vertical Bullet |
| [Vertical Line](https://demos.telerik.com/kendo-ui/line-charts/index)          | Bar, Bullet, Horizontal Waterfall, Range Bar, Vertical Area, Vertical Box Plot, Vertical Line, Vertical Range Area |
| [Vertical Range Area](https://demos.telerik.com/kendo-ui/range-area-charts/index)          | Bar, Bullet, Horizontal Waterfall, Range Bar, Vertical Area, Vertical Box Plot, Vertical Range Area |
| [Waterfall](https://demos.telerik.com/kendo-ui/waterfall-charts/index)          | Area, Line, Waterfall |
