---
title: Overview
---

# Window

The Window JSP tag is a server-side wrapper for the [Kendo UI Window](/api/web/window) widget.

## Getting Started

Here is how to configure a simple Kendo Window:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/window/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a window tag:

    <kendo:window name="window" title="About us" draggable="true" resizable="true">
        <kendo:window-content>
            <img src="logo.png" alt="Our logo" />
            <p>More content about us.</p>
        </kendo:window-content>
    </kendo:window>

## Accessing an Existing Window

You can reference an existing Window instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/window#methods) to control its behavior.

### Accessing an existing Window instance

    // Put this after your Kendo Window tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the window is used to get its client-side instance
        var windowObject = $("#window").data("kendoWindow");
    });
    </script>

## Loading the window contents through an asynchronous call

You can load views asynchronously through the `content` attribute:

    <c:url value="/web/window/content" var="remoteUrl" />

    <kendo:window name="window" title="About us" content="${remoteUrl}" />

## Handling Kendo UI Window events

You can subscribe to all [events](/api/web/window#events) exposed by Kendo UI Window:

### Subscribe by handler name

    <kendo:window name="window" orientation="horizontal" open="window_open" close="window_close">
    </kendo:window>

    <script>
        function window_expand() {
            // Handle the expand event
        }

        function window_collapse() {
            // Handle the collapse event
        }
    </script>
