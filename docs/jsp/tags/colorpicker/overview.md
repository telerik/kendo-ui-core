---
title: Overview
---

# ColorPicker

The ColorPicker JSP tag is a server-side wrapper for the [Kendo UI ColorPicker](/api/web/colorpicker) widget.

## Getting Started

Here is how to configure a simple Kendo ColorPicker:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/colorpicker/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a colorpicker tag:

        <kendo:colorPicker name="colorpicker" value="#ff0000">
        </kendo:colorPicker>

## Accessing an Existing ColorPicker

You can reference an existing ColorPicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/colorpicker#methods) to control its behavior.

### Accessing an existing ColorPicker instance

    // Put this after your Kendo ColorPicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the colorpicker is used to get its client-side instance
        var colorpicker = $("#colorpicker").data("kendoColorPicker");
    });
    </script>

## Handling Kendo UI ColorPicker events

You can subscribe to all [events](/api/web/colorpicker#events) exposed by Kendo UI ColorPicker:

### Subscribe by handler name

    <kendo:colorPicker name="colorpicker" change="colorpicker_change"></kendo:colorPicker>

    <script>
        function colorpicker_change() {
            // Handle the change event
        }
    </script>
