---
title: Bar Chart
page_title: Bar charts in Kendo UI DataViz
description: How to set the properties of Kendo UI Bar Chart.
---

## Column Chart

The Column Chart is the default chart rendered if a "_type_" is not specified.

    $("#chart").kendoChart({
        title: {
            text: "Kendo Chart Example"
        },
        series: [ {
            name: "Example Series",
            data: [200, 450, 300, 125]
        } ],
        categoryAxis:{
            categories: [ 2000, 2001, 2002, 2003 ]
        }
    });


![Column Chart with categories](/dataviz/chart/chart-column-categories.png)

## Bar Chart

Setting the "type" property on the "series" object to "bar" renders horizontal bars.

    $("#chart").kendoChart({
        title: {
            text: "Kendo Chart Example"
        },
        series: [ {
            type: "bar",
            name: "Example Series",
            data: [200, 450, 300, 125]
        } ],
        categoryAxis:{
            categories: [ 2000, 2001, 2002, 2003 ]
        }
    });
![Bar Chart](/dataviz/chart/chart-types/chart-bar.png)
