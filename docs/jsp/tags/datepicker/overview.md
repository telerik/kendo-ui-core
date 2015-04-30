---
title: Overview
---

# DatePicker

The DatePicker JSP tag is a server-side wrapper for the [Kendo UI DatePicker](/api/web/datepicker) widget.

## Getting Started

Here is how to configure a simple Kendo DatePicker:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/datepicker/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a datepicker tag:

        <kendo:datePicker name="datepicker" value="<%= new java.util.Date() %>">
        </kendo:datePicker>

## Accessing an Existing DatePicker

You can reference an existing DatePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/datepicker#methods) to control its behavior.

### Accessing an existing DatePicker instance

    //Put this after your Kendo DatePicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the datepicker is used to get its client-side instance
        var datepicker = $("#datepicker").data("kendoDatePicker");
    });
    </script>

## Handling Kendo UI DatePicker events

You can subscribe to all [events](/api/web/datepicker#events) exposed by Kendo UI datepicker:

### Subscribe by handler name

    <kendo:datePicker name="datepicker" change="datepicker_change"></kendo:datePicker>

    <script>
        function datepicker_change() {
            //Handle the change event
        }
    </script>
