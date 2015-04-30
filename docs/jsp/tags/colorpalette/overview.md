---
title: Overview
---

# ColorPalette

The ColorPalette JSP tag is a server-side wrapper for the [Kendo UI ColorPalette](/api/web/colorpalette) widget.

## Getting Started

Here is how to configure a simple Kendo ColorPalette:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/colorpalette/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a colorpalette tag:

        <kendo:colorPalette name="colorpalette" value="#ff0000">
        </kendo:colorPalette>

## Accessing an Existing ColorPalette

You can reference an existing ColorPalette instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/colorpalette#methods) to control its behavior.

### Accessing an existing ColorPalette instance

    // Put this after your Kendo ColorPalette tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the colorpalette is used to get its client-side instance
        var colorpalette = $("#colorpalette").data("kendoColorPalette");
    });
    </script>

## Handling Kendo UI ColorPalette events

You can subscribe to all [events](/api/web/colorpalette#events) exposed by Kendo UI ColorPalette:

### Subscribe by handler name

    <kendo:colorPalette name="colorpalette" change="colorpalette_change"></kendo:colorPalette>

    <script>
        function colorpalette_change() {
            // Handle the change event
        }
    </script>
