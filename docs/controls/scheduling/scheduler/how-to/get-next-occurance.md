---
title: Get next Occurrence
page_title: Get next Occurrence | Kendo UI Scheduler
description: "Learn how to get a next occurrence of the Kendo UI SchedulerEvent in the Kendo UI Scheduler widget."
slug: howto_getthe_next_occurance_scheduler
---

# Get next Occurrence

The example below demonstrates how to get a `next` occurance of the Kendo UI `SchedulerEvent` in a Kendo UI Scheduler widget.

###### Example

```html
    <script>
    var event = new kendo.data.SchedulerEvent({
      title: "Event1",
      start: new Date(2014, 10, 10, 10),
      end: new Date(2014, 10, 10, 11),
      recurrenceRule: "FREQ=WEEKLY"
    });

    //add count for the occurrences
    event.recurrenceRule += ";COUNT=2";

    //generate occurrences
    var nextOccurrence = event.expand(event.start, new Date(2999, 0, 1), "Etc/UTC")[1];

    //log occurrence
    console.log(nextOccurrence);
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Records on touchend]({% slug howto_edit_records_using_touchendonmobile_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Implement Custom Editing in `agenda` View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
