---
title: Use Different Date Formats
page_title: Use Different Date Formats | Kendo UI Scheduler
description: "Learn how to use different date formats for a Kendo UI Scheduler events."
slug: howto_usedifferentdateformats_scheduler
---

# Use Different Date Formats

The example below demonstrates how to use different date formats for a Kendo UI Scheduler events.

###### Example

```html
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/10"),
      views: [ "day", "month" ],
      dataSource: {
        transport: {
          read: function(options) {
           var data = [
                {
                id: 1,
                start: "/Date(1370826000000)/",
                end: "/Date(1370827800000)/",
                title: "/Date(1370826000000)/"
              },
                {
                id: 2,
                start: "2013-06-10T04:00:00",
                end: "2013-06-10T04:30:00",
                title: "2013-06-10T04:00:00"
              },
                {
                id: 3,
                start: "2013-06-10T04:00:00Z",
                end: "2013-06-10T04:30:00Z",
                title: "2013-06-10T04:00:00Z"
              }
           ];

           options.success(data);
          }
        }

      }
    });
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Retrieve Current View Date Range]({% slug howto_retrievecurrent_viewdaterange_scheduler %})
* [How to Set Different Start Weekday]({% slug howto_setdifferent_startweekday_scheduler %})
* [How to Set Event Color in the Template]({% slug howto_seteventcolorinthetemplate_scheduler %})
* [How to Show More Events in View Cells]({% slug howto_showmoreevents_inviewcells_scheduler %})
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Set Slot Background Color Using Slot Templates]({% slug howto_setslotbackgroundcolor_usingslottemplates_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
