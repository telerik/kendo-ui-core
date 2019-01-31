---
title: Overview
page_title: Overview | Switch JSP Tag
description: "Get started with the Switch JSP tag in Kendo UI."
slug: overview_switch_uiforjsp
position: 1
---

# Switch JSP Tag Overview

The Switch JSP tag is a server-side wrapper for the [Kendo UI Switch](/api/javascript/ui/switch) widget.

## Getting Started

### The Basics

The Switch displays two exclusive choices.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Switch in the Spring MVC framework.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method.

###### Example

        @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
        public String index() {
            return "web/switch/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `switch` tag.

###### Example

    <kendo:switchButton name="switch">
    </kendo:switchButton>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Switch](/api/javascript/ui/switch#events) by the handler name.

###### Example

    <kendo:switchButton name="switch" change="switchOnChange">
    </kendo:switchButton>

    <script>
    function switchOnChange(e) {
        kendoConsole.log("Change :: checked: " + e.checked);
    }
    </script>

## Reference

### Existing Instances

You are able to reference an existing Switch instance through [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Switch API](/api/javascript/ui/switch) to control its behavior.

###### Example

    // Place this after your Kendo UI Switch tag declaration.
    <script>
        $(function() {
            // Notice that the name attribute of the Switch is used to get its client-side instance.
            var switch = $("#switch").data("kendoSwitch");
        });
    </script>

## See Also

* [Overview of the Kendo UI Switch Widget]({% slug overview_kendoui_switch_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
