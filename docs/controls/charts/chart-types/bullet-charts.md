---
title: Bullet Charts
page_title: Bullet Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Bullet Chart and configure its options."
slug: chart-types-bullet
---

# Bullet Charts

The [Kendo UI Bullet Chart widget](http://demos.telerik.com/kendo-ui/bullet-charts/index) is a variation of a Bar chart.  You can use it to visualize a comparison between an expected (target) and actual (current) value. For example, with a Bullet Chart you can display company profit, employee performance, weather data and so on.

## Configuration

Use the `bullet` series type to create a Kendo UI Bullet Chart.

When binding the Bullet Chart to a DataSource, use the special `currentField` and `targetField` properties of the `series` object to point to the fields in the DataSource that hold the current and target values for each data point.

###### Example

```dojo
      <div id="chart-sales"></div>
      <script>
        function createChart() {
          var salesData = [
            { current: 750, target: 762.5, category: 1 }, { current: 764, target: 768.5, category: 2 },
            { current: 772, target: 770, category: 3 }, { current: 764, target: 773, category: 4 },
            { current: 763, target: 760, category: 5 }, { current: 758, target: 765, category: 6 }];

          $("#chart-sales").kendoChart({
            dataSource: {
              data: salesData
            },
            title: {
              text: "Week 21: Sales Per Day"
            },
            series: [{
              type: "bullet",
              currentField: "current",
              targetField: "target"
            }],
            categoryAxis: {
              field: "category",
              title: {
                text: "Day of week"
              }
            },
            valueAxis: {
              title: {
                text: "Profit (in thousands)"
              }
            }
          });
        }

        $(document).ready(createChart);
      </script>
```

### Orientation

The Bullet Chart orientation can be changed by setting the series type to `verticalBullet`.

###### Example

```dojo
      <div id="chart-sales"></div>
      <script>
        function createChart() {
          var salesData = [
            { current: 750, target: 762.5, category: 1 }, { current: 764, target: 768.5, category: 2 },
            { current: 772, target: 770, category: 3 }, { current: 764, target: 773, category: 4 },
            { current: 763, target: 760, category: 5 }, { current: 758, target: 765, category: 6 }];

          $("#chart-sales").kendoChart({
            dataSource: {
              data: salesData
            },
            series: [{
              type: "verticalBullet",
              currentField: "current",
              targetField: "target"
            }],
            categoryAxis: {
              field: "category"
            }
          });
        }

        $(document).ready(createChart);
      </script>
```


### Customizing the Target Line

You can customize the line that represents the target value using the `series.target` configuration. It exposes three main  options - `border`, `color` and `line` that control the line appearance. Below, you can see an example that uses all three options to customize the target line:

###### Example

```dojo
      <div id="chart-sales"></div>
      <script>
        function createChart() {
          var salesData = [
            { current: 750, target: 762.5, category: 1 }, { current: 764, target: 768.5, category: 2 },
            { current: 772, target: 770, category: 3 }, { current: 764, target: 773, category: 4 },
            { current: 763, target: 760, category: 5 }, { current: 758, target: 765, category: 6 }];

          $("#chart-sales").kendoChart({
            dataSource: {
              data: salesData
            },
            series: [{
              type: "bullet",
              color: "darkblue",
              currentField: "current",
              targetField: "target",
              target: {
                color: 'green',
                line: {
                  width: 4
                },
                border: {
                  width: 2,
                  color: 'turquoise'
                }
              }
            }],
            categoryAxis: {
              field: "category"
            }
          });
        }

        $(document).ready(createChart);
      </script>
```

## See Also

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
