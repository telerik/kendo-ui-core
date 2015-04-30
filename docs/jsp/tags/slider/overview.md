---
title: Overview
---

# Slider

The Slider tag is a server-side wrapper for the [Kendo UI Slider](/api/web/slider) widget.

## Getting Started

There are two types of Slider:

*   Kendo Slider, which presents one thumb and two opposing buttons for selecting a single value
*   Kendo RangeSlider, which present two thumbs for defining a range of values

Here is how to configure the Kendo Slider in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method:

        @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
        public String index() {
            return "web/slider/index";
        }

3.  Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a slider:

        <kendo:slider name="slider" class="temperature" min="0" max="30" smallStep="1" largeStep="10" value="18">
	    </kendo:slider>

## Accessing an Existing Slider

You can reference an existing Slider instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/slider#methods) to control its behavior.

### Accessing an existing Slider instance

    // Put this after your Kendo Slider tag declaration
    <script>
        $(function() {
            // Notice that the name attribute of the slider is used to get its client-side instance
            var slider = $("#slider").data("kendoSlider");
        });
    </script>


## Handling Kendo UI slider events

You can subscribe to all [events](/api/web/slider#events) exposed by Kendo UI slider:

### Subscribe by handler name

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
