---
title: Overview
page_title: Overview | FlatColorPicker JSP Tag
description: "Get started with the FlatColorPicker JSP tag in Kendo UI."
slug: overview_flatcolorpicker_uiforjsp
position: 1
---

# FlatColorPicker JSP Tag Overview

The FlatColorPicker JSP tag is a server-side wrapper for the [Kendo UI FlatColorPicker](/api/javascript/ui/flatcolorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI FlatColorPicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/flatcolorpicker/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `flatcolorpicker` tag.

###### Example

        <kendo:flatColorPicker name="flatcolorpicker" value="#ff0000">
        </kendo:flatColorPicker>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI FlatColorPicker](/api/javascript/ui/flatcolorpicker#events) by the handler name.

###### Example

    <kendo:flatColorPicker name="flatcolorpicker" change="flatcolorpicker_change"></kendo:flatColorPicker>

    <script>
        function flatcolorpicker_change() {
            // Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing FlatColorPicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [FlatColorPicker API](/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

###### Example

    // Put this after your Kendo FlatColorPicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the flatcolorpicker is used to get its client-side instance
        var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the FlatColorPicker:

* [FlatColorPicker JavaScript API](/api/javascript/ui/flatcolorpicker)
* [FlatColorPicker JSP API](/api/jsp/flatcolorpicker/messages)
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
