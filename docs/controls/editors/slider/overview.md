---
title: Overview
page_title: Overview | Kendo UI Slider
description: "Learn how to initialize the Kendo UI Slider widget and configure its behaviors."
slug: overview_kendoui_slider_widget
position: 1
---

# Slider Overview

The [Kendo UI Slider widget](http://demos.telerik.com/kendo-ui/slider) provides a rich input for selecting numeric values. Unlike the HTML5 range input, the Slider provides a consistent experience across browsers and delivers a rich API and event model.

## Getting Started

### Create the Slider

Create the Slider by using an HTML `<input>` element as demonstrated in the example below.

###### Example

    <input id="slider" />

### Initialize the Slider

Initialize the Slider using a jQuery selector as demonstrated in the example below.

###### Example

    $(document).ready(function() {
        $("#slider").kendoSlider();
    });

> **Important**  
>
> As the Slider should be initialized after the DOM is fully loaded, make sure you initilaize it within a `$(document).ready()` statement.

## Customization

### Behaviors

The aspects of the Slider behavior can be customized by configuring its properties. These include:

*   Minimum and/or maximum values
*   Horizontal or vertical orientation
*   Small or large step
*   Tooltip format/placement

The example below demonstrates how to customize the Slider behaviors by configuring its properties.

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

Make a reference to an existing Slider instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can use the API to control its behavior.

The example below demonstrates how to access an existing Slider instance.

###### Example

    var slider = $("#slider").data("kendoSlider");

## Keyboard Navigation

Kendo UI Slider draghandles are able to receive focus via tabbing. When focused in this way, the respective draghandle is displayed with its active style and the following keys and behaviors are supported:

| SHORTCUT						| DESCRIPTION				                         |
|:---                           |:---                                                |
| Left/Down `Arrow` key         | Increments the value by a `smallStep` amount       |
| Right/Up `Arrow` key          | Decrements the value by a `smallStep` amount       |
| `Page Up` key                 | Increments the value by a `largeStep` amount       |
| `Page Down` key               | Decrements the value by a `largeStep` amount       |
| `Home`                        | Places the focused draghandle at the minimum value |
| `End`                         | Places the focused draghandle at the maximum value |

> **Important**
>
> In right-to-left (RTL) mode the behavior of the left and right `Arrow` keys is reversed.

## See Also

Other articles on Kendo UI Slider:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Slider Widget](/aspnet-mvc/helpers/slider/overview)
* [Overview of the Slider JSP Tag]({% slug overview_slider_uiforjsp %})
* [Overview of the Slider PHP Class](/php/widgets/slider/overview)
* [Slider JavaScript API Reference](/api/javascript/ui/slider)
