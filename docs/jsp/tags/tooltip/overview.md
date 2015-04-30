---
title: Overview
---

# Tooltip

The Tooltip JSP tag is a server-side wrapper for the [Kendo UI Tooltip](/api/web/tooltip) widget.

## Getting Started

Here is how to configure a simple Kendo Tooltip:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/window/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a tooltip tag (use the element with `container` id as container and show tooltip for anchor elements within it):

     <kendo:tooltip name="#container" filter="a[title]" />

## Accessing an Existing Tooltip

You can reference an existing Tooltip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tooltip#methods) to control its behavior.

### Accessing an existing Tooltip instance

    // Put this after your Kendo Tooltip tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the tooltip is used to get its client-side instance
        var tooltipObject = $("#container").data("kendoTooltip");
    });
    </script>

## Loading the tooltip contents through an asynchronous call

You can load views asynchronously through the `content` attribute:

    <c:url value="/web/tooltip/content" var="remoteUrl" />

    <kendo:tooltip name="#container">
        <kendo:tooltip-content>
            <kendo:tooltip-content-url url="${ remoteUrl }" />
        </kendo:tooltip-content>
    </kendo:tooltip>

## Handling Kendo UI Tooltip events

You can subscribe to all [events](/api/web/tooltip#events) exposed by Kendo UI Tooltip:

### Subscribe by handler name

    <kendo:tooltip name="#container" show="tooltip_show" hide="tooltip_hide">
    </kendo:tooltip>

    <script>
        function tooltip_show() {
            // Handle the show event
        }

        function tooltip_hide() {
            // Handle the hide event
        }
    </script>
