---
title: Create the Store Management Charts
position: 11
---

# Create the Store Management Charts - Kendo UI Music Store

![kendo-manage-charts-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-manage-charts-screenshot.png)

When logged in to the Music Store as an administrator an additional button titled "Manage Store" is made available in the upper right corner.
This opens the management graphs which can be used to monitor the sales status of the store.
This page uses [Kendo UI data vizualization](http://demos.telerik.com/kendo-ui/dataviz/overview/index.html) to render the graphs.

This code is located in **Scripts/App/storemanager-graphs.js**.

> You can log in to the Music Store as the administrator by using the username "Owner" and the password "p@ssword123".

## Set up the HTML

The page contains a date range selector that can be used to choose whether to view a day, week, month, or year of data.
This selector is represented by a [Kendo UI ListView](http://demos.telerik.com/kendo-ui/web/listview/index.html) widget.
The main graph is represented by a [Kendo UI Chart](http://demos.telerik.com/kendo-ui/dataviz/overview/index.html).
The HTML used is:

    <ul id="date-range" class="selector" ></ul>
    <h3>Overall Sales</h3>
    <div id="revenue-chart"></div>

## Initialize the Widgets

We start by setting up the DataSource for the Revenue/Orders chart:

    var revenueChartDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: store.config.salesAndRevenueUrl,
                dataType: "json"
            }
        },
        sort: {
            field: "Day",
            dir: "asc"
        }
    });

> Please note that the data represented by these charts is generated randomly on the server.
> It was unreasonable to backfill a year's worth of orders into the SQL Local DB on startup.

Then the grid is initialized with this data:

    var createOrderRevenueChart = function () {
        $("#revenue-chart").kendoChart({
            theme: $(document).data("kendoSkin") || "default",
            dataSource: revenueChartDataSource,
            legend: {
                position: "top"
            },
            series: [
                ...
            ],
            valueAxis: [
                ...
            ],
            categoryAxis: {
                ...
            },
            tooltip: {
                visible: true
            }
        });
    };

### Specify Series

The chart contains 2 series. One is the total revenue per day. The other is the number of orders per day.
There are defined in the **series: []** array property.

            series: [
                {
                    type: "column",
                    name: "Revenue",
                    field: "Revenue",
                    color: "#cc6e38",
                    tooltip: {
                        visible: true,
                        format: "{0:c}"
                    }
                },
                {
                    type: "line",
                    name: "Orders",
                    field: "Orders",
                    color: "#5a5959",
                    axis: "orders",
                    tooltip: {
                        visible: true,
                        format: "{0} Orders"
                    }
                }
            ]

Each series is defined by an object that contains these properties:

**type** is the type or style of chart to render. Here we use a column chart for the revenue and a line chart for the orders.
This demonstrates that we can mix chart types on a single chart.

**name** is the display name that will be put in the legend of the chart, if the legend is displayed.

**field** is the name of the property on the data that contains the values we want to render on the chart.

**color** is the color used to represent the series on the chart and in the legend.

**tooltip** defines what will be displayed if the user puts the mouse over a data point or column.
The format string follows the parameters for the [kendo.format](http:///api/framework/kendo#format) function.

### Specify the Axis

The **valueAxis** property is set to an array of objects that represent the vertical axis on the chart.
The number of items in the series and valueAxis arrays should be the same.

            valueAxis: [
                {
                    title: { text: "Revenue" },
                    labels: {
                        format: "c"
                    }
                },
                {
                    name: "orders",
                    title: { text: "Number of Orders" },
                    color: "#ec5e0a"
                }
            ]

**name** is the display value that will be placed along side the vertical axis.

The **categoryAxis** property is set to a single item that represents the horizontal axis.

            categoryAxis: {
                field: "Day",
                format: "d",
                type: "date",
                baseUnit: selectedDateRange.unit,
                labels: {
                    rotation: 60
                },
                axisCrossingValue: [0, 1000]
            }

**field** is the name of the property on the data objects that will be used to get the value to display.

**format** and **type** are used to specify the axis consists of dates and to format them as dates.

**labels.rotation**

The **axisCrossingValue** is an array that specified where each of the vertical axis defined in the valueAxis array should be rendered.
Each value in the array corresponds to the valueAxis with the same array index.
We specify 0 for the first value to place the "Revenue" vertical axis on the left.
To place the "Orders" vertical axis on the right side of the graph, a number has to be chosen that is better than the number of items
in the categoryAxis. Here our biggest collection will be when we display data for the "Month" time range, where we show the last 30 days,
so any number higher than that could have been chosen.

## Change the Date Ranges

To facilitate selecting a date range to display on the chart, we used a Kendo UI ListView widget to display the available date ranges.
First we defined an array of the date ranges, using **date.js** to get ranges appropriate date ranges.
The default selected item is also saved to a separate variable.

    var dateRanges = [{
        name: "Day",
        start: Date.today().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy"),
        unit: "days"
    },
    {
        name: "Week",
        start: Date.today().add(-7).days().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy"),
        unit: "days"
    },
    {
        name: "Month",
        start: Date.today().add(-1).months().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy"),
        unit: "days"
    },
    {
        name: "Year",
        start: Date.today().add(-1).years().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy"),
        unit: "months"
    }];

    var selectedDateRange = dateRanges[1];

When we query the server for data, we want to add the start and end date of the selected date range as query string parameters.
To do this, we override the **transport.parameterMap** on the DataSource, referencing the **selectedDateRange** in a closure.

    var revenueChartDataSource = new kendo.data.DataSource({
        transport: {
            ...

            parameterMap: function (options, type) {
                return {
                    start: selectedDateRange.start,
                    end: selectedDateRange.end
                };
            }

            ...

In the parameterMap function, we return an object that has **start** and **end** properties, which will be added to the request to the server.

The HTML element to hold the date range selector also needs to be set to a ListView widget, and the currently selected value set to the default date range:

    var dateRangeSelector = $("#date-range");
    dateRangeSelector.kendoListView({
        dataSource: dateRanges,
        template: "<li>#= name #</li>",
        selectable: "single",
        change: dateRangeChanged
    });
    dateRangeSelector.data("kendoListView").select(dateRangeSelector.children()[1]);

The ListView has **selectable: "single"** defined in its configuration, which puts the ListView into a selection mode where one item can be selected at a time.
On selection change, the **change** event is triggered. This calls the **dateRangeChanged** function:

    var dateRangeChanged = function (e) {
        var data = this.dataSource.view();
        selectedDateRange = data[$(this.select()[0]).index()];
        $("#revenue-chart").data("kendoChart").options.categoryAxis.baseUnit = selectedDateRange.unit;
        revenueChartDataSource.read();
        genreChartDataSource.read();
    };

In this function, we take the selected date range item and update the **selectedDateRange** variable.
Then the chart data is redrawn by updating its underlying data source, by calling its **.read()** method.
The **baseUnit** for the chart is also changed based on the date range.
For Day, Week and Month, the scale is set to a single day.
For Year, the scale is set to one month.
This is done by setting the **options.categoryAxis.baseUnit** property on the chart before it is redrawn.
