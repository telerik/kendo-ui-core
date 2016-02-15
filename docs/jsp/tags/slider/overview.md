---
title: Overview
page_title: Overview | Slider JSP Tag
description: "Get started with the Slider JSP tag in Kendo UI."
slug: overview_slider_uiforjsp
position: 1
---

# Slider JSP Tag Overview

The Slider JSP tag is a server-side wrapper for the [Kendo UI Slider](/api/javascript/ui/slider) widget.

## Getting Started

### The Basics

There are two types of sliders in Kendo UI:

* Kendo UI Slider, which presents one thumb and two opposing buttons for selecting a single value.
* Kendo UI RangeSlider, which presents two thumbs for defining a range of values.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Slider in the Spring MVC framework.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method.

###### Example

        @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
        public String index() {
            return "web/slider/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `slider` tag.

###### Example

        <kendo:slider name="slider" class="temperature" min="0" max="30" smallStep="1" largeStep="10" value="18">
	    </kendo:slider>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ProgressBar](/api/javascript/ui/slider#events) by the handler name.

###### Example

      <kendo:slider name="slider" change="sliderOnChange" slide="sliderOnSlide">
      </kendo:slider>

      <script>
          function sliderOnSlide(e) {
            kendoConsole.log("Slide :: new slide value is: " + e.value);
        }

        function sliderOnChange(e) {
            kendoConsole.log("Change :: new value is: " + e.value);
        }
      </script>

## Reference

### Existing Instances

You are able to reference an existing Slider instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Slider API](/api/javascript/ui/slider#methods) to control its behavior.

###### Example

    // Put this after your Kendo Slider tag declaration
    <script>
        $(function() {
            // Notice that the name attribute of the slider is used to get its client-side instance
            var slider = $("#slider").data("kendoSlider");
        });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Slider:

* [Overview of the Kendo UI Slider Widget]({% slug overview_kendoui_slider_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
