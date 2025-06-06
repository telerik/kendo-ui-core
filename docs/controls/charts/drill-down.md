---
title: Drilldown
page_title: jQuery Chart Documentation - Drilldown
description: "Get started with the jQuery Chart by Kendo UI and learn how to configure drilldown charts."
slug: drilldown_charts_widget
position: 5
---

# Drilldown Charts

The Kendo UI Chart supports drilldown functionality for exploring data.

The drilldown function allows users to click on a point (bar, pie segment, etc.) in order to navigate to a different view.
The new view usually contains finer grained data about the selected item, like breakdown by product of the selected category.

The view hierarchy is displayed in a breadcrumb for easy navigation back to previous views.

## Getting Started

To configure a chart series for drilldown:
* Set [`drilldownField`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.drilldownfield) to a field that contains the drilldown series configuration for each point.
* Add a [`kendoChartBreadcrumb`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chartbreadcrumb) component and link it to the Chart.

```dojo
    <nav id="breadcrumb"></nav>
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: 'column',
          name: 'Total Sales By Company',
          field: 'sales',
          categoryField: 'company',
          drilldownField: 'details',
          data: [{
              company: 'Company A',
              sales: 100,
              details: {
                  name: 'Company A Sales By Product',
                  type: 'column',
                  field: 'sales',
                  categoryField: 'product',
                  data: [{
                    product: 'Product 1',
                    sales: 80
                  }, {
                    product: 'Product 2',
                    sales: 20
                  }]
              }
          }, {
              company: 'Company B',
              sales: 200,
              details: {
                  name: 'Company A Sales By Product',
                  type: 'column',
                  field: 'sales',
                  categoryField: 'product',
                  data: [{
                    product: 'Product 1',
                    sales: 40
                  }, {
                    product: 'Product 2',
                    sales: 160
                  }]
              }
          }]
        }]
      });

      $('#breadcrumb').kendoChartBreadcrumb({
        chart: "#chart"
      });
    </script>
```

## Drilling Down with Dynamic Data

To populate the drilldown series on demand:
* Set [`drilldownField`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.drilldownfield) to a field that contains the drilldown value field for each point.
* Define a `drilldownSeriesFactory` function that returns the series definition for each data point.

```dojo
    <nav id="breadcrumb"></nav>
    <div id="chart"></div>
    <script>
      var vehiclesByModel = {
        'Tesla': [{
          model: 'Model 3',
          count: 225350
        }, {
          model: 'Model Y',
          count: 40159
        }],
        'VW': [{
          model: 'ID.3',
          count: 60274
        }, {
          model: 'ID.4',
          count: 20302
        }]
      };

      var vehiclesByMake = [{
        company: 'Tesla',
        count: 314159
      }, {
        company: 'VW',
        count: 112645
      }];

      function drilldownByModel(make) {
        const data = vehiclesByModel[make];
        if (data) {
          return {
            type: 'column',
            name: make + ' Sales by Model',
            data,
            field: 'count',
            categoryField: 'model'
          };
        }
      };

      $("#chart").kendoChart({
        series: [{
          type: 'column',
          name: 'Battery EVs registered in 2022',
          data: vehiclesByMake,
          field: 'count',
          categoryField: 'company',
          drilldownField: 'company',
          drilldownSeriesFactory: drilldownByModel
        }]
      });

      $('#breadcrumb').kendoChartBreadcrumb({
        chart: "#chart"
      });
    </script>
```

## Drilling Down with Async Data

To populate the drilldown series on demand:
* Set [`drilldownField`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.drilldownfield) to a field that contains the drilldown value field for each point.
* Define a `drilldownSeriesFactory` function that returns a `Promise` that resolves to the series definition for each data point.

```dojo
    <nav id="breadcrumb"></nav>
    <div id="chart"></div>
    <script>
      var vehiclesByModel = {
        'Tesla': [{
          model: 'Model 3',
          count: 225350
        }, {
          model: 'Model Y',
          count: 40159
        }],
        'VW': [{
          model: 'ID.3',
          count: 60274
        }, {
          model: 'ID.4',
          count: 20302
        }]
      };

      var vehiclesByMake = [{
        company: 'Tesla',
        count: 314159
      }, {
        company: 'VW',
        count: 112645
      }];

      function drilldownByModel(make) {
        return new Promise(function(resolve, reject) {
            const data = vehiclesByModel[make];
            if (data) {
                resolve({
                    type: 'column',
                    name: make + ' Sales by Model',
                    data,
                    field: 'count',
                    categoryField: 'model'
                });
            } else {
                reject('No data for ' + model);
            }
        });
      };

      $("#chart").kendoChart({
        series: [{
          type: 'column',
          name: 'Battery EVs registered in 2022',
          data: vehiclesByMake,
          field: 'count',
          categoryField: 'company',
          drilldownField: 'company',
          drilldownSeriesFactory: drilldownByModel
        }]
      });

      $('#breadcrumb').kendoChartBreadcrumb({
        chart: "#chart"
      });
    </script>
```

## Customizing the Breadcrumb Root Item

To customize the root item of the chart Breadcrumb, set the [`rootItem`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart-breadcrumb/configuration/rootitem).

```dojo
  <nav id="breadcrumb"></nav>
  <div id="chart"></div>
  <script>
    $("#chart").kendoChart({
      series: [{
        type: 'column',
        name: 'Total Sales By Company',
        field: 'sales',
        categoryField: 'company',
        drilldownField: 'details',
        data: [{
            company: 'Company A',
            sales: 100,
            details: {
                name: 'Company A Sales By Product',
                type: 'column',
                field: 'sales',
                categoryField: 'product',
                data: [{
                  product: 'Product 1',
                  sales: 80
                }, {
                  product: 'Product 2',
                  sales: 20
                }]
            }
        }]
      }]
    });

    $('#breadcrumb').kendoChartBreadcrumb({
      chart: '#chart',
      rootItem: { type: 'rootitem', text: 'Home', showIcon: false, showText: true }
    });
  </script>
```

## Implementing Custom Navigation

To implement a custom drilldown navigation:
* Handle the [`drilldown`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/drilldown) event to append new drilldown levels to the navigation.
* Call the [`resetDrilldownLevel`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/resetdrilldownlevel) method to return to a previous level.

```dojo
  <nav id="breadcrumb"></nav>
  <div id="chart"></div>
  <script>
    var navItems = [{
      type: 'rootitem',
      icon: 'home',
      text: 'Home',
      showIcon: true
    }];

    function refreshBreadcrumb() {
      var breadcrumb = jQuery('#breadcrumb').getKendoBreadcrumb();
      breadcrumb.items(navItems);
    }

    function onDrilldown(e) {
        navItems.push({
          text: e.point.category.toString()
        });
        refreshBreadcrumb();
    }

    function onBreadcrumbClick(e) {
        var level = navItems.indexOf(e.item);
        $("#chart").getKendoChart().resetDrilldownLevel(level);

        navItems = navItems.slice(0, level + 1);
        refreshBreadcrumb();
    }

    var chart = $("#chart").kendoChart({
      series: [{
        type: 'column',
        name: 'Total Sales By Company',
        field: 'sales',
        categoryField: 'company',
        drilldownField: 'details',
        data: [{
          company: 'Company A',
          sales: 100,
          details: {
            name: 'Company A Sales By Product',
            type: 'column',
            field: 'sales',
            categoryField: 'product',
            data: [{
              product: 'Product 1',
              sales: 80
            }, {
              product: 'Product 2',
              sales: 20
            }]
          }
        }, {
          company: 'Company B',
          sales: 200,
          details: {
            name: 'Company A Sales By Product',
            type: 'column',
            field: 'sales',
            categoryField: 'product',
            data: [{
              product: 'Product 1',
              sales: 40
            }, {
              product: 'Product 2',
              sales: 160
            }]
          }
        }]
      }],
      drilldown: onDrilldown
    });

    $('#breadcrumb').kendoBreadcrumb({
      items: navItems,
      click: onBreadcrumbClick
    });
  </script>
```

## See Also

* [Drilldown Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-drilldown/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
