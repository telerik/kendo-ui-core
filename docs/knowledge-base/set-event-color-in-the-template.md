---
title: Set the Event Color in the Scheduler Template
page_title: Set the Event Color in the Scheduler Template 
description: "Learn how to set the event color in the template of the Kendo UI for jQuery Scheduler component."
previous_url: /controls/scheduling/scheduler/how-to/set-event-color-in-the-template, /controls/scheduling/scheduler/how-to/appearance/set-event-color-in-the-template
slug: howto_seteventcolorinthetemplate_scheduler
tags: telerik, kendo, jquery, scheduler, set, event, color, in, the, template 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set the event color in the template of the Kendo UI for jQuery Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/fast-and-furious.jpg",
              imdb: "https://www.imdb.com/title/tt1905041/",
              start: new Date("2013/6/13 17:00"),
              end: new Date("2013/6/13 18:30")
            },
            {
              title: "The Internship",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-internship.jpg",
              imdb: "https://www.imdb.com/title/tt2234155/",
              start: new Date("2013/6/13 14:00"),
              end: new Date("2013/6/13 15:30")
            },
            {
              title: "The Perks of Being a Wallflower",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/wallflower.jpg",
              imdb: "https://www.imdb.com/title/tt1659337/",
              start: new Date("2013/6/13 16:00"),
              end: new Date("2013/6/13 17:30")
            },
            {
              title: "The Help",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-help.jpg",
              imdb: "https://www.imdb.com/title/tt1454029/",
              start: new Date("2013/6/13 12:00"),
              end: new Date("2013/6/13 13:30")
            },
            {
              title: "Now You See Me",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/now-you-see-me.jpg",
              imdb: "https://www.imdb.com/title/tt1670345/",
              start: new Date("2013/6/13 10:00"),
              end: new Date("2013/6/13 11:30")
            },
            {
              title: "Fast and furious 6",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/fast-and-furious.jpg",
              imdb: "https://www.imdb.com/title/tt1905041/",
              start: new Date("2013/6/13 19:00"),
              end: new Date("2013/6/13 20:30")
            },
            {
              title: "The Internship",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-internship.jpg",
              imdb: "https://www.imdb.com/title/tt2234155/",
              start: new Date("2013/6/13 17:30"),
              end: new Date("2013/6/13 19:00")
            },
            {
              title: "The Perks of Being a Wallflower",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/wallflower.jpg",
              imdb: "https://www.imdb.com/title/tt1659337/",
              start: new Date("2013/6/13 17:30"),
              end: new Date("2013/6/13 19:00")
            },
            {
              title: "The Help",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-help.jpg",
              imdb: "https://www.imdb.com/title/tt1454029/",
              start: new Date("2013/6/13 13:30"),
              end: new Date("2013/6/13 15:00")
            },
            {
              title: "Now You See Me",
              image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/now-you-see-me.jpg",
              imdb: "https://www.imdb.com/title/tt1670345/",
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
      .k-hover .movie-template a,
      .movie-template a:hover {
        color: #000000;
      }
    </style>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
