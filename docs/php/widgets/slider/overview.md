---
title: Overview
page_title: Overview | Slider PHP Class
description: "Get started with the Slider PHP class in Kendo UI."
slug: overview_slider_uiforphp
position: 1
---

# Slider PHP Class Overview

The Kendo UI Slider for PHP is a server-side wrapper for the [Kendo UI Slider](/api/javascript/ui/slider) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Slider for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Slider](/api/php/Kendo/UI/Slider).

###### Example

    <?php
    $slider = new \Kendo\UI\Slider('slider');
    $slider->value(42);
    ?>

**Step 3** Output the Slider by echoing the result of the `render` method.

###### Example

    <?php
    echo $slider->render();
    ?>

## Event Handling

You can subscribe to all Slider [events](/api/javascript/ui/slider#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $slider = new \Kendo\UI\Slider('slider');

    // The 'slider_change' JavaScript function will handle the 'change' event of the slider
    $slider->change('slider_change');

    echo $slider->render();
    ?>
    <script>
    function slider_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $slider = new \Kendo\UI\Slider('slider');

    // Provide inline JavaScript code that will handle the 'change' event of the slider
    $slider->change('function() { /* Handle the change event */ }');

    echo $slider->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Slider instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Slider API](/api/javascript/ui/slider#methods) to control its behavior.

###### Example

    <?php
    $slider = new \Kendo\UI\Slider('slider');
    echo $slider->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the slider
        var slider = $("#slider").data("kendoSlider");
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the Slider:

* [Overview of the Kendo UI Slider Widget]({% slug overview_kendoui_slider_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
