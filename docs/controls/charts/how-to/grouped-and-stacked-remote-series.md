---
title: Create Stacked and Grouped Series Bound to Remote Data
page_title: Create Stacked and Grouped Series Bound to Remote Data | Kendo UI Charts
description: "Learn how to bind a Kendo UI Chart with multiple stack groups to remote data."
slug: howto_stackedgroupedseriesremote_charts
---

# Create Stacked and Grouped Series Bound to Remote Data

The example below demonstrates how to create a stacked and grouped Kendo UI Chart bound to remote data. The [**Bar Charts** > **Stacked and grouped bars** demo](http://demos.telerik.com/kendo-ui/bar-charts/grouped-stacked-bar) demonstrates the same scenario for inline data.

The implementation consists of two steps:

1. Assign an unique Group ID value to each Gender / Age Group combination.
1. Set the stack name for each series to match the Gender field in the [`dataBound ` event](/api/javascript/dataviz/ui/chart#events-dataBound).

###### Example

```html
    <div id="chart"></div>
    <script>
        var data = [
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 854622,
                "year": 1970
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 490550,
                "year": 1970
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 379788,
                "year": 1970
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 97894,
                "year": 1970
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 16358,
                "year": 1970
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 900268,
                "year": 1970
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 509133,
                "year": 1970
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 364179,
                "year": 1970
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 74208,
                "year": 1970
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 9187,
                "year": 1970
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 925844,
                "year": 1975
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 555695,
                "year": 1975
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 411217,
                "year": 1975
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 113287,
                "year": 1975
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 18576,
                "year": 1975
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 972205,
                "year": 1975
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 579487,
                "year": 1975
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 401396,
                "year": 1975
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 86516,
                "year": 1975
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 10752,
                "year": 1975
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 984930,
                "year": 1980
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 627763,
                "year": 1980
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 447201,
                "year": 1980
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 128808,
                "year": 1980
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 24586,
                "year": 1980
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1031421,
                "year": 1980
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 655494,
                "year": 1980
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 440844,
                "year": 1980
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 98956,
                "year": 1980
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 13007,
                "year": 1980
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1044982,
                "year": 1985
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 718568,
                "year": 1985
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 484739,
                "year": 1985
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 137459,
                "year": 1985
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 30352,
                "year": 1985
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1094547,
                "year": 1985
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 749511,
                "year": 1985
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 479798,
                "year": 1985
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 107352,
                "year": 1985
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 15983,
                "year": 1985
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1100941,
                "year": 1990
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 810169,
                "year": 1990
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 395533,
                "year": 1990
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 152171,
                "year": 1990
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 36724,
                "year": 1990
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1155600,
                "year": 1990
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 844496,
                "year": 1990
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 390590,
                "year": 1990
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 120614,
                "year": 1990
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 19442,
                "year": 1990
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1139797,
                "year": 1995
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 883051,
                "year": 1995
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 435485,
                "year": 1995
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 170262,
                "year": 1995
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 42939,
                "year": 1995
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1202766,
                "year": 1995
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 916479,
                "year": 1995
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 430666,
                "year": 1995
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 138868,
                "year": 1995
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 23020,
                "year": 1995
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1172929,
                "year": 2000
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 942151,
                "year": 2000
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 499861,
                "year": 2000
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 191015,
                "year": 2000
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 46413,
                "year": 2000
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1244870,
                "year": 2000
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 973694,
                "year": 2000
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 495030,
                "year": 2000
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 158387,
                "year": 2000
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 25868,
                "year": 2000
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1184435,
                "year": 2005
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 1001395,
                "year": 2005
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 569114,
                "year": 2005
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 210767,
                "year": 2005
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 54984,
                "year": 2005
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1263637,
                "year": 2005
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 1036548,
                "year": 2005
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 564169,
                "year": 2005
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 177078,
                "year": 2005
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 31462,
                "year": 2005
            },
            {
                "ageGroup": "0-19",
                "gender": "Female",
                "groupId": "Female, 0-19",
                "value": 1184654,
                "year": 2010
            },
            {
                "ageGroup": "20-39",
                "gender": "Female",
                "groupId": "Female, 20-39",
                "value": 1058439,
                "year": 2010
            },
            {
                "ageGroup": "40-64",
                "gender": "Female",
                "groupId": "Female, 40-64",
                "value": 655066,
                "year": 2010
            },
            {
                "ageGroup": "65-79",
                "gender": "Female",
                "groupId": "Female, 65-79",
                "value": 226956,
                "year": 2010
            },
            {
                "ageGroup": "80+",
                "gender": "Female",
                "groupId": "Female, 80+",
                "value": 66029,
                "year": 2010
            },
            {
                "ageGroup": "0-19",
                "gender": "Male",
                "groupId": "Male, 0-19",
                "value": 1268165,
                "year": 2010
            },
            {
                "ageGroup": "20-39",
                "gender": "Male",
                "groupId": "Male, 20-39",
                "value": 1099507,
                "year": 2010
            },
            {
                "ageGroup": "40-64",
                "gender": "Male",
                "groupId": "Male, 40-64",
                "value": 646563,
                "year": 2010
            },
            {
                "ageGroup": "65-79",
                "gender": "Male",
                "groupId": "Male, 65-79",
                "value": 192156,
                "year": 2010
            },
            {
                "ageGroup": "80+",
                "gender": "Male",
                "groupId": "Male, 80+",
                "value": 39223,
                "year": 2010
            }
        ];

        $("#chart").kendoChart({
            dataSource: {
                data: data,
                group: {
                    field: "groupId",
                    dir: "asc"
                }
            },
            series: [{
                type: "column",
                field: "value",
                categoryField: "year"
            }],
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
            dataBound: function(e) {
                var series = e.sender.options.series;
                for (var i = 0; i < series.length; i++) {
                    series[i].stack = series[i].data[0].gender;
                }
            }
        });
    </script>
</html>
```

## See Also

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Show Message When Chart Has No Data]({% slug howto_showemptymessage_whencharthasnodata_charts %})
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
