---
title: Notes
page_title: Configuration guide for the chart notes
description: How to configure the notes of a chart.
position: 4
---

# Notes

The Chart can display the matadata of a point or a specific part of the axis.

![](/dataviz/chart/chart-notes.png)

## Configuration

You can easy add a notes for each series point:

    $("#chart").kendoChart({
        dataSource: {
            data: [{
                value: 1,
                noteText: "min"
            },{
                value: 2
            },{
                value: 3,
                noteText: "max"
            }]
        },
        series: [{
            type: "line",
            field: "value",
            noteTextField: "noteText"
        }]
    });

Also you can add a notes for the value axis:

    $("#chart").kendoChart({
        series: [{
            data: [1, 2, 3]
        }],
        valueAxis: {
            notes: {
                data: [{
                    value: 3,
                    label: {
                        text: "max"
                    }
                }]
            }
        }
    });

## Templates

Notes content can be defined with a Kendo Template when more flexibility is desired. The template provides access to all information associated with the point:

*   value - the point value. Value dimensions are available as properties, for example, **value.x** and **value.y**
*   category - the category name.
*   series - the data series.
*   dataItem - the original data item (when binding to dataSource).

For example:

    $("#chart").kendoChart({
        dataSource: {
            data: [{
                value: 1,
                noteText: "minimum"
            },{
                value: 2
            },{
                value: 3,
                noteText: "maximum"
            }]
        },
        series: [{
            type: "line",
            field: "value",
            noteTextField: "noteText",
            notes: {
                label: {
                    position: "outside",
                    template: "#= dataItem.noteText # of the series"
                }
            }
        }]
    });

In the axis configuration you will have only:

*   value - the value of the axis.

For example:

    $("#chart").kendoChart({
        series: [{
            data: [1, 2, 3]
        }],
        valueAxis: {
            notes: {
                data: [{
                    value: 3,
                    label: {
                        position: "outside",
                        text: "max",
                        template: "#= value # series value"
                    }
                }]
            }
        }
    });