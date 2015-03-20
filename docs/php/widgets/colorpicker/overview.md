---
title: Overview
page_title: How to use the ColorPicker PHP class, server-side wrapper for Kendo UI ColorPicker widget
description: Getting started with Kendo UI ColorPicker for PHP in quick steps - configure Kendo UI ColorPicker widget and operate Kendo UI ColorPicker events.
---

# ColorPicker

The Kendo ColorPicker for PHP is a server-side wrapper for the [Kendo UI ColorPicker](/api/web/colorpicker) widget.

## Getting Started

Here is how to configure a simple Kendo ColorPicker:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [colorpicker](/api/wrappers/php/Kendo/UI/ColorPicker).

        <?php
        $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');
        $colorpicker->value('#ff0000');
        ?>

3. Output the colorpicker by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $colorpicker->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo ColorPicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/colorpicker#methods) to control its behavior.


### Example

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');
    echo $colorpicker->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the colorpicker
        var colorpicker = $("#colorpicker").data("kendoColorPicker")
    });
    </script>

## Handling Events

You can subscribe to all colorpicker [events](/api/web/colorpicker#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');

    // The 'colorpicker_change' JavaScript function will handle the 'change' event of the colorpicker
    $colorpicker->change('colorpicker_change');

    echo $colorpicker->render();
    ?>
    <script>
    function colorpicker_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');

    // Provide inline JavaScript code that will handle the 'change' event of the colorpicker
    $colorpicker->change('function() { /* Handle the change event */ }');

    echo $colorpicker->render();
    ?>
