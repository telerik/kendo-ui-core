---
title: Wrap Scheduler in Custom Directives
page_title: Wrap Scheduler in Custom Directives | Kendo UI Scheduler
description: "Learn how to render the Kendo UI Scheduler by using a custom AngularJS directive."
slug: howto_wrap_schedulerin_custom_directives_angularjs_scheduler
---

# Wrap Scheduler in Custom Directives

The following example demonstrates how to render a Kendo UI Scheduler by using a custom AngularJS directive.

###### Example

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

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_customize_editand_events_templates_angularjs_scheduler %}).
