---
title: Render External Chart Legend with AngularJS
page_title: Show External Legend in AngularJS - Kendo UI Chart for jQuery
description: Learn how to render an external Chart legend for the categorical series when working with Kendo UI in AngularJS applications.
type: how-to
slug: chart-external-legend-angularjs
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
		<td>Progress® Kendo UI® Chart for jQuery</td>
	</tr>
</table>

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.

## Description

The [external legend example](https://docs.telerik.com/kendo-ui/controls/charts/how-to/appearance/external-legend) uses jQuery.

How can I render an external legend in the Kendo UI Chart in AngularJS?

## Solution

In an AngularJS page, use the `ng-repeat` directive to render the external legend and add event handlers for:

* `mouseenter` and `mouseleave` events of the external legend items to achieve the series highlight effect.
* `click` event of the external legend to toggle the visibility of the series.

> The example loads Kendo UI 2023.3.1010 version.

```dojo
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>

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
              <span>{% raw %}{{x.name}}{% endraw %}</span>
            </span>
          </div>
          <div kendo-chart="chart"
               k-legend="{ visible: false }"
               k-series-defaults="{ type: 'column', categoryField: 'ProductName' }"
               k-series="[
                         { field: 'UnitPrice', name: 'UnitPrice' },
                         { field: 'UnitsInStock', name: 'UnitsInStock' }
                         ]"
               k-category-axis="{labels: {rotation: 45}}"
               k-data-source="productsData"
               k-tooltip="{visible: true, template: '#:series.name#: #:value#'}"
               k-on-render="onRender(kendoEvent)"
               style="height: 450px;"></div>
        </div>

      </div>
      <script>
        angular.module("KendoDemos", ["kendo.directives"])
          .controller("MyCtrl", function ($scope) {
          $scope.series = [];
          $scope.productsData = new kendo.data.DataSource({
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/Products"
              }
            },
            pageSize: 10
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

* [ng-repeat AngularJS Directive](https://docs.angularjs.org/api/ng/directive/ngRepeat)
* [Event Handling in AngularJS](https://www.w3schools.com/angular/angular_events.asp)
