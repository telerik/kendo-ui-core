---
title: Chart Notes
page_title: Chart Notes | Kendo UI Charts
description: "Learn how to configure the notes of a Kendo UI Chart widget."
slug: chartnotes_charts_widget
position: 5
---

# Chart Notes

Kendo UI Charts can display the metadata of a point or a specific part of the axis.

**Figure 1. Notes displayed in a chart**

![](/controls/charts/chart-notes.png)

## Configuration

You can easily add a note for each series point in the way demonstrated below.

###### Example

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

You are also able to add a note to the value axis.

###### Example

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

## Options

### Templates

When you desire a higher level of flexibility, define the content of the notes via a Kendo UI template. The template provides access to all information associated with the point:

*   `value`&mdash;The point value. Value dimensions are available as properties, e.g. `value.x` and `value.y`.
*   `category`&mdash;The category name.
*   `series`&mdash;The data series.
*   `dataItem`&mdash;The original data item (when binding to dataSource).

###### Example

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

In the axis configuration you only have `value`, which is the value of the axis.

###### Example

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

## See Also

Other articles on Kendo UI Charts:

* [Overview]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
