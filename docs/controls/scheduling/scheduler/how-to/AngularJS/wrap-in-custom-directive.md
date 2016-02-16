---
title: Wrap Scheduler in Custom Directives
page_title: Wrap Scheduler in Custom Directives | Kendo UI Scheduler
description: "Learn how to render Kendo UI Scheduler using a custom AngularJS directive."
slug: howto_wrap_schedulerin_custom_directives_angularjs_scheduler
---

# Wrap Scheduler in Custom Directives

The example below demonstrates how to render Kendo UI Scheduler using a custom AngularJS directive.

###### Example

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

## See Also

Other how-to examples on Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Customize Edit and Event Templates]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})

Other articles and how-to examples on Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create Custom Views Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

For additional runnable examples on Kendo UI Scheduler, browse the [Scheduler **How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
