---
title: Overview
page_title: Overview | Kendo UI RangeSlider
description: "Learn how to initialize the Kendo UI RangeSlider widget and configure its behaviors."
slug: overview_kendoui_rangeslider_widget
position: 1
---

# RangeSlider Overview

The [Kendo UI RangeSlider widget](http://demos.telerik.com/kendo-ui/slider/events) displays a range of values and allows you to select ranges of values. Unlike the HTML5 range input, the RangeSlider presents a consistent experience across browsers and provides a rich API and event model.

## Getting Started

### Create the RangeSlider

Create the RangeSlider by using two HTML `<input>` elements in a `<div>` one as demonstrated in the example below.

###### Example

    <div id="rangeSlider">
        <input />
        <input />
    </div>


### Initialize the RangeSlider

Initialize the RangeSlider using a jQuery selector as demonstrated in the example below.

###### Example

    $(document).ready(function() {
        $("#rangeSlider").kendoRangeSlider();
    });

> **Important**  
> * As the RangeSlider should be initialized after the DOM is fully loaded, make sure you initilaize it within a `$(document).ready()` statement.
> * The RangeSlider requires two inputs to capture both ends of the value range. This benefits scenarios where JavaScript is disabled, in which case users will be presented with two inputs, still allowing them to input a valid range.

## Customization

### Behaviors

The aspects of the RangeSlider behavior can be customized by configuring its properties. These include:

*   Minimum and/or maximum values
*   Horizontal or vertical orientation
*   Small or large step
*   Tooltip format/placement

The example below demonstrates how to customize the RangeSlider behaviors by configuring its properties.

###### Example

    $("#rangeSlider").kendoRangeSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Reference

### Existing Instances

Make a reference to an existing RangeSlider instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can use the API to control its behavior.

The example below demonstrates how to access an existing RangeSlider instance.

###### Example

    var rangeSlider = $("#rangeSlider").data("kendoRangeSlider");

## See Also

Other articles on Kendo UI RangeSlider:

* [RangeSlider JavaScript API Reference](/api/javascript/ui/rangeslider)
