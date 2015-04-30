---
title: Overview
---

# FlatColorPicker

The FlatColorPicker JSP tag is a server-side wrapper for the [Kendo UI FlatColorPicker](/api/web/flatcolorpicker) widget.

## Getting Started

Here is how to configure a simple Kendo FlatColorPicker:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/flatcolorpicker/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a flatcolorpicker tag:

        <kendo:flatColorPicker name="flatcolorpicker" value="#ff0000">
        </kendo:flatColorPicker>

## Accessing an Existing FlatColorPicker

You can reference an existing FlatColorPicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/flatcolorpicker#methods) to control its behavior.

### Accessing an existing FlatColorPicker instance

    // Put this after your Kendo FlatColorPicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the flatcolorpicker is used to get its client-side instance
        var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
    });
    </script>

## Handling Kendo UI FlatColorPicker events

You can subscribe to all [events](/api/web/flatcolorpicker#events) exposed by Kendo UI FlatColorPicker:

### Subscribe by handler name

    <kendo:flatColorPicker name="flatcolorpicker" change="flatcolorpicker_change"></kendo:flatColorPicker>

    <script>
        function flatcolorpicker_change() {
            // Handle the change event
        }
    </script>
