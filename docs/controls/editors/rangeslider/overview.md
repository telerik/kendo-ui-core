---
title: Overview
page_title: Overview | Kendo UI RangeSlider
description: "Learn how to initialize the Kendo UI RangeSlider widget and configure its behaviors."
slug: overview_kendoui_rangeslider_widget
position: 1
---

# RangeSlider Overview

The [Kendo UI RangeSlider widget](http://demos.telerik.com/kendo-ui/slider/events) displays a range of values and allows you to select ranges of values.

Unlike the HTML5 range input, the RangeSlider enables the consistent experience across browsers and provides a rich API and event model.

## Getting Started

### Create the RangeSlider

To create the RangeSlider, use two HTML `<input>` elements in a `<div>` one.

###### Example

    <div id="rangeSlider">
        <input />
        <input />
    </div>


### Initialize the RangeSlider

To initialize the RangeSlider, use a jQuery selector.

###### Example

    $(document).ready(function() {
        $("#rangeSlider").kendoRangeSlider();
    });

> **Important**  
> * Verify that you create the RangeSlider within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.
> * The RangeSlider requires two `input` elements to capture both ends of the value range. This benefits scenarios where JavaScript is disabled. In such cases, users are presented with two inputs which still allow them to input a valid range.

## Customization

### Behaviors

The RangeSlider provides configuration options for you to customize its behavior. The available settings are:

* Minimum and/or maximum values
* Horizontal or vertical orientation
* Small or large step
* Tooltip format/placement

The following example demonstrates how to customize the RangeSlider behaviors by configuring its properties.

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

To reference to an existing RangeSlider instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the API to control its behavior.

###### Example

    var rangeSlider = $("#rangeSlider").data("kendoRangeSlider");

## See Also

* [RangeSlider JavaScript API Reference](/api/javascript/ui/rangeslider)
