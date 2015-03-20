---
title: Overview
page_title: How to use the FlatColorPicker PHP class, server-side wrapper for Kendo UI FlatColorPicker widget
description: Getting started with Kendo UI FlatColorPicker for PHP in quick steps - configure Kendo UI FlatColorPicker widget and operate Kendo UI FlatColorPicker events.
---

# FlatColorPicker

The Kendo FlatColorPicker for PHP is a server-side wrapper for the [Kendo UI FlatColorPicker](/api/web/flatcolorpicker) widget.

## Getting Started

Here is how to configure a simple Kendo FlatColorPicker:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [flatcolorpicker](/api/wrappers/php/Kendo/UI/FlatColorPicker).

        <?php
        $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');
        $flatcolorpicker->value('#ff0000');
        ?>

3. Output the flatcolorpicker by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $flatcolorpicker->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo FlatColorPicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/flatcolorpicker#methods) to control its behavior.


### Example

    <?php
    $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');
    echo $flatcolorpicker->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the flatcolorpicker
        var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker")
    });
    </script>

## Handling Events

You can subscribe to all flatcolorpicker [events](/api/web/flatcolorpicker#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

    // The 'flatcolorpicker_change' JavaScript function will handle the 'change' event of the flatcolorpicker
    $flatcolorpicker->change('flatcolorpicker_change');

    echo $flatcolorpicker->render();
    ?>
    <script>
    function flatcolorpicker_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

    // Provide inline JavaScript code that will handle the 'change' event of the flatcolorpicker
    $flatcolorpicker->change('function() { /* Handle the change event */ }');

    echo $flatcolorpicker->render();
    ?>
