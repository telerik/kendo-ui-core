---
title: Bullet Charts
page_title: jQuery Chart Documentation | Bullet Charts
description: "Learn how to create a Kendo UI Bullet Chart and configure its options."
slug: chart-types-bullet
---

# Bullet Charts

Bullet Charts represent a variation of the [Bar Chart]({% slug bartypeofcharts_widget %}).

* [Demo page for the Bullet Chart](https://demos.telerik.com/kendo-ui/bullet-charts/index)

## Getting Started

You can use the Bullet Chart to visualize a comparison between an expected (target) and actual (current) value&mdash;for example, company profit, employee performance, weather data, and so on.

To create a Bullet series, use `bullet` in the `series` configuration.

* [Binding the Bullet chart](#binding-the-bullet-chart)
* [Setting the orientation](#setting-the-orientation)
* [Customizing the target value lines](#customizing-the-target-value-lines)

## Binding the Bullet Chart

To bind the Bullet Chart to a DataSource, set the special `currentField` and `targetField` properties of the `series` object and point them to the fields in the DataSource that hold the current and target values for each data point.

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

## Setting the Orientation

You can change the orientation of the Bullet Chart by setting the series type to `verticalBullet`.

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

### Customizing the Target Value Lines

You can customize the line that represents the target value through the `series.target` configuration. `target` exposes the `border`, `color`, and `line` main settings that control the line appearance.

The following example demonstrates how to use all three options to customize the target line.

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

* [Basic Usage of the Bullet Chart (Demo)](https://demos.telerik.com/kendo-ui/bullet-charts/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
