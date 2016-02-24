---
title: Overview
page_title: Overview | DatePicker JSP Tag
description: "Get started with the DatePicker JSP tag in Kendo UI."
slug: overview_datepicker_uiforjsp
position: 1
---

# DatePicker JSP Tag Overview

The DatePicker JSP tag is a server-side wrapper for the [Kendo UI DatePicker](/api/javascript/ui/datepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DatePicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/datepicker/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `datepicker` tag.

###### Example

        <kendo:datePicker name="datepicker" value="<%= new java.util.Date() %>">
        </kendo:datePicker>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI DatePicker](/api/javascript/ui/datepicker#events) by the handler name.

###### Example

        <kendo:datePicker name="datepicker" change="datepicker_change"></kendo:datePicker>

        <script>
            function datepicker_change() {
                //Handle the change event
            }
        </script>

## Reference

### Existing Instances

You are able to reference an existing DatePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [DatePicker API](/api/javascript/ui/datepicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo DatePicker tag declaration
        <script>
        $(function() {
            // Notice that the Name() of the datepicker is used to get its client-side instance
            var datepicker = $("#datepicker").data("kendoDatePicker");
        });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the DatePicker:

* [Overview of the Kendo UI DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
