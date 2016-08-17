---
title: ChartPoint
page_title: API reference for Kendo UI ChartPoint
---

# kendo.dataviz.ChartPoint

Represents a chart series point.

## Fields

### category `String|Date|Number`

The point category value. Available only for categorical points(Bar, Line, etc.).

### dataItem `Object`

The point dataItem.

### percentage `Number`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts points.

### runningTotal `Number`

The sum of point values since the last "runningTotal" [summary point](/api/javascript/dataviz/ui/chart.html#configuration-series.summaryField). Available for waterfall series points.

### total `Number`

The sum of all previous series values. Available for waterfall series points.

###value `Number`

The point value.

### visual `kendo.drawing.Element`

The Kendo Drawing element used to draw the point.