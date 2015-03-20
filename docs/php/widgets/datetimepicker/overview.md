---
title: Overview
page_title: How to use the DateTimePicker PHP class, server-side wrapper for Kendo UI DateTimePicker widget
description: Getting started with Kendo UI DateTimePicker for PHP in quick steps - configure Kendo UI DateTimePicker widget and operate Kendo UI DateTimePicker events.
---

# DateTimePicker

The Kendo DateTimePicker for PHP is a server-side wrapper for the [Kendo UI DateTimePicker](/api/web/datetimepicker) widget.

## Getting Started

Here is how to configure a simple Kendo DateTimePicker:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [datetimepicker](/api/wrappers/php/Kendo/UI/DateTimePicker).

        <?php
        $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');
        $datetimepicker->min(new DateTime('1900-01-01'))
                       ->max(new DateTime('2099-12-31'))
                       ->value(new DateTime('today', new DateTimeZone('UTC')));
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo DateTimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/datetimepicker#methods) to control its behavior.


### Example

    <?php
    $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');
    echo $datetimepicker->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the datetimepicker
        var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker")
    });
    </script>

## Handling Events

You can subscribe to all datetimepicker [events](/api/web/datetimepicker#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');

    // The 'datetimepicker_change' JavaScript function will handle the 'change' event of the datetimepicker
    $datetimepicker->change('datetimepicker_change');

    echo $datetimepicker->render();
    ?>
    <script>
    function datetimepicker_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');

    // Provide inline JavaScript code that will handle the 'change' event of the datetimepicker
    $datetimepicker->change('function() { /* Handle the change event */ }');

    echo $datetimepicker->render();
    ?>
