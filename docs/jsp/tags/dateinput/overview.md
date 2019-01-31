---
title: Overview
page_title: Overview | DateInput JSP Tag
description: "Get started with the DateInput JSP tag in Kendo UI."
slug: overview_dateinput_uiforjsp
position: 1
---

# DateInput JSP Tag Overview

The DateInput JSP tag is a server-side wrapper for the [Kendo UI DateInput](/api/javascript/ui/dateinput) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateInput.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/dateinput/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `dateinput` tag.

###### Example

        <kendo:dateInput name="dateinput" value="<%= new java.util.Date() %>">
        </kendo:dateInput>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI DateInput](/api/javascript/ui/dateinput#events) by the handler name.

###### Example

        <kendo:dateInput name="dateinput" change="dateinput_change"></kendo:dateInput>

        <script>
            function dateinput_change() {
                //Handle the change event
            }
        </script>

## Reference

### Existing Instances

You are able to reference an existing DateInput instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [DateInput API](/api/javascript/ui/dateinput#methods) to control its behavior.

###### Example

        //Put this after your Kendo DateInput tag declaration
        <script>
        $(function() {
            // Notice that the Name() of the dateinput is used to get its client-side instance
            var dateinput = $("#dateinput").data("kendoDateInput");
        });
        </script>

## See Also

* [Overview of the Kendo UI DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [Overview of the Kendo UI DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
