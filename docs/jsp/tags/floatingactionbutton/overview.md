---
title: Overview
page_title: Overview 
description: "Get started with the FloatingActionButton JSP tag in Kendo UI."
slug: overview_floatingactionbutton_uiforjsp
position: 1
---

# FloatingActionButton JSP Tag Overview

The FloatingActionButton JSP tag is a server-side wrapper for the [Kendo UI FloatingActionButton](/api/javascript/ui/floatingactionbutton) widget.

## Getting Started

### Configuration

The FloatingActionButton provides a set of default API configuration options that can be set during its initialization such as size, shape, themeColor, align, positionMode, and so on. Below are listed the steps for you to follow when configuring the Kendo UI FloatingActionButton for JSP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/floatingactionbutton/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `floatingActionButton` tag and configure the component.

        <kendo:floatingActionButton name="fab"
            positionMode="absolute"
            icon="cart"
            text="Add To Cart"
            themeColor="success"
            size="medium">
        </kendo:floatingActionButton>

## Alignment

The Kendo UI FloatingActionButton exposes the `align`,`alignOffset` and `positionMode` configuration options. These three options work in conjunction allowing you to position the FloatingActionButton component precisely as per the application requirements. The example below demonstrates how to configure the alignment and positioning of the FloatingActionButton

        <kendo:floatingActionButton name="fab"
            positionMode="fixed" //positions the button relative to the viewport
            align="top end">
            <kendo:floatingActionButton-alignOffset x="50" y="80"></kendo:floatingActionButton-alignOffset>
        </kendo:floatingActionButton>

## Appearance

The Kendo UI FloatingActionButton for JSP allows you to customize the appearance of the component by setting the size, shape, color, icon and text of the FloatingActionButton. Following the Material Design guidelines we advise when configuring the FloatingActionButton to display additional related actions or "speed dial actions" to set only the icon option for the button and use labels to dispay additional information for the related actions, if needed. Alternatively, if you would like to have an icon and text for the Kendo UI FloatingActionButton consider omitting the display of additional actions. The example below demonstrates how to configure the speed dial action items of the FloatingActionButton:

        <kendo:floatingActionButton name="fab"
            positionMode="absolute"
            align="bottom end"
            icon="share"
            themeColor="success"
            size="medium">
            <kendo:floatingActionButton-items>
                <kendo:floatingActionButton-item icon="email" label="Email" click="onItemClick"></kendo:floatingActionButton-item>
                <kendo:floatingActionButton-item icon="twitter" label="Twitter" click="onItemClick"></kendo:floatingActionButton-item>
            </kendo:floatingActionButton-items>
        </kendo:floatingActionButton>

        <script>
            function onItemClick(e) {
                console.log(e.item.label + " clicked");
            };
        </script>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI FloatingActionButton](/api/javascript/ui/floatingactionbutton#events) by the handler name.

    <kendo:floatingActionButton name="fab" click="floatingactionbutton_click"></kendo:floatingActionButton>

    <script>
        function floatingactionbutton_click() {
            // Handle the click event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing FloatingActionButton instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [FloatingActionButton API](/api/javascript/ui/floatingactionbutton#methods) to control its behavior.

    <kendo:floatingActionButton name="fab"</kendo:floatingActionButton>
    
    // Put this after your Kendo FloatingActionButton tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the floatingactionbutton is used to get its client-side instance
        var floatingactionbutton = $("#fab").data("kendoFloatingActionButton");
    });
    </script>

## See Also

* [Overview of the Kendo UI FloatingActionButton Widget]({% slug overview_kendoui_floatingactionbutton_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
