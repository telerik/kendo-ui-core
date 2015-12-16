---
title: Setting initial view prior to initialization in AngularJS
page_title: Setting initial view prior to initialization in AngularJS
description: Setting initial view prior to initialization in AngularJS
---

# Set initial view conditionally in AngularJS and Kendo UI Mobile application.

The example below demonstrates how to set the initial view at runtime prior to app initialization.

#### Example:

```html
     <style>
      html, body {
        height: 100%;
      }
    </style>
     <body kendo-mobile-application id="kma" ng-app="kendoDemo" ng-controller="appController" k-initial="initialView">
      <kendo-mobile-view id="view1" ng-controller="main1">
        view1
      </kendo-mobile-view>
      <kendo-mobile-view id="view2" ng-controller="main2">
        view2
      </kendo-mobile-view>
    <script>
      angular.module("kendoDemo", [ "kendo.directives" ])
      .run(["$rootScope", function($rootScope) {
      	$rootScope.initialView = "view2"
      }])
      .controller("appController", function($scope) {

      })
      .controller("main1", function($scope) {

      })
      .controller("main2", function($scope) {

      });
    </script>
  </body>
```
