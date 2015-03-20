---
title: Modify event styling on databound
page_title: Modify event styling on databound
description: Modify event styling on databound
---

# Modify event styling on databound

The example below demonstrates how to use the databound event to modify the event styling.
#### Example:

```html
    <div id="example" class="k-content">
      <div id="scheduler"></div>
    </div>

    <script id="event-template" type="text/x-kendo-template">
    <div class="movie-template">
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
          dataBound: function () {
            var view = this.view();
            var events = this.dataSource.view();
            var eventElement;
            var event;

            for (var idx = 0, length = events.length; idx < length; idx++) {
              event = events[idx];

              //get event element
              eventElement = view.element.find("[data-uid=" + event.uid + "]");

              //set the backgroud of the element
              eventElement.css("background-color", "red");
            }
          },
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
