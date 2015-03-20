---
title: Overview
page_title: Calendar HtmlHelper extension for Kendo UI Calendar widget | Kendo UI documentation
description: Getting started with Calendar HtmlHelper extension in quick steps - configure Kendo UI Calendar widget and operate Kendo UI Calendar events.
---

# Calendar

The Calendar HtmlHelper extension is a server-side wrapper for the [Kendo UI Calendar](/api/web/calendar) widget.

## Getting Started

Here is how to configure a simple Kendo Calendar:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a calendar:
    - WebForms

            <%: Html.Kendo().Calendar()
                .Name("calendar") //The name of the calendar is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the calendar
                .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the calendar
                .Value(DateTime.Now) //Set the value of the calendar
            %>
    - Razor

            @(Html.Kendo().Calendar()
                .Name("calendar") //The name of the calendar is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the calendar
                .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the calendar
                .Value(DateTime.Now) //Set the value of the calendar
            )

## Accessing an Existing Calendar

You can reference an existing Calendar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/calendar#methods) to control its behavior.



### Accessing an existing Calendar instance

    //Put this after your Kendo Calendar for ASP.NET MVC declaration
    <script>
    $(function() {
    // Notice that the Name() of the calendar is used to get its client-side instance
    var calendar = $("#calendar").data("kendoCalendar");
    });
    </script>


## Handling Kendo UI Calendar events

You can subscribe to all [events](/api/web/calendar#events) exposed by Kendo UI Calendar:



### WebForms - subscribe by handler name

    <%: Html.Kendo().Calendar()
        .Name("calendar")
        .Events(e => e
            .Change("calendar_change")
            .Navigate("calendar_navigate")
        )
    %>
    <script>
    function calendar_navigate() {
        //Handle the navigate event
    }

    function calendar_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Calendar()
      .Name("calendar")
      .Events(e => e
            .Change("calendar_change")
            .Navigate("calendar_navigate")
      )
    )
    <script>
    function calendar_navigate() {
        //Handle the navigate event
    }

    function calendar_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Calendar()
      .Name("calendar")
      .Events(e => e
          .Change(@<text>
            function() {
                //Handle the change event inline
            }
          </text>)
          .Navigate(@<text>
            function() {
                //Handle the navigate event inline
            }
            </text>)
      )
    )

