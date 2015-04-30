---
title: Overview
---

# DateTimePicker

The DateTimePicker JSP tag is a server-side wrapper for the [Kendo UI DateTimePicker](/api/web/datetimepicker) widget.

## Getting Started

Here is how to configure a simple Kendo DateTimePicker:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/datetimepicker/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a datetimepicker tag:

        <kendo:dateTimePicker name="datetimepicker" value="<%=new java.util.Date()%>">
        </kendo:dateTimePicker>

## Accessing an Existing DateTimePicker

You can reference an existing DateTimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/datetimepicker#methods) to control its behavior.

### Accessing an existing DateTimePicker instance

    //Put this after your Kendo DateTimePicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the datetimepicker is used to get its client-side instance
        var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
    });
    </script>

## Handling Kendo UI DateTimePicker events

You can subscribe to all [events](/api/web/datetimepicker#events) exposed by Kendo UI DateTimePicker:

### Subscribe by handler name

    <kendo:dateTimePicker name="datetimepicker" change="datetimepicker_change"></kendo:dateTimePicker>

    <script>
        function datetimepicker_change() {
            //Handle the change event
        }
    </script>
