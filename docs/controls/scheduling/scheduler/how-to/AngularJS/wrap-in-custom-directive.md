---
title: Wrap Scheduler in Custom Directives
page_title: Wrap Scheduler in Custom Directives | Kendo UI Scheduler
description: "Learn how to render the Kendo UI Scheduler by using a custom AngularJS directive."
slug: howto_wrap_schedulerin_custom_directives_angularjs_scheduler
---

# Wrap Scheduler in Custom Directives

The following example demonstrates how to render a Kendo UI Scheduler by using a custom AngularJS directive.

```dojo
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

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
