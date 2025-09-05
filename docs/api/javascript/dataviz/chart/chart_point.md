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