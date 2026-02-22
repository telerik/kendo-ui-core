---
title: No Data Template
page_title: No Data Template
description: "Learn how to use the No Data Template of the Kendo UI for jQuery Chart."
components: ["chart"]
slug: kendo_charts_no_data_template
position: 8
---

# No Data Template

The Kendo UI for jQuery Chart component allows to display a message when there is no data to show. This feature is particularly useful when loading data asynchronously, as it reassures users that data may appear after a delay. Customizing the No Data Template is simple, enabling to add styling or interactive elements like buttons to improve usability. The No Data Template can be used for all [chart types]({% slug overview_charttypes_charts %}). Here's how to set up a custom message for scenarios where the chart data is unavailable.

## Example with Bar Chart

```dojo
<div id="chart"></div> 
<script>
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/spain-electricity.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "year",
                dir: "asc"
            }
        });

        $("#chart").kendoChart({
            dataSource: {
                data: []
            },
            title: {
                text: 'Spain electricity production (GWh)'
            },
            series:
                [{
                    field: "nuclear",
                    categoryField: "year",
                    name: "Nuclear"
                }, {
                    field: "hydro",
                    categoryField: "year",
                    name: "Hydro"
                }, {
                    field: "wind",
                    categoryField: "year",
                    name: "Wind"
                }],
            categoryAxis: {
                labels: {
                    rotation: -90
                },
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                labels: {
                    format: "N0"
                },
                majorUnit: 10000,
                line: {
                    visible: false
                }
            },
            noData: {
                template: () => {
                    return `<div class="empty-template">
                                        <p>There is no data to display.</p>
                                        <button id="button" type="button">Load Data</button>
                                    </div>`;
                }
            },
            dataBound: function () {
                $("#button").kendoButton({
                    icon: "arrow-rotate-cw",
                    click: function () {
                        let chart = $("#chart").data("kendoChart");
                        chart.setDataSource(dataSource);
                    }
                })
            }
        });
    });
</script>
```

## See Also

* [API Reference of the Kendo UI for jQuery Chart](api/javascript/dataviz/ui/chart)
* [Overview of the Kendo UI for jQuery Bar Chart (Demos)](https://demos.telerik.com/kendo-ui/bar-charts/index) 
