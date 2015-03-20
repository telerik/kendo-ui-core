---
title: Update value on keyup
page_title: Update value on keyup
description: Update value on keyup
---

# Update value on keyup

The example below demonstrates how to update the NumericTextBox value on keyup

#### Example:

```html
    <div id="example" ng-app="app">
        <div class="demo-section k-content" ng-controller="mainCtrl">
            <div>
                <h4>Set Value</h4>
                <p>
                  <input kendo-numeric-text-box="numeric"
                         k-min="0" k-max="100"
                         k-ng-model="value" />
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

              $scope.$on("kendoWidgetCreated", function() {
                  $scope.numeric.element.on("keyup", function() {
                      $scope.numeric.value($scope.numeric.element.val());
                      $scope.numeric.trigger("change");
                  });
                });
            }]);
        </script>
    </div>
```
