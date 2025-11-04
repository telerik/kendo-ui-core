---
title: ChartPoint
page_title: API reference for Kendo UI ChartPoint
res_type: api
---

# kendo.dataviz.ChartPoint

Represents a chart series point.

## Fields

### category `String|Date|Number`

The point category value. Available only for categorical points(Bar, Line, etc.).


<div class="meta-api-description">
How do I set the category label for each data point in a Kendo UI chart? Access and manipulate the category or group label associated with data points in charts such as bars or lines, enabling users to read, set, filter, group, sort, or label points based on their categorical values; useful for axis labeling, organizing data by category, applying filters to specific groups, controlling data classification in visualizations, and managing how chart points correspond to named categories or groupings.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "column",
            data: [10, 20, 30]
        }],
        categoryAxis: {
            categories: ["Q1", "Q2", "Q3"]
        },
        seriesClick: function(e) {
            console.log("Point category:", e.point.category);
        }
    });
    </script>

### dataItem `Object`

The point dataItem.


<div class="meta-api-description">
How do I access the underlying data for a specific chart point in Kendo UI Chart? Retrieve or update the underlying data record associated with a specific chart point, enabling you to read original source values, bind or modify data tied to visual elements, handle events using the raw data object, and dynamically render or customize templates based on the data entry linked to each point in the chart series or dataset.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        dataSource: {
            data: [
                { product: "Product A", sales: 100, profit: 20 },
                { product: "Product B", sales: 150, profit: 30 },
                { product: "Product C", sales: 80, profit: 15 }
            ]
        },
        series: [{
            type: "column",
            field: "sales",
            categoryField: "product"
        }],
        seriesClick: function(e) {
            console.log("Point dataItem:", e.point.dataItem);
            console.log("Product:", e.point.dataItem.product);
            console.log("Profit:", e.point.dataItem.profit);
        }
    });
    </script>

### percentage `Number`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts points.


<div class="meta-api-description">
How to get percentage values from pie chart data points in Kendo UI for jQuery? Access the relative portion or share of a data point within charts like pie, donut, or 100% stacked charts by retrieving its value expressed as a percentage of the total. This enables calculating and displaying how much each slice, segment, or point contributes to the overall dataset, useful for dynamic labels, tooltips, legends, comparisons of proportional sizes, or formatting fractional representations. Whether you want to show percentage values, compare parts to wholes, or analyze distribution and composition in visualizations, you can extract and use the point's fractional share to represent its share of the whole in charts that aggregate to 100%.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "pie",
            data: [
                { category: "Product A", value: 30 },
                { category: "Product B", value: 50 },
                { category: "Product C", value: 20 }
            ],
            field: "value",
            categoryField: "category"
        }],
        seriesClick: function(e) {
            console.log("Point percentage:", e.point.percentage + "%");
            console.log("Point value:", e.point.value);
        }
    });
    </script>

### runningTotal `Number`

The sum of point values since the last "runningTotal" [summary point](/api/javascript/dataviz/ui/chart/configuration/series.summaryfield). Available for waterfall series points.


<div class="meta-api-description">
How to calculate cumulative sum of values in Kendo UI Waterfall Chart? Calculate or retrieve the cumulative sum or running total of values at a specific point in a waterfall chart, enabling tracking of progressive aggregation or sequential sums between intermediate summary steps, often used to monitor ongoing totals, cumulative metrics, or incremental changes in data series, applicable primarily to waterfall chart points where each data entry contributes to a continuous rolling total or sum since the last reset or summary marker.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "waterfall",
            data: [
                { name: "Initial", value: 100 },
                { name: "Income", value: 50 },
                { name: "Expenses", value: -30 },
                { name: "Summary", value: 0, summary: "runningTotal" }
            ],
            field: "value",
            categoryField: "name",
            summaryField: "summary"
        }],
        seriesClick: function(e) {
            console.log("Point running total:", e.point.runningTotal);
            console.log("Point value:", e.point.value);
        }
    });
    </script>

### total `Number`

The sum of all previous series values. Available for waterfall series points.


<div class="meta-api-description">
How do I calculate the cumulative sum in a Kendo UI chart? Calculate or access the cumulative sum, running total, or aggregated value of preceding data points in a waterfall chart series to track progressive totals, accumulated amounts, or step-wise aggregations. Enable retrieval or computation of the ongoing total for each point in sequential data visualization, supporting analysis of how individual values contribute to a cumulative progression or final aggregation within charting or data series representations.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "waterfall",
            data: [
                { name: "Initial", value: 100 },
                { name: "Income", value: 50 },
                { name: "Expenses", value: -30 },
                { name: "Final Total", value: 0, summary: "total" }
            ],
            field: "value",
            categoryField: "name",
            summaryField: "summary"
        }],
        seriesClick: function(e) {
            console.log("Point total:", e.point.total);
            console.log("Point value:", e.point.value);
        }
    });
    </script>

### value `Number`

The point value.


<div class="meta-api-description">
How do I access and modify data values associated with individual chart points in a Kendo UI Chart? Access and modify the numerical or categorical data associated with individual chart points to define plotting coordinates, control the data values driving series calculations, customize axis alignment, influence label content and tooltip information, and adjust aggregation or summary computations within data visualizations. This includes setting or retrieving point values that determine placement on graphs, influence how series data updates, and affect how interactive elements like tooltips or labels display context-sensitive information, enabling control over data-driven rendering and analytical calculations in charts.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "line",
            data: [10, 25, 35, 20, 30]
        }],
        categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May"]
        },
        seriesClick: function(e) {
            console.log("Point value:", e.point.value);
            console.log("Point category:", e.point.category);
        }
    });
    </script>

### visual `kendo.drawing.Element`

The Kendo Drawing element used to draw the point.


<div class="meta-api-description">
How do I customize the appearance of individual data points in a Kendo UI chart? Access and modify the graphical element representing a chart data point, enabling customization of its appearance by inspecting or replacing the rendering shape, applying custom styles, animations, or hit-testing logic; configure, control, or override the underlying drawing object used to visualize points within charts for advanced visual tweaks, rendering adjustments, and interactive effects in data visualizations.
</div>

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            type: "column",
            data: [10, 20, 30, 25]
        }],
        categoryAxis: {
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        seriesClick: function(e) {
            console.log("Point visual element:", e.point.visual);
            // Access the drawing element properties
            if (e.point.visual) {
                console.log("Visual type:", e.point.visual.nodeType);
            }
        }
    });
    </script>