---
title: Overview
page_title: Overview | DateTimePicker JSP Tag
description: "Get started with the DateTimePicker JSP tag in Kendo UI."
slug: overview_datetimepicker_uiforjsp
position: 1
---

# DateTimePicker JSP Tag Overview

The DateTimePicker JSP tag is a server-side wrapper for the [Kendo UI DateTimePicker](/api/javascript/ui/datetimepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateTimePicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/datetimepicker/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `datetimepicker` tag.

###### Example

        <kendo:dateTimePicker name="datetimepicker" value="<%=new java.util.Date()%>">
        </kendo:dateTimePicker>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI DateTimePicker](/api/javascript/ui/datetimepicker#events) by the handler name.

###### Example

        <kendo:dateTimePicker name="datetimepicker" change="datetimepicker_change"></kendo:dateTimePicker>

        <script>
            function datetimepicker_change() {
                //Handle the change event
            }
        </script>

## Reference

### Existing Instances

You are able to reference an existing DateTimePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [DateTimePicker API](/api/javascript/ui/datetimepicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo DateTimePicker tag declaration
        <script>
        $(function() {
            // Notice that the Name() of the datetimepicker is used to get its client-side instance
            var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
        });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the DateTimePicker:

* [Overview of the Kendo UI DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [Overview of the DatePicker JSP Tag]({% slug overview_datepicker_uiforjsp %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
