---
title: Pyramid Charts
page_title: jQuery Chart Documentation - Pyramid Charts
description: "Learn how to create a Kendo UI Pyramid Chart and use the different options it provides."
slug: pyramidcharts_widget
---

# Pyramid Charts

Pyramid Charts display a single series of data in progressively increasing proportions, organized in segments, where each segment represents the value for the particular item from the series. The values of the items can also influence the height and the shape of the corresponding segments.

Pyramid Charts are suitable for representing stages in a sales process and for showing the amount of the potential revenue from each stage. They are also useful when identifying potential problem areas in the sales processes of an organization. Pyramid Charts are similar to the [Funnel Charts](https://demos.telerik.com/kendo-ui/funnel-charts/index) and are well suited for displaying several values.

* [Demo page for the Pyramid Chart](https://demos.telerik.com/kendo-ui/pyramid-charts/index)

## Concepts

The basic conceptual options of a Kendo UI Pyramid Chart are:

* `dynamicHeight`&mdah;It specifies whether the different elements should have equal height, when equal to `false`, or the height of each element should be based on its value.

## Getting Started

The following example demonstrates how to configure a basic Pyramid chart.

    <div id="chart"></div>
    <script>
        var data = [{
            stat: 'Unique Visitors',
            count: 280022
        }, {
            stat: 'Downloads',
            count: 190374
        }, {
            stat: 'Purchases',
            count: 120392
        }];
        $('#chart').kendoChart({
            series:[{
                type: 'pyramid',
                data: data,
                field: 'count',
                categoryField: 'stat',
                labels: {
                    visible: true
                }
            }]
        });
    </script>

## Fixed Height

The following example demonstrates how to set equal height of all segments by disabling the `dynamicHeight` setting.

    <div id="chart"></div>
    <script>
        var data = [{
            value: 20
        },{
            value: 40
        },{
            value: 80
        },{
            value: 40
        },{
            value: 10
        }];

        $('#chart').kendoChart({
            series:[{
                type: 'pyramid',
                data: data,
                dynamicHeight: false,
                labels: {
                    visible: true
                }
            }]
        });
    </script>

## See Also

* [Basic Usage of the Pyramid Chart (Demo)](https://demos.telerik.com/kendo-ui/pyramid-charts/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
