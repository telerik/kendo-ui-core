---
title: Overview
page_title: jQuery Slider Documentation | Slider Overview
description: "Get started with the jQuery Slider by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_slider_widget
position: 1
---

# Slider Overview

The Slider provides a rich input for selecting numeric values.

The Slider can either present one handle and two opposing buttons for selecting a single numeric value, or two handlers for defining a range of numeric values. Unlike the HTML5 range input, the Slider enables the consistent experience across browsers and delivers rich API calls and event models. The Slider provides configuration options for customizing its behavior, for example, setting its minimum and maximum values, orientation, step, and tooltip format and placement.

* [Demo page for the Slider](https://demos.telerik.com/kendo-ui/slider)

## Initializing the Slider

To create the Slider, use an HTML `<input>` element.

    <input id="slider" />

To initialize the Slider, use a jQuery selector.

> Verify that you create the Slider within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.

    $(document).ready(function() {
        $("#slider").kendoSlider();
    });

The following example demonstrates how to customize the Slider.

    $("#slider").kendoSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Functionality and Features

The Slider provides [accessibility support]({% slug accessibility_kendoui_slider %}).

## Referencing Existing Instances

To reference an existing Slider instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the API to control its behavior.

    var slider = $("#slider").data("kendoSlider");

## See Also

* [Basic Usage of the Slider (Demo)](https://demos.telerik.com/kendo-ui/slider/index)
* [Using the API of the Slider (Demo)](https://demos.telerik.com/kendo-ui/slider/api)
* [JavaScript API Reference of the Slider](/api/javascript/ui/slider)
