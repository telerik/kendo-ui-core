---
title: Create Stock Chart Navigator in Categorical Charts
page_title: Create Stock Chart Navigator in Categorical Charts - Kendo UI Chart for jQuery
description: "Learn how to create stock chart navigator in categorical charts in the Kendo UI Chart for jQuery."
slug: howto_stock_navigator_categorical_charts
tags: chart, navigator, stock, categorical, linechart
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I implement a stock navigator inside a convetional categorical chart such as the Kendo UI LineChart?

## Solution

Your project might require you to create a secondary chart that should show a subset of data from the main chart. The secondary chart will be created based on the selected categories from the main chart, therefore, the [chart.categoryAxis.select option](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.select#categoryaxisselect) has to be added.

After the user interacts with the selector, recreate the secondary chart in order to depict the newly selected subset of data.

The following example demonstrates how to implement a stock navigator with the categorical Kendo UI LineChart.

```dojo
<div id="example">
      <div class="demo-section k-content">
        <div id="chart"></div>
        <div id="detailchart"></div>
      </div>
      <div class="box">
        <h4>Mousewheel</h4>
        <div class="box-col" style="width: 500px;">
          <ul class="options">
            <li>
              <input id="reverse" type="checkbox" />
              <label for="reverse">Reverse</label>
            </li>
          </ul>
        </div>
        <div class="box-col">
          <ul class="options">
            <li>
              <label for="zoom">Zoom direction</label>
              <select id="zoom">
                <option value="both">Both</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            title: {
              text: "Olympic Medals won by USA"
            },
            legend: {
              position: "bottom"
            },
            seriesDefaults: {
              type: "line"
            },
            series: [{
              name: "Gold Medals",
              data: [40, 32, 34, 36, 45, 33, 34, 42, 83, 36, 37, 44, 37, 35, 36, 46],
              color: "#f3ac32"
            }, {
              name: "Silver Medals",
              data: [19, 25, 21, 26, 28, 31, 35, 46, 60, 31, 34, 32, 24, 40, 38, 29],
              color: "#b8b8b8"
            }, {
              name: "Bronze Medals",
              data: [17, 17, 16, 28, 34, 30, 25, 55, 30, 27, 37, 25, 33, 26, 36, 29],
              color: "#bb6e36"
            }],
            categoryAxis: {
              categories: [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012],
              majorGridLines: {
                visible: false
              },
              select: {
                from: 2,
                to: 5
              }
            },
            selectStart: onSelectStart,
            select: onSelect,
            selectEnd: onSelectEnd
          });
        }

        function createDetailChart(from, to, yearfrom, yearto) {
          var goldmedalsdata = [40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46];
          var goldmedalsforperiod = goldmedalsdata.slice(from, to);

          var silvermedalsdata = [19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29];
          var silvermedalsforperiod = silvermedalsdata.slice(from, to);

          var bronzemedalsdata = [17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29];
          var bronzemedalsforperiod = bronzemedalsdata.slice(from, to);

          var categoriesforperiod = [];

          var startYear = yearfrom;

          while (yearfrom <= yearto)
          {
            categoriesforperiod.push(yearfrom);
            yearfrom = yearfrom + 4;
          }

          $("#detailchart").kendoChart({
            title: {
              text: "Olympic Medals won from " + startYear + " to "  + yearto
            },
            legend: {
              position: "bottom"
            },
            seriesDefaults: {
              type: "line"
            },
            series: [{
              name: "Gold Medals",
              data: goldmedalsforperiod,
              color: "#f3ac32"
            }, {
              name: "Silver Medals",
              data: silvermedalsforperiod,
              color: "#b8b8b8"
            }, {
              name: "Bronze Medals",
              data: bronzemedalsforperiod,
              color: "#bb6e36"
            }],
            categoryAxis: {
              categories: categoriesforperiod,
              majorGridLines: {
                visible: false
              }
            }
          });
        }

        function formatRange(e) {
          var categories = e.axis.categories;
          createDetailChart(e.from, e.to, categories[e.from], categories[e.to - 1]);
          return kendo.format("{0} - {1} ({2} - {3})",
                              e.from, e.to,
                              categories[e.from],
                              // The last category included in the selection is at (to - 1)
                              categories[e.to - 1]
                             );
        }

        function onSelectStart(e) {
          setTimeout(function(){ // ensure that the selection has finished before rendering the seconary chart
            formatRange(e);
          });
        }

        function onSelect(e) {
         setTimeout(function(){ // ensure that the selection has finished before rendering the seconary chart
            formatRange(e)
          });
        }

        function onSelectEnd(e) {
         setTimeout(function(){ // ensure that the selection has finished before rendering the seconary chart
            formatRange(e)
          });
        }

        function setOptions() {
          var chart = $("#chart").data("kendoChart");

          $.extend(true /* deep */, chart.options, {
            categoryAxis: {
              select: {
                mousewheel: {
                  reverse: $("#reverse").prop("checked"),
                  zoom: $("#zoom").val()
                }
              }
            }
          });

          chart.refresh();
        }

        $("#reverse, #zoom").click(setOptions);

        $(document).ready(createChart);
        $("#example").bind("kendo:skinChange", createChart);

      </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/dataviz/ui/chart)
