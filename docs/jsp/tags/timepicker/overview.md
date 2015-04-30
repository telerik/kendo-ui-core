---
title: Overview
---

# TimePicker

The TimePicker JSP tag is a server-side wrapper for the [Kendo UI TimePicker](/api/web/timepicker) widget.

## Getting Started

Here is how to configure a simple Kendo TimePicker:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/timepicker/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a timepicker tag:

        <kendo:timePicker name="timepicker" value="<%= new java.util.Date() %>">
        </kendo:timePicker>

## Accessing an Existing TimePicker

You can reference an existing TimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/timepicker#methods) to control its behavior.

### Accessing an existing TimePicker instance

    //Put this after your Kendo TimePicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the timepicker is used to get its client-side instance
        var timepicker = $("#timepicker").data("kendoTimePicker");
    });
    </script>

## Handling Kendo UI TimePicker events

You can subscribe to all [events](/api/web/timepicker#events) exposed by Kendo UI timepicker:

### Subscribe by handler name

    <kendo:timePicker name="timepicker" change="timepicker_change"></kendo:timePicker>

    <script>
        function timepicker_change() {
            //Handle the change event
        }
    </script>
