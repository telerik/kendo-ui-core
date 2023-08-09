---
title: Display Both StackValue Label and Individual Series Labels
page_title: Display Both StackValue Label and Individual Series Labels - Kendo UI for jQuery Chart
description: "Learn how to display both stackValue label and individual series labels in the Kendo UI Chart for jQuery."
slug: stackedchart_display_both_stackvalue_and_individual_labels
tags: stackedchart, stackvalue, series, label
component: chart
type: how-to
ticketid: 1618134
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
</table>

## Description

How can I display both stackValue label and individual series labels in a Stacked Chart?

## Solution

1. Create a new separate [`series`](/api/javascript/dataviz/ui/chart/configuration/series) at the end of the corresponding stack and set the values of its [`data`](/api/javascript/dataviz/ui/chart/configuration/series.data) to zero. 
1. Set the `stackValue` label [`template`](/api/javascript/dataviz/ui/chart/configuration/series.labels.template) in the newly created series.
1. Do not set the [`name`](/api/javascript/dataviz/ui/chart/configuration/series.name) property of the new series, so it would not be visible in the chart.

The following example demonstrates how to achieve the desired scenario: 
```dojo
<div id="example">
    <div class="demo-section wide">
        <div id="chart"></div>
    </div>
    <script>
        function createChart() {
            $("#chart").kendoChart({
                title: {
                    text: "World population by age group and sex"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [{
                    name: "0-19",
                    stack: "Female",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [1172929, 1184435, 1184654]
                }, {
                    name: "20-39",
                    stack: "Female",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [942151, 1001395, 1058439]
                }, {
                    name: "40-64",
                    stack: "Female",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [499861, 569114, 655066]
                }, {
                    name: "65-79",
                    stack: "Female",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [991015, 2110767, 2269156]
                }, {
                    name: "80+",
                    stack: "Female",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [446413, 544984, 646029]
                }, {
                    stack: "Female",
                  	labels: {
                			template: "#= stackValue #",
                			visible: true
            				},
                    data: [0, 0, 0]
                }, {
                    name: "0-19",
                    stack: "Male",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [1244870, 1263637, 1268165]
                }, {
                    name: "20-39",
                    stack: "Male",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [973694, 1036548, 1099507]
                }, {
                    name: "40-64",
                    stack: "Male",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [495030, 564169, 646563]
                }, {
                    name: "65-79",
                    stack: "Male",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [1158387, 1177078, 1912156]
                }, {
                    name: "80+",
                    stack: "Male",
                  	labels: {
                			template: "#: kendo.format( ' {0:C0} ' ,value) #",
                      position: "center",
                			visible: true
            				},
                    data: [325868, 331462, 339223]
                }],
                seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad", "",
                               "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
                valueAxis: {
                    labels: {
                        template: "#= kendo.format('{0:N0}', value / 1000) # M"
                    },
                    line: {
                        visible: false
                    }
                },
                categoryAxis: {
                    categories: [2000, 2005, 2010],
                    majorGridLines: {
                        visible: false
                    }
                },
                
            });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
    </script>
</div>
```

## See Also
* [JavaScript API Reference of the Chart](/api/javascript/ui/chart)
* [Show a Total Sum for Stacked Chart Series](/knowledge-base/show-stack-total)
* [jQuery Bar Charts Stacked and Grouped Bars Demo](/bar-charts/grouped-stacked-bar)
