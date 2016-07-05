---
title: Use Local observable Data Object
page_title: Use Local observable Data Object | Kendo UI Scheduler
description: "Learn how to bind the Kendo UI Scheduler widget to a local `observableObject` and change the properties during runtime."
slug: howto_uselocalobservable_dataobject_scheduler
---

# Use Local observable Data Object

The example below demonstrates how to bind the Kendo UI Scheduler widget to a local `observableObject` and change the properties during runtime.

###### Example

```html
    <div id="example">
      <button id="update">Update</button>
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        var data = [{
          title: "Test",
          start: new Date(2013, 5, 13, 10),
          end: new Date(2013, 5, 13, 11)
        }];

        var observableData = new kendo.data.ObservableArray(data);

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day"
          ],
          dataSource: observableData
        });

        $("#update").click(function(e) {
          observableData[0].set("end", new Date(2013, 5, 13, 13));
        });
      });
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Set Event Color in the Template]({% slug howto_seteventcolorinthetemplate_scheduler %})
* [How to Show More Events in View Cells]({% slug howto_showmoreevents_inviewcells_scheduler %})
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
