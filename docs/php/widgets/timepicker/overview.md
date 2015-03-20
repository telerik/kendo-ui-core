---
title: Overview
page_title: How to use the Timepicker PHP class, server-side wrapper for Kendo UI Timepicker widget
description: Learn how to create Kendo UI Timepicker for PHP, handle Kendo UI Timepicker Events, access an existing Timepicker.
---

# Timepicker

The Kendo TimePicker for PHP is a server-side wrapper for the [Kendo UI TimePicker](/api/web/timepicker) widget.

## Getting Started

Here is how to configure a simple Kendo Timepicker:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a [timepicker](/api/wrappers/php/Kendo/UI/TimePicker).

        <?php
        $timePicker = new \Kendo\UI\TimePicker('timepicker');

        $timePicker->value('10:00 AM');
        ?>

1. Output the timepicker by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $timePicker->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo TimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/timepicker#methods) to control its behavior.

### Example

    <?php
    $timepicker = new \Kendo\UI\TimePicker('timepicker');
    echo $timepicker->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the treeview
        var timepicker = $("#timepicker").data("kendoTimePicker");
    });
    </script>

## Handling Events

You can subscribe to all timepicker [events](/api/web/timepicker#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $timepicker = new \Kendo\UI\TimePicker('timepicker');

    // The 'timepicker_change' JavaScript function will handle the 'change' event of the timepicker
    $timepicker->change('timepicker_change');

    echo $timepicker->render();
    ?>
    <script>
    function timepicker_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $timepicker = new \Kendo\UI\TimePicker('timepicker');

    // Provide inline JavaScript code that will handle the 'change' event of the timepicker
    $timepicker->change('function() { /* Handle the change event */ }');

    echo $timepicker->render();
    ?>
