---
title: Synchronize Panning and Zooming Between Charts
description: Learn how to synchronize the panning and zooming of two or more Kendo UI for jQuery Charts by handling the drag and zoom events and updating the range of the category axis.
type: how-to
page_title: Synchronize Panning and Zooming Between Charts - Kendo UI for jQuery Chart
slug: synchronize-panning-between-charts
tags: chart, pan, zoom, pannable, zoomable, drag, synchronize, category axis, axisranges
res_type: kb
components: ["chart"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

I have two Kendo UI for jQuery Charts on the same page. When the user pans or zooms one of the Charts, how can I make the other Chart display the same category range?

This KB also answers the following questions:

* Which Chart events provide the updated axis ranges during panning and zooming?
* Why do the Charts need the same `categoryAxis.name`?
* Does calling `redraw()` trigger the other Charts' `drag` or `zoom` events?

## Solution

Handle the [`drag`](/api/dataviz/ui/chart/events/drag) and [`zoom`](/api/dataviz/ui/chart/events/zoom) events of each Chart. The `axisRanges` event argument contains the new `min` and `max` values of every named axis, with the axis name as a key. Apply the range of the category axis to the other Charts and repaint them.

The following example demonstrates the full implementation of the suggested approach with two Charts that use a date category axis.

```dojo
<div id="salesChart" class="synced-chart" style="height: 300px;"></div>
<div id="ordersChart" class="synced-chart" style="height: 300px;"></div>

<script>
    var data = [];
    var startDate = new Date(2025, 0, 1);

    for (var i = 0; i < 120; i++) {
        data.push({
            date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
            sales: Math.round(500 + Math.random() * 500),
            orders: Math.round(20 + Math.random() * 40)
        });
    }

    function syncCategoryRange(e) {
        var range = e.axisRanges.dates;

        if (!range) {
            return;
        }

        $(".synced-chart").each(function() {
            var chart = $(this).data("kendoChart");

            if (chart !== e.sender) {
                chart.options.categoryAxis.min = range.min;
                chart.options.categoryAxis.max = range.max;
                chart.redraw();
            }
        });
    }

    function createChart(selector, title, field, type) {
        $(selector).kendoChart({
            renderAs: "canvas",
            transitions: false,
            dataSource: {
                data: data
            },
            title: {
                text: title
            },
            legend: {
                visible: false
            },
            series: [{
                type: type,
                field: field,
                categoryField: "date"
            }],
            categoryAxis: {
                name: "dates",
                type: "date",
                baseUnit: "days",
                min: new Date(2025, 0, 1),
                max: new Date(2025, 0, 31),
                labels: {
                    format: "MMM d"
                },
                maxDivisions: 10
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            drag: syncCategoryRange,
            zoom: syncCategoryRange
        });
    }

    createChart("#salesChart", "Sales", "sales", "column");
    createChart("#ordersChart", "Orders", "orders", "line");
</script>
```

The following steps explain the key points of the implementation:

1. Set the same [`categoryAxis.name`](/api/dataviz/ui/chart/configuration/categoryaxis#categoryaxisname) in all Charts. The `axisRanges` object contains only named axes.
1. Set the initial visible range through the [`categoryAxis.min`](/api/dataviz/ui/chart/configuration/categoryaxis#categoryaxismin) and [`categoryAxis.max`](/api/dataviz/ui/chart/configuration/categoryaxis#categoryaxismax) options.
1. Enable the [`pannable`](/api/dataviz/ui/chart/configuration/pannable) and [`zoomable`](/api/dataviz/ui/chart/configuration/zoomable) options and lock the value axis.
1. Disable the [`transitions`](/api/dataviz/ui/chart/configuration/transitions) option, so that the synchronized Charts are repainted without animations.
1. In the `drag` and `zoom` event handlers, update the `categoryAxis.min` and `categoryAxis.max` options of every other Chart and call its [`redraw`](/api/dataviz/ui/chart/methods/redraw) method.

    ```
    function syncCategoryRange(e) {
        var range = e.axisRanges.dates;

        if (!range) {
            return;
        }

        $(".synced-chart").each(function() {
            var chart = $(this).data("kendoChart");

            if (chart !== e.sender) {
                chart.options.categoryAxis.min = range.min;
                chart.options.categoryAxis.max = range.max;
                chart.redraw();
            }
        });
    }
    ```

The `redraw` method does not trigger the `drag` or `zoom` events. As a result, updating the other Charts does not cause an infinite loop between the event handlers. The `redraw` method also preserves the loaded data, which keeps the synchronization fast while the user drags. If you also need to synchronize the Charts after the user finishes the interaction, handle the [`dragEnd`](/api/dataviz/ui/chart/events/dragend) and [`zoomEnd`](/api/dataviz/ui/chart/events/zoomend) events in the same way.

The same approach works for a category axis with non-date categories. In this case, the `min` and `max` values in `axisRanges` are category indexes.

## See Also

* [JavaScript API Reference of the jQuery Chart](/api/dataviz/ui/chart)
* [Axes of the jQuery Chart]({% slug elements_kendoui_charts_widget %})
* [Date Series of the jQuery Chart]({% slug dateseries_charts_widget %})
* [Maintain the Pan and Zoom State of the Chart on Rebind]({% slug howto_panandzoomrebind_charts %})
* [Share Legend Between Charts]({% slug share-legend-between-charts %})
