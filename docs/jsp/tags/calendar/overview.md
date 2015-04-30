---
title: Overview
---

# Calendar

The Calendar JSP tag is a server-side wrapper for the [Kendo UI Calendar](/api/web/calendar) widget.

## Getting Started

Here is how to configure a simple Kendo Calendar:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/calendar/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a calendar tag:

        <kendo:calendar name="calendar" value="<%= new java.util.Date() %>">
        </kendo:calendar>

## Accessing an Existing Calendar

You can reference an existing Calendar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/calendar#methods) to control its behavior.

### Accessing an existing Calendar instance

    //Put this after your Kendo Calendar tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the calendar is used to get its client-side instance
        var calendar = $("#calendar").data("kendoCalendar");
    });
    </script>

## Handling Kendo UI Calendar events

You can subscribe to all [events](/api/web/datepicker#events) exposed by Kendo UI calendar:

### Subscribe by handler name

    <kendo:calendar name="calendar" change="calendar_change"></kendo:calendar>

    <script>
        function calendar_change() {
            //Handle the change event
        }
    </script>
