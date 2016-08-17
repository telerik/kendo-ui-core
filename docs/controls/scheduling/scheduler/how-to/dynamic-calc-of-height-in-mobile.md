---
title: Calculate Scheduler Height Dynamically on Mobile
page_title: Calculate Scheduler Height Dynamically on Mobile | Kendo UI Scheduler
description: "Learn how to dynamically calculate the height of the Kendo UI Scheduler widget on mobile."
slug: howto_calculate_scheduler_height_dunamically_onmobile_scheduler
---

# Calculate Scheduler Height Dynamically on Mobile

The example below demonstrates how to dynamically calculate the height of the Kendo UI Scheduler widget on mobile.

###### Example

```html
<div data-init="initLoginView" data-role="view" id="login"  data-stretch="true">
<header data-role="header">
  <div data-role="navbar">
    <div>TEST</div>
   </div>
</header>
<div data-role="content">
  <div id="scheduler"></div>
<footer data-role="footer">
  <div>footer</div>
</footer>
</div>

<script type="text/javascript">
    var kendoMobileApp = new kendo.mobile.Application($(document.body), {
      skin: "flat"
    });

    function initLoginView(e) {
      $("#scheduler").kendoScheduler({
          date: new Date(),
          height: 100,
          views: [
              {type: "day"},
              {type: "month", selected: true},
              {type: "agenda", selectedDateFormat: "{0:ddd, M/dd/yyyy} - {1:ddd, M/dd/yyyy}"},
          ],
          mobile: "phone",
          timezone: "Etc/UTC",
          dataSource: {
              batch: true,
              transport: {
                  read: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks",
                      dataType: "jsonp"
                  },
                  update: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                      dataType: "jsonp"
                  },
                  create: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                      dataType: "jsonp"
                  },
                  destroy: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                      dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                      if (operation !== "read" && options.models) {
                          return {models: kendo.stringify(options.models)};
                      }
                  }
              },
              schema: {
                  model: {
                      id: "taskId",
                      fields: {
                          taskId: { from: "TaskID", type: "number" },
                          title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                          start: { type: "date", from: "Start" },
                          end: { type: "date", from: "End" },
                          startTimezone: { from: "StartTimezone" },
                          endTimezone: { from: "EndTimezone" },
                          description: { from: "Description" },
                          recurrenceId: { from: "RecurrenceID" },
                          recurrenceRule: { from: "RecurrenceRule" },
                          recurrenceException: { from: "RecurrenceException" },
                          ownerId: { from: "OwnerID", defaultValue: 1 },
                          isAllDay: { type: "boolean", from: "IsAllDay" }
                      }
                  }
              }
          },
          resources: [
              {
                  field: "ownerId",
                  title: "Owner",
                  dataSource: [
                      { text: "Alex", value: 1, color: "#f8a398" },
                      { text: "Bob", value: 2, color: "#51a0ed" },
                      { text: "Charlie", value: 3, color: "#56ca85" }
                  ]
              }
          ]
      });

      function fitWidget() {
        var widget = $("#scheduler").data("kendoScheduler");
        var height = $(".km-content").height();

        height = (height * 80) / 100;

        //size widget to take the whole view
        widget.element.height(height);
        widget.element.closest(".km-pane-wrapper").height(height);

        widget.resize(true);
      }

      $(window).resize(function() {
        fitWidget();
      });

      fitWidget();
    }
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Implement Custom Editing in `agenda` View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
