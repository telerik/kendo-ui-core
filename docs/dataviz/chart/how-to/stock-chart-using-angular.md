---
title: Create Stock Chart using AngularJS
page_title: Create Stock Chart using AngularJS
description: Create Stock Chart using AngularJS
---

# Customize chart theme

This example demonstrates how to create stock chart using AngularJS

#### Example:

```html
    <div id="example" ng-app="MyApp" ng-controller="MyCtrl">
      <div class="demo-section k-content">
        <div kendo-stock-chart k-data-source="dataSource"       
             k-date-field="dataField"
             k-series="series"
             k-category-axis="categoryAxis"
             k-navigator="navigator"
             k-title="title">	
        </div>
      </div>
    </div>
    <script>
      angular.module("MyApp", [ "kendo.directives" ]);
      function MyCtrl($scope) {

        $scope.dataSource = {
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/content/dataviz/js/boeing-stock.json",
              dataType: "json"
            }
          }
        };

        $scope.title = {
          text: "The Boeing Company \n (NYSE:BA)"
        };

        $scope.dataField = "Date";

        $scope.series = [{
          type: "candlestick",
          openField: "Open",
          highField: "High",
          lowField: "Low",
          closeField: "Close"
        }];

        $scope.navigator = {
          series: {
            type: "area",
            field: "Close"
          },
          select: {
            from: "2009/02/05",
            to: "2011/10/07"
          }
        };

        $scope.categoryAxis = {
          notes: {
            data: [{
              value: "2001/01/01",
              label: {
                text: "01"
              }
            }, {
              value: "2002/01/01",
              label: {
                text: "02"
              }
            }, {
              value: "2003/01/01",
              label: {
                text: "03"
              }
            }, {
              value: "2004/01/01",
              label: {
                text: "04"
              }
            }, {
              value: "2005/01/01",
              label: {
                text: "05"
              }
            }, {
              value: "2006/01/01",
              label: {
                text: "06"
              }
            }, {
              value: "2007/01/01",
              label: {
                text: "07"
              }
            }, {
              value: "2008/01/01",
              label: {
                text: "08"
              }
            }, {
              value: "2009/01/01",
              label: {
                text: "09"
              }
            }, {
              value: "2010/01/01",
              label: {
                text: "10"
              }
            }, {
              value: "2011/01/01",
              label: {
                text: "11"
              }
            }, {
              value: "2012/01/01",
              label: {
                text: "12"
              }
            }]
          }
        };
      }
    </script>
```
