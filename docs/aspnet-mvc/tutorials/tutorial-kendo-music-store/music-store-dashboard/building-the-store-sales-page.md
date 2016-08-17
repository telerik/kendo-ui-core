---
title: Create the Sales Page
page_title: Create the Sales Page | Music Store Dashboard Tutorial
description: "Learn how to build the Kendo UI Music Store Dashboard Store Sales page by using Telerik UI for ASP.NET MVC."
slug: buildthestoressales_muscistoredashboard_aspnetmvc
position: 4
---

# Create the Sales Page

**Figure 1. A snapshot of the Kendo UI Music Store Sales Overview page**

![sales-overview](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-overview.png)

This page is constructed to show a collection of data visualization graphs, exposing several different views of store data. The page is dominated by a general sales graph, which can be filtered by five different dimensions, selectable by the buttons to the left of graph.

Two smaller graphs present data grouped by genre&mdash;the Sales and Searches graphs. These views provide a way to change the type of chart shown, changing the presentation of the data based on the user selection of the graph type. The data can also be changed between **Weekly**, **Monthly** and **Yearly** data.

This page is contained in the `app/views/sales.html`, `app/sales-view.js`, and `Content/sales-view.css` files.

## Configuration

### Change Chart Types Dynamically

The **Sales By Genre** chart allows for the chart type to be changed dynamically.

For example, the chart type can be changed from a bar graph to a line graph by using the buttons on the bottom-right side.

**Figure 2. A bar graph representation of the Sales Overview page**

![sales-by-genre-bar](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-by-genre-bar.png)

**Figure 3. A line graph representation of the Sales Overview page**

![sales-by-genre-line](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-by-genre-line.png)

**Figure 4. The side buttons through which the graphic representation of the data can be changed**

![sales-by-genre-bar-button-highlight](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-by-genre-bar-button-highlight.png)

The **Sales By Genre** and **Searches By Genre** charts are built similarly, with simple declarative markup and powerful JavaScript piping. The chart is contained within its own `<div>`, with an accompanying `<span>` that contains the buttons for changing the chart type. The **Sales By Genre** chart is constructed as demonstrated in the example below.

###### Example

	<div class="sales-by-genre-chart half-width-chart"></div>
    <span class="store-sales-chart-type change-genre-sales-chart-type">
       	<span class="chart-type-item chart-type-area " data-charttype="area"></span>
        <span class="chart-type-item chart-type-line " data-charttype="line"></span>
        <span class="chart-type-item chart-type-column  chart-type-column-selected" data-charttype="column"></span>
        <span class="chart-type-item chart-type-bar " data-charttype="bar"></span>
        <span class="chart-type-item chart-type-pie " data-charttype="pie"></span>
        <span class="chart-type-item chart-type-stacked-bar " data-charttype="stacked-bar"></span>
	</span>

Note the `change-genre-sales-chart-type` class on the governing `<span>`, and the `chart-type-item` on the individual `<span>`. These classes are used to register click events that lead to the chart type changing.

###### Example

	$(".chart-type-item", ".change-genre-sales-chart-type").click(function (e) {
        e.preventDefault();
        changeChartType.call(this, ".sales-by-genre-chart", ".change-genre-sales-chart-type");
    });

The `changeChartType` is a function that performs the chart type change, taking two parameters&mdash;the class of the chart to change and the class of the governing `<span>` containing the buttons. The use of the `call()` invocation, along with passing `this` tells the function to perform as a member of the button, rather than globally.

###### Example

	function changeChartType(chartSelector, parentChartType) {

        removeSelectedGenreSalesType(parentChartType);

        var $this = $(this),
            chartType = $this.data("charttype"),
            chart = $(chartSelector).data("kendoChart"),
            colors = ["#808600", "#cc5300", "#cc7100"],
            i = 0;

        $this.addClass("chart-type-" + chartType + "-selected");

        for (i = 0; i < chart.options.series.length; i++) {

            if (chartType !== "stacked-bar") {
                chart.options.series[i].type = chartType;
                chart.options.series[i].stack = false;
            } else {
                chart.options.series[i].type = "bar";
                chart.options.series[i].stack = true;
            }

            chart.options.series[i].color = colors[i];
            chart.options.series[i].opacity = 1;

        }

        chart.redraw();
    }

This function clears the selection state of the buttons for the chart in question. The chart is located using jQuery and the first parameter `chartSelector`&mdash;this provides access to the chart options. The button that is called is marked as selected using the `$this` variable, provided through the `call()` invocation. The chart options are then changed to the selected chart type, and the chart is commanded to redraw, showing the new chart.

### Change Temporal Data Dynamically

The **Sales By Genre** and **Searches By Genre** charts also provide a method to dynamically change the temporal data in use. For example, the **Sales By Genre** chart can be changed from showing **Weekly** data to showing **Monthly** data by using the buttons on top.

**Figure 5. A chart graph displaying Weekly data**

![sales-by-genre-bar-weekly](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-by-genre-bar.png)

**Figure 6. A chart graph displaying Monthly data**

![sales-by-genre-bar-monthly](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/sales-by-genre-bar-monthly.png)

As before, the two charts are constructed similarly, with declarative markup, JavaScript, and jQuery.

The chart is defined by the buttons in the previous section, and so they are not included here with the declaration of the tabs used as buttons for the temporal data.

###### Example

    <div class="chart-group-tabs">
        <span class="time-sales-tab time-sales-tab-selected genre-sales-tab" data-period="weekly">Weekly</span>
        <span class="time-sales-tab genre-sales-tab" data-period="monthly">Monthly</span>
        <span class="time-sales-tab genre-sales-tab" data-period="yearly">Yearly</span>
    </div>

The `genre-sales-tab` class click event handler is then defined in the Javascript.

###### Example

    $(".genre-sales-tab").click(function (e) {

        var $this = $(this);

        if ($this.hasClass("time-sales-tab-selected")) {
            return;
        }

        $(".time-sales-tab", "#sales-by-genre").removeClass("time-sales-tab-selected");

        var period = $this.data('period');

        $this.addClass("time-sales-tab-selected");

        salesByGenreChartDataSource
            .options.transport.read.url = "api/salesbygenre/" + period;

        $('.sales-by-genre-chart')
            .data('kendoChart')
            .options.categoryAxis.labels = getLabelOptions(period);

        salesByGenreChartDataSource.read();
    });

This function is set to only update the data if a different set of data is selected. Then, it updates the selection in the UI. It retrieves the desired time period from the `data-period` attribute, then adjusts the data source that provides the chart with its data. This results in a different API call, and, therefore, new data. The `read()` function of the data source is then called to update the data in the chart. This makes the chart redraw, presenting the new data to the user.

## See Also

Other articles on the Kendo UI Music Store Dashboard sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Dashboard Project]({% slug projectsetup_muscistoredashboard_aspnetmvc %})
* [Create the Single-Page App]({% slug createthespa_muscistoredashboard_aspnetmvc %})
* [Create the Main Page]({% slug createthemainpage_muscistoredashboard_aspnetmvc %})
* [Build the Social Stats Page]({% slug buildsocialstats_muscistoredashboard_aspnetmvc %})
