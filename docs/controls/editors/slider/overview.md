---
title: Overview
page_title: Overview | Kendo UI Slider
description: "Learn how to initialize the Kendo UI Slider widget and configure its behaviors."
slug: overview_kendoui_slider_widget
position: 1
---

# Slider Overview

The [Kendo UI Slider widget](http://demos.telerik.com/kendo-ui/slider) provides a rich input for selecting numeric values.

Unlike the HTML5 range input, the Slider enables the consistent experience across browsers and delivers rich API calls and event models.

## Getting Started

### Create the Slider

To create the Slider, use an HTML `<input>` element.

###### Example

    <input id="slider" />

### Initialize the Slider

To initialize the Slider, use a jQuery selector.

###### Example

    $(document).ready(function() {
        $("#slider").kendoSlider();
    });

> **Important**  
>
> Verify that you create the Slider within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.

## Customization

### Behaviors

The Slider provides configuration options for you to customize its behavior. The available settings are:

* Minimum and/or maximum values
* Horizontal or vertical orientation
* Small or large step
* Tooltip format/placement

The following example demonstrates how to customize the Slider behaviors by configuring its properties.

###### Example

    $("#slider").kendoSlider({
        min: 10,
        max: 50,
        orientation: "vertical",
        smallStep: 1,
        largeStep: 10
    });

## Reference

### Existing Instances

To reference an existing Slider instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the API to control its behavior.

###### Example

    var slider = $("#slider").data("kendoSlider");

## Keyboard Navigation

The user can focus the drag-handles of the Slider through tabbing. When focused in this way, the respective drag-handle renders with its active style and the following keys and supports the following keyboard shortcuts:

| SHORTCUT						          | DESCRIPTION				                                 |
|:---                           |:---                                                |
| Left/Down `Arrow` key         | Increments the value by a `smallStep` amount       |
| Right/Up `Arrow` key          | Decrements the value by a `smallStep` amount       |
| `Page Up` key                 | Increments the value by a `largeStep` amount       |
| `Page Down` key               | Decrements the value by a `largeStep` amount       |
| `Home`                        | Places the focused draghandle at the minimum value |
| `End`                         | Places the focused draghandle at the maximum value |

> **Important**
>
> In the right-to-left (RTL) mode, the behavior of the left and right `Arrow` keys is reversed.

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Slider Widget](/aspnet-mvc/helpers/slider/overview)
* [Overview of the Slider JSP Tag]({% slug overview_slider_uiforjsp %})
* [Overview of the Slider PHP Class](/php/widgets/slider/overview)
* [Slider JavaScript API Reference](/api/javascript/ui/slider)
