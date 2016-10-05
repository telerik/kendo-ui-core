---
title: ChartPane
page_title: API reference for Kendo UI ChartPane
---

# kendo.dataviz.ChartPane

Represents a chart pane.

## Fields

### chartsVisual `kendo.drawing.Group`

The group holding the charts drawing elements.

### visual `kendo.drawing.Group`

The drawing group used to draw the pane.

## Methods

### series

Returns an array with the pane [series](/api/javascript/dataviz/chart/chart_series).

#### Returns

`Array` the array holding the pane series.

#### Example - get the pane series
    var series = pane.series();