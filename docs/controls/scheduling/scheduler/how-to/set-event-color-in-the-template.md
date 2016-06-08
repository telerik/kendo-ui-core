---
title: Set Event Color in the Template
page_title: Set Event Color in the Template | Kendo UI Scheduler
description: "Learn how to set the event color in the template of a Kendo UI Scheduler widget."
slug: howto_seteventcolorinthetemplate_scheduler
---

# Set Event Color in the Template

The example below demonstrates how to set the event color in the template of a Kendo UI Scheduler widget.

###### Example

```html
    <div id="example" class="k-content">
      <div id="scheduler"></div>
    </div>

    <script>
      function getColor(data) {
        if (data.title === "The Help") {
          return "red";
        } else {
          return "blur";
        }
      }
    </script>
    <script id="event-template" type="text/x-kendo-template">
    <div class="movie-template" style="background-color:#:getColor(data)#">
        <img src="#= image #">
        <p>
            #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #
      </p>
        <h3>#: title #</h3>
        <a href="#= imdb #">Movie in IMDB</a>
      </div>
    </script>

    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 10:00"),
          endTime: new Date("2013/6/13 23:00"),
          height: 600,
          views: ["day", "agenda"],
          editable: false,
          eventTemplate: $("#event-template").html(),
          dataSource: [
            {
              title: "Fast and furious 6",
              image: "../content/web/scheduler/fast-and-furious.jpg",
              imdb: "http://www.imdb.com/title/tt1905041/",
              start: new Date("2013/6/13 17:00"),
              end: new Date("2013/6/13 18:30")
            },
            {
              title: "The Internship",
              image: "../content/web/scheduler/the-internship.jpg",
              imdb: "http://www.imdb.com/title/tt2234155/",
              start: new Date("2013/6/13 14:00"),
              end: new Date("2013/6/13 15:30")
            },
            {
              title: "The Perks of Being a Wallflower",
              image: "../content/web/scheduler/wallflower.jpg",
              imdb: "http://www.imdb.com/title/tt1659337/",
              start: new Date("2013/6/13 16:00"),
              end: new Date("2013/6/13 17:30")
            },
            {
              title: "The Help",
              image: "../content/web/scheduler/the-help.jpg",
              imdb: "http://www.imdb.com/title/tt1454029/",
              start: new Date("2013/6/13 12:00"),
              end: new Date("2013/6/13 13:30")
            },
            {
              title: "Now You See Me",
              image: "../content/web/scheduler/now-you-see-me.jpg",
              imdb: "http://www.imdb.com/title/tt1670345/",
              start: new Date("2013/6/13 10:00"),
              end: new Date("2013/6/13 11:30")
            },
            {
              title: "Fast and furious 6",
              image: "../content/web/scheduler/fast-and-furious.jpg",
              imdb: "http://www.imdb.com/title/tt1905041/",
              start: new Date("2013/6/13 19:00"),
              end: new Date("2013/6/13 20:30")
            },
            {
              title: "The Internship",
              image: "../content/web/scheduler/the-internship.jpg",
              imdb: "http://www.imdb.com/title/tt2234155/",
              start: new Date("2013/6/13 17:30"),
              end: new Date("2013/6/13 19:00")
            },
            {
              title: "The Perks of Being a Wallflower",
              image: "../content/web/scheduler/wallflower.jpg",
              imdb: "http://www.imdb.com/title/tt1659337/",
              start: new Date("2013/6/13 17:30"),
              end: new Date("2013/6/13 19:00")
            },
            {
              title: "The Help",
              image: "../content/web/scheduler/the-help.jpg",
              imdb: "http://www.imdb.com/title/tt1454029/",
              start: new Date("2013/6/13 13:30"),
              end: new Date("2013/6/13 15:00")
            },
            {
              title: "Now You See Me",
              image: "../content/web/scheduler/now-you-see-me.jpg",
              imdb: "http://www.imdb.com/title/tt1670345/",
              start: new Date("2013/6/13 12:30"),
              end: new Date("2013/6/13 14:00")
            }
          ]
        });
      });
    </script>
    <style scoped>
      .movie-template img {
        float: left;
        margin: 0 8px;
      }
      .movie-template p {
        margin: 5px 0 0;
      }
      .movie-template h3 {
        padding: 0 8px 5px;
        font-size: 12px;
      }
      .movie-template a {
        color: #ffffff;
        font-weight: bold;
        text-decoration: none;
      }
      .k-state-hover .movie-template a,
      .movie-template a:hover {
        color: #000000;
      }
    </style>

```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Set Different Start Weekday]({% slug howto_setdifferent_startweekday_scheduler %})
* [How to Show More Events in View Cells]({% slug howto_showmoreevents_inviewcells_scheduler %})
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Set Slot Background Color Using Slot Templates]({% slug howto_setslotbackgroundcolor_usingslottemplates_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
