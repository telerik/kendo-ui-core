---
title: Overview
page_title: Overview | TimePicker JSP Tag
description: "Get started with the TimePicker JSP tag in Kendo UI."
slug: overview_timepicker_uiforjsp
position: 1
---

# TimePicker JSP Tag Overview

The TimePicker JSP tag is a server-side wrapper for the [Kendo UI TimePicker](/api/javascript/ui/timepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TimePicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/timepicker/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `timepicker` tag.

###### Example

        <kendo:timePicker name="timepicker" value="<%= new java.util.Date() %>">
        </kendo:timePicker>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TimePicker](/api/javascript/ui/timepicker#events) by the handler name.

###### Example

    <kendo:timePicker name="timepicker" change="timepicker_change"></kendo:timePicker>

    <script>
        function timepicker_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing TimePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [TimePicker API](/api/javascript/ui/timepicker#methods) to control its behavior.

###### Example

    //Put this after your Kendo TimePicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the timepicker is used to get its client-side instance
        var timepicker = $("#timepicker").data("kendoTimePicker");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the TimePicker:

* [Overview of the Kendo UI TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
