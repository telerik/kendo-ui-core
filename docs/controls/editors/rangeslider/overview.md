---
title: Overview
page_title: jQuery RangeSlider Documentation | RangeSlider Overview
description: "Get started with the jQuery RangeSlider by Kendo UI and learn how to create and initialize the widget."
slug: overview_kendoui_rangeslider_widget
position: 1
---

# RangeSlider Overview

The Kendo UI RangeSlider displays a range of values and allows you to select ranges of values.

Unlike the HTML5 range input, the RangeSlider enables the consistent experience across browsers and provides a rich API and event model. The RangeSlider provides configuration options for customizing its behavior, for example, setting its minimum and maximum values, orientation, step, and tooltip format and placement.

* [Demo page for the RangeSlider](https://demos.telerik.com/kendo-ui/slider/events)

## Basic Configuration

To create the RangeSlider, use two HTML `<input>` elements in a `<div>` one.

    <div id="rangeSlider">
        <input />
        <input />
    </div>

To initialize the RangeSlider, use a jQuery selector.

> * Verify that you create the RangeSlider within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.
> * The RangeSlider requires two `input` elements to capture both ends of the value range. This benefits scenarios where JavaScript is disabled. In such cases, users are presented with two inputs which still allow them to input a valid range.

    $(document).ready(function() {
        $("#rangeSlider").kendoRangeSlider();
    });

The following example demonstrates how to customize the RangeSlider.

    $("#rangeSlider").kendoRangeSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Referencing Existing Instances

To reference to an existing RangeSlider instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the API to control its behavior.

    var rangeSlider = $("#rangeSlider").data("kendoRangeSlider");

## See Also

* [Basic Usage of the RangeSlider (Demo)](https://demos.telerik.com/kendo-ui/slider/events)
* [JavaScript API Reference of the RangeSlider](/api/javascript/ui/rangeslider)
