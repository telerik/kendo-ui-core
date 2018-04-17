---
title: Render External Chart Legend with AngularJS
description: How do I render external Chart legend for categorical series in with AngularJS?
type: how-to
page_title: Show External Legend in a Chart Using AngularJS
slug: chart-external-legend-angularjs
position: 
tags: chart, angularjs, legend
ticketid: 1161365
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1.221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description
I am trying to render an external legend in the Kendo UI Chart using AngularJS. I saw the [external legend example](https://docs.telerik.com/kendo-ui/controls/charts/how-to/appearance/external-legend)  but this one uses jQuery. How to implement the same functionality using AngularJS?

## Solution
In an AngularJS page, you can use the `ng-repeat` directive to render the external legend. You will also need to add event handlers for:

* `mouseenter`/`mouseleave` events of the external legend items to achieve the series highlight effect.
* `click` event of the external legend to toggle series visibility.

The following example shows the full implementation:

```html
    <style>
      .chart-legend {
        text-align: center;
      }
      .legend-item {
        font: 12px sans-serif;
        margin: 12px;
        cursor: pointer;
      }

      .legend-item .legend-marker {
        display: inline-block;
        width: 8px;
        height: 8px;
      }
    </style>
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div class="demo-section k-content wide">
          <div class="chart-legend">
            <span ng-repeat="x in series" class="legend-item" ng-mouseenter="onMouseEnter($event)" ng-mouseleave="onMouseLeave($event)" ng-click="onLegendClick($event)">
              <span class="legend-marker" ng-style="{background: x.color}">
              </span>
              <span>{{x.name}}</span>
            </span>
          </div>
          <div kendo-chart="chart"
               k-legend="{ visible: false }"
               k-series-defaults="{ type: 'line' }"
               k-series="[
                         { field: 'nuclear', name: 'Nuclear electricity' },
                         { field: 'hydro', name: 'Hydro electricity' },
                         { field: 'wind', name: 'Wind electricity' }
                         ]"
               k-data-source="electricity"
               k-on-render="onRender(kendoEvent)"
               style="height: 250px;"></div>
        </div>

      </div>
      <script>
        angular.module("KendoDemos", ["kendo.directives"])
          .controller("MyCtrl", function ($scope) {
          $scope.series = [];
          $scope.electricity = new kendo.data.DataSource({
            transport: {
              read: {
                url: "../content/dataviz/js/spain-electricity.json",
                dataType: "json"
              }
            },
            sort: {
              field: "year",
              dir: "asc"
            }
          });
          $scope.onRender = function (e) {
            // create a list of the Chart series to bind the legend to
            $scope.series = e.sender.options.series;
          }
          $scope.onMouseEnter = function (e) {
            var name = e.currentTarget.innerText.trim();
            var series = $scope.chart.findSeriesByName(name);
            series.toggleHighlight(true);
          };

          $scope.onMouseLeave = function (e) {
            var name = e.currentTarget.innerText.trim();
            var series = $scope.chart.findSeriesByName(name);
            series.toggleHighlight(false);
          };

          $scope.onLegendClick = function (e) {
            var name = e.currentTarget.innerText.trim();
            var series = $scope.chart.findSeriesByName(name);

            series.toggleVisibility(!series._options.visible);
          };
        })
      </script>
    </div>
```

## See Also

* [ng-repeat directive documentation](https://docs.angularjs.org/api/ng/directive/ngRepeat)
* [AngularJS event handling](https://www.w3schools.com/angular/angular_events.asp)