---
title: Overview
page_title: Overview | Calendar JSP Tag
description: "Get started with the Calendar JSP tag in Kendo UI."
slug: overview_calendar_uiforjsp
position: 1
---

# Calendar JSP Tag Overview

The Calendar JSP tag is a server-side wrapper for the [Kendo UI Calendar](/api/javascript/ui/calendar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Calendar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/calendar/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `calendar` tag.

###### Example

        <kendo:calendar name="calendar" value="<%= new java.util.Date() %>">
        </kendo:calendar>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Calendar](/api/javascript/ui/calendar#events) by the handler name.

###### Example

    <kendo:calendar name="calendar" change="calendar_change"></kendo:calendar>

    <script>
        function calendar_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing Calendar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Calendar API](/api/javascript/ui/calendar#methods) to control its behavior.

###### Example

    //Put this after your Kendo Calendar tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the calendar is used to get its client-side instance
        var calendar = $("#calendar").data("kendoCalendar");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Calendar:

* [Overview of the Kendo UI Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
