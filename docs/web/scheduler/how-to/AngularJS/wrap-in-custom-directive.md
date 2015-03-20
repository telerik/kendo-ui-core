---
title: Wrap Scheduler in a custom directive
page_title: Wrap Scheduler in a custom directive
description: Render Kendo UI Scheduler using a custom AngularJS directive
---

# Render Kendo UI Scheduler using a custom AngularJS directive

The example below demonstrates how to render the scheduler using a custom directive.

#### Example:

```html
<div id="example" ng-app="KendoDemos">
  <div class="demo-section k-content" ng-controller="MyCtrl">
    <h4>Select product</h4>
    <people-scheduler event-source="events"></people-scheduler>
  </div>
</div>

<script>
  angular
  .module("KendoDemos", [ "kendo.directives" ])
  .controller("MyCtrl", function($scope){
    var dataEvents = [
      { id:1, title:"theo@test.com", start: new Date(), end: new Date() },
      { id:2, title:"guest@test.com", start: new Date(), end: new Date() }
    ];

    $scope.events = new kendo.data.SchedulerDataSource({
      transport: {
        read: function(options) {
            options.success(dataEvents);
        }
      }
    });
  })
  .directive(  'peopleScheduler',
        function() {
          return {
            restrict: 'E',
            replace: true,
            scope: {
              source: "=eventSource",
            },

            controller: function($scope, $timeout) {
              $scope.schedulerOptions = {
                date: new Date(),
                dataSource: $scope.source
              };
            },
            template: '<div kendo-scheduler k-options="schedulerOptions"></div>'
          }
        }
      );
</script>
```
