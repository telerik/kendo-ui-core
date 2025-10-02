---
title: Overlaying a Message for No Data in Kendo UI for jQuery Stock Chart
description: Learn how to overlay a message on a Kendo UI for jQuery Stock Chart when there is no data.
type: how-to
page_title: Displaying a No Data Message Overlay for Kendo UI for jQuery Stock Chart
meta_title: No Data Overlay for Kendo UI for jQuery Stock Chart
slug: overlay-no-data-message-stock-chart-kendo-ui-jquery
tags: kendo-ui,jquery,chart,stockchart,no-data-overlay,progress
res_type: kb
ticketid: 1643498
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Chart for Kendo UI for jQuery, <br/>
Stock Chart for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I want to display a message overlay, such as "No data available in the selected period," on a [Stock Chart](https://docs.telerik.com/kendo-ui/controls/data-visualization/stockchart/overview) when there is no data. This is useful for providing visual feedback to users in scenarios where the data source contains no records.

> The Chart received a built-in [`"No data"`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/nodata) template functionality with v.2024.4.1112 that allows the Chart to automatically display a message when there is no data to show. For the described approach to work in v.2024.4.1112 or newer versions you need to set `noData: false` to the Chart.

This knowledge base article also answers the following questions:
- How to show a no-data message in Kendo UI for jQuery Stock Chart?
- How to create an overlay for empty data in Stock Chart?
- How to handle empty data scenarios in Kendo UI for jQuery Stock Chart?

## Solution

To achieve this, use the [`requestStart`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requeststart) and [`requestEnd`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requestend) events of the dataSource to control the visibility of the overlay message dynamically. Additionally, check the data length in the `requestEnd` event to determine if the overlay message should be displayed.

Follow these steps:

1. Define the Stock Chart and initialize the dataSource.
2. Use the [`requestStart`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requeststart) and [`requestEnd`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requestend) events to manage the loading indicator and check for empty data.
3. Create an overlay element to display the message.

Here is an example implementation:

```dojo
 <div id="stock-chart"></div>
    <script>
        function createChart() {
            $("#stock-chart").kendoStockChart({
                dataSource: {
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui//content/dataviz/js/boeing-stock.json",
                            dataType: "json"
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                Date: { type: "date" }
                            }
                        }
                    },
                  requestStart: function() {
                    kendo.ui.progress($("#stock-chart"), true);
                  },
                  requestEnd: function() {
                    kendo.ui.progress($("#stock-chart"), false);
                  }
                },
                noData: false,
                title: {
                    text: "The Boeing Company\nNYSE:BA"
                },
                dateField: "Date",
                series: [{
                    type: "candlestick",
                    openField: "Open",
                    highField: "High",
                    lowField: "Low",
                    closeField: "Close"
                }],
                categoryAxis: {
                    labels: {
                        rotation: "auto"
                    }
                },
                navigator: {
                    series: {
                        type: "area",
                        field: "Close"
                    },
                    select: {
                        from: "2009/02/05",
                        to: "2011/10/07"
                    },
                    categoryAxis: {
                        labels: {
                            rotation: "auto"
                        }
                    }
                }
            });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
    </script>
```

### Key Points:
- Use [`kendo.ui.progress`](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/progress) to show or hide a loading indicator during data requests.
- Dynamically toggle the overlay visibility based on the data length in the `requestEnd` event.
- Style the overlay to ensure proper positioning and appearance.

## See Also

- [Stock Chart Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/stockchart/overview)
- [DataSource requestStart Event](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requeststart)
- [DataSource requestEnd Event](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/requestend)
- [kendo.ui.progress Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/progress)

