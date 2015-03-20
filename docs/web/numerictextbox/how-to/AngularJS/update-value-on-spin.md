---
title: Update value on spin
page_title: Update value on spin
description: Update value on spin
---

# Update value on spin

The example below demonstrates how to update the NumericTextBox value on spin

#### Example:

```html
    <div id="example" ng-app="app">
        <div class="demo-section k-content" ng-controller="mainCtrl">
            <div>
                <h4>Set Value</h4>
                <p>
                  <input kendo-numeric-text-box="numeric"
                         k-min="0" k-max="100"
                         k-on-spin="updateValue()"
                         k-ng-model="value"/>
                </p>
            </div>
            <div>
                <h4>Result</h4>
                Value: {{value}}
            </div>
        </div>
        <script>
            angular.module('app', ["kendo.directives"])
            .controller("mainCtrl", ['$scope',  function ($scope) {
              $scope.value = 50;
              $scope.updateValue = function() {
                this.value = this.numeric.value();
              };
            }]);
        </script>
    </div>
```
