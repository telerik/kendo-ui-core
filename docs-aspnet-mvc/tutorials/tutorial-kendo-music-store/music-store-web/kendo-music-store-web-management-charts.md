---
title: Create the Management Charts
page_title: Create the Management Charts | Music Store Web App Tutorial
description: "Learn how to create the Store Management charts in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createstoremanagcharts_muscistorewebapp_aspnetmvc
position: 11
---

# Create the Management Charts

**Figure 1. A screenshot of the Kendo UI Music Store management charts**

![kendo-manage-charts-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-manage-charts-screenshot.png)

When logged in the Music Store as an administrator, an additional button titled **Manage Store** is available in the upper-right corner. This opens the management graphs which can be used to monitor the sales status of the store. This page uses [Kendo UI widgets rendering data visualization](http://demos.telerik.com/kendo-ui/dataviz/overview/index.html) to display the graphs.

This code is located in `Scripts/App/storemanager-graphs.js`.

> **Important**
>
> Log in the Music Store as an administrator by using the `Owner` username and the `p@ssword123` password.

## HTML Setup

The page contains a date range selector that can be used to choose whether to view a day, week, month, or year of data. This selector is represented by a [Kendo UI ListView widget](http://demos.telerik.com/kendo-ui/web/listview/index.html). The main graph is represented by a [Kendo UI Chart widget](http://demos.telerik.com/kendo-ui/dataviz/overview/index.html).

The example below demonstrates the HTML that is used.

###### Example

    <ul id="date-range" class="selector" ></ul>
    <h3>Overall Sales</h3>
    <div id="revenue-chart"></div>

## Widget Initialization

Start by setting up the DataSource for the **Revenue/Orders** chart.

###### Example

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

> **Important**
>
> The data represented by these charts is generated randomly on the server. It was unreasonable to backfill a year's worth of orders into the SQL Local DB on startup.

The grid is now initialized with this data.

###### Example

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

### Specify the Series

The chart contains two series. One is the total revenue per day. The other is the number of orders per day. They are defined in the `series: []` array property.

###### Example

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

Each series is defined by an object that contains the properties listed below:

* The `type` property is the type or style of chart to render. A column chart for the revenue and a line chart for the orders are used here. This demonstrates that it is possible to mix chart types on a single chart.
* The `name` property is the display name that will be shown in the legend of the chart, if the legend is displayed.
* The `field` property is the name of the property on the data that contains the values you want to render on the chart.
* The `color` property is the color used representing the series on the chart and in the legend.
* The `tooltip` property defines what will be displayed if the user hovers over a data point or column. The format string follows the parameters for the [`kendo.format`](http:///api/framework/kendo#format) function.

### Define the Axis

The `valueAxis` property is set to an array of objects that represent the vertical axis on the chart. The number of items in the series and `valueAxis` arrays should be the same.

###### Example

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

The `name` property is the display value that will be placed alongside the vertical axis.

The `categoryAxis` property is set to a single item that represents the horizontal axis.

###### Example

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

The `field` property is the name of the property on the data objects that will be used to get the value to display.

The `format` and `type` properties are used to specify the axis consists of dates and to format them as dates.

The `axisCrossingValue` is an array that specified where each of the vertical axis defined in the `valueAxis` array should be rendered. Each value in the array corresponds to the `valueAxis` with the same array index. For the first value a `0` is specified for the first value to place the **Revenue** vertical axis on the left. To place the **Orders** vertical axis on the right side of the graph, a number has to be chosen that is bigger than the number of items in the `categoryAxis`. The biggest collection here will be when you display data for the **Month** time range, where the last 30 days will be shown, so any number higher than that could have been chosen.

## Date Range Updates

To facilitate selecting a date range to display on the chart, the examples use a Kendo UI ListView widget to display the available date ranges. First, define an array of the date ranges, using `date.js` to get ranges appropriate date ranges. The default selected item is also saved to a separate variable.

###### Example

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

When you query the server for data, add the start and end date of the selected date range as query string parameters. To do this, override the `transport.parameterMap` on the DataSource, referencing the `selectedDateRange` in a closure.

###### Example

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

In the `parameterMap` function, we return an object that has `start` and `end` properties, which will be added to the request to the server.

The HTML element to hold the date range selector also needs to be set to a ListView widget, and the currently selected value set to the default date range.

###### Example

    var dateRangeSelector = $("#date-range");
    dateRangeSelector.kendoListView({
        dataSource: dateRanges,
        template: "<li>#= name #</li>",
        selectable: "single",
        change: dateRangeChanged
    });
    dateRangeSelector.data("kendoListView").select(dateRangeSelector.children()[1]);

The ListView has `selectable: "single"` defined in its configuration, which puts the ListView into a selection mode where one item can be selected at a time. On selection change, the `change` event is triggered. This calls the `dateRangeChanged` function.

###### Example

    var dateRangeChanged = function (e) {
        var data = this.dataSource.view();
        selectedDateRange = data[$(this.select()[0]).index()];
        $("#revenue-chart").data("kendoChart").options.categoryAxis.baseUnit = selectedDateRange.unit;
        revenueChartDataSource.read();
        genreChartDataSource.read();
    };

In this function, take the selected date range item and update the `selectedDateRange` variable. Then the chart data is redrawn by updating its underlying data source, by calling its `.read()` method. The `baseUnit` for the chart is also changed based on the date range. For `Day`, `Week` and `Month`, the scale is set to a single day. For Year, the scale is set to one month. This is done by setting the `options.categoryAxis.baseUnit` property on the chart before it is redrawn.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
