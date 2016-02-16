---
title: Overview
page_title: Overview | Window JSP Tag
description: "Get started with the Window JSP tag in Kendo UI."
slug: overview_window_uiforjsp
position: 1
---

# Window JSP Tag Overview

The Window JSP tag is a server-side wrapper for the [Kendo UI Window](/api/javascript/ui/window) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Window.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/window/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `window` tag.

###### Example

    <kendo:window name="window" title="About us" draggable="true" resizable="true">
        <kendo:window-content>
            <img src="logo.png" alt="Our logo" />
            <p>More content about us.</p>
        </kendo:window-content>
    </kendo:window>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Window](/api/javascript/ui/window#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing Window instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Window API](/api/javascript/ui/window#methods) to control its behavior.

###### Example

    // Put this after your Kendo Window tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the window is used to get its client-side instance
        var windowObject = $("#window").data("kendoWindow");
    });
    </script>

### Asynchronous Loading

You are able to load views asynchronously through the `content` attribute.

The example below demonstrates how to load the contents of the Window by using an asynchronous call.

###### Example

    <c:url value="/web/window/content" var="remoteUrl" />

    <kendo:window name="window" title="About us" content="${remoteUrl}" />

## See Also

Other articles on Telerik UI for JSP and on the Window:

* [Overview of the Kendo UI Window Widget]({% slug overview_kendoui_window_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
