---
title: Overview
page_title: Overview of HTML5 Slider UI widget in Kendo UI framework
description: Use Slider widget in Kendo UI framework to present cross-browser consistent experiences, read the documentation to get started.
---

# Slider Overview

The **Slider** provides a rich input for selecting values. Unlike the HTML5
range input, the **Slider** presents a consistent experience across browsers and features a rich
API and event model.

## Getting Started

### Create an input element

    <input id="slider" />

Initialization of a **Slider** should occur after the DOM is fully loaded. It is recommended that
initialization the **Slider** occur within a handler is provided to $(document).ready().

### Initialize a Slider using a selector within $(document).ready()

    $(document).ready(function() {
        $("#slider").kendoSlider();
    });

## Customizing Slider Behaviors

Many facets of the **Slider** behavior can be configured through
properties, including:

*   Minimum and/or maximum values
*   Orientation (horizontal or vertical)
*   Small or large step
*   Tooltip format/placement

### Initialize a Slider and its properties

    $("#slider").kendoSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Accessing an Existing Slider

You can reference an existing **Slider** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing Slider instance

    var slider = $("#slider").data("kendoSlider");

## Slider Keyboard Navigation

The Slider draghandles are able to receive focus via tabbing. When this happens, the respective draghandle is displayed with its "active" style
and the following keys and behaviors are supported:

*	Right and Up increment the value by a smallStep amount
*	Left and Down decrement the value by a smallStep amount
*	Page Up and Page Down increment/decrement by a largeStep amount
*	Home and End place the focused draghandle at the minimum or maximum value
*	In right-to-left (RTL) mode the behavior of the left and right arrow keys is reversed.
