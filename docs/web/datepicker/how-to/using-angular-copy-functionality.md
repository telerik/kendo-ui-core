---
title: Using AngularJS copy functionality
page_title: Using AngularJS copy functionality
description: Using AngularJS copy functionality
---

# Using AngularJS copy functionality

The example below demonstrates how to use AngularJS copy functionality with a Kendo UI DatePicker

#### Example:

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content"ng-controller="MyCtrl">
        <div class="box-col">
          <h4>Select date:</h4>
          <input kendo-date-picker
                 k-ng-model="info.dateObject" />

          <button ng-click="reset()">RESET</button>
          <button ng-click="update(info)">SAVE</button>

          <pre>
          dateObject: {{ info.dateObject | date:"EEEE, MMMM d, yyyy" }}
          typeof dateObject: {{ getType(info.dateObject) }}
          dateObject instanceof Date: {{ isDate(info.dateObject) }}
        </pre>

        </div>
      </div>
      <style scoped>
        .box-col {
          width: 400px;
        }
      </style>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ]);
      function MyCtrl($scope) {
        $scope.getType = function(x) {
          return typeof x;
        };
        $scope.isDate = function(x) {
          return x instanceof Date;
        };

        $scope.master= {};

        $scope.info= {
          dateObject: new Date(2014, 10, 10)
        };

        $scope.update = function(info) {
          // Example with 1 argument
          $scope.master= angular.copy(info);
        };

        $scope.reset = function() {
          // Example with 2 arguments
          $scope.info = {
            dateObject: null 
          };
        };
      }
    </script>
```
