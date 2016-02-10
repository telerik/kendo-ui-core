---
title: Overview
page_title: Overview | ColorPicker JSP Tag
description: "Get started with the ColorPicker JSP tag in Kendo UI."
slug: overview_colorpicker_uiforjsp
position: 1
---

# ColorPicker JSP Tag Overview

The ColorPicker JSP tag is a server-side wrapper for the [Kendo UI ColorPicker](/api/javascript/ui/colorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/colorpicker/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `colorpicker` tag.

###### Example

        <kendo:colorPicker name="colorpicker" value="#ff0000">
        </kendo:colorPicker>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ColorPicker](/api/javascript/ui/colorpicker#events) by the handler name.

###### Example

    <kendo:colorPicker name="colorpicker" change="colorpicker_change"></kendo:colorPicker>

    <script>
        function colorpicker_change() {
            // Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing ColorPalette instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ColorPalette API](/api/javascript/ui/colorpicker#methods) to control its behavior.

###### Example

    // Put this after your Kendo ColorPicker tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the colorpicker is used to get its client-side instance
        var colorpicker = $("#colorpicker").data("kendoColorPicker");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the ColorPicker:

* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Overview of the ColorPalette JSP Tag]({% slug overview_colorpalette_uiforjsp %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
