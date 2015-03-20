---
title: Range selection using DatePicker widgets
page_title: Range selection using DatePicker widgets
description: Range selection using DatePicker widgets
---

# Range selection using DatePicker widgets

The example below demonstrates how to impelement a range selection between two datepickers in AngularJS environment.

#### Example:

```html
<div id="example" ng-app="KendoDemos">
  <div class="demo-section k-content"ng-controller="MyCtrl">
    <div class="box-col">
      <h4>From date:</h4>
      <input id="fromDatepicker" kendo-date-picker
             ng-model="fromDateString"
             k-ng-model="fromDateObject"
             k-max = "maxDate"
             k-rebind="maxDate"
             k-on-change="fromDateChanged()" />
      <span>{{fromDateString}}</span>
      <span>max date:{{toDateObject}}</span>
    </div>
    <div class="box-col">
      <h4>To date:</h4>
      <input id="toDatepicker" kendo-date-picker
             ng-model="toDateString"
             k-ng-model="toDateObject"
             k-min = "minDate"
             k-rebind = "minDate"
             k-on-change="toDateChanged()"/>
      <span>{{toDateString}}</span>
      <span>min date:{{fromDateObject}}</span>
    </div>
    <div>
      <button id="clear" ng-click="clear()">Clear</button>
    </div>
  </div>
</div>
<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
          .controller("MyCtrl", function($scope){
            $scope.fromDateString;
            $scope.fromDateObject = null;
            $scope.toDateString;
            $scope.toDateObject = null;
            $scope.maxDate = new Date();
            $scope.minDate = new Date(2000, 0, 1, 0, 0, 0);
            $scope.fromDateChanged = function(){
              $scope.minDate = new Date($scope.fromDateString);
              console.log("min changed " + $scope.fromDateString);
            };
            $scope.toDateChanged = function(){
              $scope.maxDate = new Date($scope.toDateString);
              console.log("min changed " + $scope.toDateString);
            };
            $scope.clear = function(){
              $scope.fromDateString = '';
              $scope.toDateString = '';
              $scope.fromDateObject = null;
              $scope.toDateObject = null;
              $scope.maxDate = new Date();
              $scope.minDate = new Date(2000, 0, 1, 0, 0, 0);
            }
          })
</script>
```
