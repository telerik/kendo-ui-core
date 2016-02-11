---
title: Overview
page_title: Overview | ColorPalette JSP Tag
description: "Get started with the ColorPalette JSP tag in Kendo UI."
slug: overview_colorpalette_uiforjsp
position: 1
---

# ColorPalette JSP Tag Overview

The ColorPalette JSP tag is a server-side wrapper for the [Kendo UI Chart](/api/javascript/ui/colorpalette) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPalette.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/colorpalette/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `colorPalette` tag.

###### Example

        <kendo:colorPalette name="colorpalette" value="#ff0000">
        </kendo:colorPalette>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ColorPalette](/api/javascript/ui/colorpalette#events) by the handler name.

###### Example

    <kendo:colorPalette name="colorpalette" change="colorpalette_change"></kendo:colorPalette>

    <script>
        function colorpalette_change() {
            // Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing ColorPalette instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ColorPalette API](/api/javascript/ui/colorpalette#methods) to control its behavior.

###### Example

    // Put this after your Kendo ColorPalette tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the colorpalette is used to get its client-side instance
        var colorpalette = $("#colorpalette").data("kendoColorPalette");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the ColorPalette:

* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Overview of the ColorPicker JSP Tag]({% slug overview_colorpicker_uiforjsp %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
