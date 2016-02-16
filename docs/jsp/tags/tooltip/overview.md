---
title: Overview
page_title: Overview | Tooltip JSP Tag
description: "Get started with the Tooltip JSP tag in Kendo UI."
slug: overview_tooltip_uiforjsp
position: 1
---

# Tooltip JSP Tag Overview

The Tooltip JSP tag is a server-side wrapper for the [Kendo UI Tooltip](/api/javascript/ui/tooltip) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Tooltip.

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

**Step 4** Add a `tooltip` tag. Use the element with `container` id as container and show a tooltip for the anchor elements within it.

###### Example

     <kendo:tooltip name="#container" filter="a[title]" />

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Tooltip](/api/javascript/ui/tooltip#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing Tooltip instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Tooltip API](/api/javascript/ui/tooltip#methods) to control its behavior.

###### Example

    // Put this after your Kendo UI Tooltip tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the tooltip is used to get its client-side instance
        var tooltipObject = $("#container").data("kendoTooltip");
    });
    </script>

### Asynchronous Loading

You are able to load views asynchronously through the `content` attribute.

The example below demonstrates how to load the contents of the Tooltip by using an asynchronous call.

###### Example

    <c:url value="/web/tooltip/content" var="remoteUrl" />

    <kendo:tooltip name="#container">
        <kendo:tooltip-content>
            <kendo:tooltip-content-url url="${ remoteUrl }" />
        </kendo:tooltip-content>
    </kendo:tooltip>

## See Also

Other articles on Telerik UI for JSP and on the Tooltip:

* [Overview of the Kendo UI Tooltip Widget]({% slug overview_kendoui_tooltip_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
