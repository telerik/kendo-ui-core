---
title: Calculate Scheduler Height Dynamically
page_title: Calculate Scheduler Height Dynamically | Kendo UI Scheduler
description: "Learn how to dynamically calculate the height of a Kendo UI Scheduler widget."
slug: howto_calculate_scheduler_height_dunamically_scheduler
---

# Calculate Scheduler Height Dynamically

The example below demonstrates how to dynamically calculate the height of the Kendo UI Scheduler widget.

###### Example

```html
<div id="scheduler"></div>
<script type="text/javascript">
$(function() {
    $("#scheduler").kendoScheduler({
        height: 100,
        views: [
            {type: "day"},
            {type: "week", selected: true}
        ],
        timezone: "Etc/UTC",
        date: kendo.date.today(),
        dataSource: [],
        editable: false
    });

    function fitWidget() {
      var widget = $("#scheduler").data("kendoScheduler");
      var height = $(window).outerHeight();

      //size widget to take the whole view
      widget.element.height(height);
      widget.resize(true);
    }

    $(window).resize(function() {
      clearTimeout(window._resizeId);

      window._resizeId = setTimeout(function() {
        console.log("resize");
        fitWidget();
      }, 500);
    });

    fitWidget();
  });
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create Custom Views Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
