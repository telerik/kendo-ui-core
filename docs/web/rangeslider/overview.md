---
title: Overview
page_title: HTML5 Range Input in Kendo UI RangeSlider Widget
description: Learn how to display range of values, select them in Kendo UI RangeSlider widget and learn how to customize behaviors of the component to ensure a consistent experience.
---

# RangeSlider Overview

The **RangeSlider** widget display range of values and allows you to select ranges of values. Unlike the HTML5 range input, the **RangeSlider** presents a consistent experience across browsers and features a rich API and event model.

## Getting Started

### Create two HTML input elements in a div

    <div id="rangeSlider">
        <input />
        <input />
    </div>

Initialization of a **RangeSlider** should occur after the DOM is fully loaded. It is recommended
that initialization the **RangeSlider** occur within a handler is provided to $(document).ready().

### Initialize a RangeSlider using a selector within $(document).ready()

    $(document).ready(function() {
        $("#rangeSlider").kendoRangeSlider();
    });

The **RangeSlider** requires two inputs to capture both ends of the value range. This benefits
scenarios where JavaScript is disabled, in which case users will be presented with two inputs, still allowing them to input a valid range.

## Customizing RangeSlider Behaviors

Many facets of the **RangeSlider** behavior can be configured through
properties, including:

*   Minimum and/or maximum values
*   Orientation (horizontal or vertical)
*   Small or large step
*   Tooltip format/placement

### Initialize a RangeSlider and its properties

    $("#rangeSlider").kendoRangeSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Accessing an Existing RangeSlider

You can reference an existing **RangeSlider** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing RangeSlider instance

    var rangeSlider = $("#rangeSlider").data("kendoRangeSlider");

